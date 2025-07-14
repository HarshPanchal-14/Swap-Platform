import React from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Reusable Breadcrumb component for navigation hierarchy
 */
const Breadcrumb = ({
  items = [],
  className = '',
  separator = '/',
  ...props
}) => {
  const location = useLocation();

  // Auto-generate breadcrumbs from current location if no items provided
  const generateBreadcrumbs = () => {
    if (items.length > 0) return items;

    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [
      { label: 'Home', path: '/', icon: '🏠' },
    ];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      breadcrumbs.push({
        label,
        path: currentPath,
        icon: getIconForPath(segment),
      });
    });

    return breadcrumbs;
  };

  const getIconForPath = (segment) => {
    const iconMap = {
      'browse-skills': '🔍',
      dashboard: '📊',
      admin: '⚙️',
      login: '🔐',
      profile: '👤',
      settings: '⚙️',
    };
    return iconMap[segment] || '📄';
  };

  const breadcrumbItems = generateBreadcrumbs();

  if (breadcrumbItems.length <= 1) {
    return null;
  }

  return (
    <nav
      className={`flex items-center space-x-2 text-sm ${className}`}
      aria-label="Breadcrumb"
      {...props}
    >
      <ol className="flex items-center space-x-2">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          const isCurrent = item.path === location.pathname;

          return (
            <li key={item.path} className="flex items-center">
              {index > 0 && (
                <span className="mx-2 text-gray-400" aria-hidden="true">
                  {separator}
                </span>
              )}

              {isLast || isCurrent ? (
                <span
                  className={`flex items-center ${
                    isCurrent
                      ? 'text-primary-600 font-medium'
                      : 'text-gray-500'
                  }`}
                  aria-current={isCurrent ? 'page' : undefined}
                >
                  {item.icon && (
                    <span className="mr-1" aria-hidden="true">
                      {item.icon}
                    </span>
                  )}
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="flex items-center text-gray-500 hover:text-primary-600 transition-colors"
                >
                  {item.icon && (
                    <span className="mr-1" aria-hidden="true">
                      {item.icon}
                    </span>
                  )}
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
