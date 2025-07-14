import React from 'react';

/**
 * Reusable Card component with header, body, and footer sections
 */
const Card = ({
  children,
  header,
  footer,
  className = '',
  padding = 'default',
  shadow = 'default',
  hover = false,
  ...props
}) => {
  const paddingClasses = {
    none: '',
    small: 'p-4',
    default: 'p-6',
    large: 'p-8',
  };

  const shadowClasses = {
    none: '',
    small: 'shadow-sm',
    default: 'shadow-md',
    large: 'shadow-lg',
    xl: 'shadow-xl',
  };

  const hoverClasses = hover ? 'hover:shadow-lg transition-shadow duration-200' : '';

  const cardClasses = [
    'bg-white rounded-lg border border-gray-200',
    paddingClasses[padding],
    shadowClasses[shadow],
    hoverClasses,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} {...props}>
      {header && (
        <div className="border-b border-gray-200 pb-4 mb-4">
          {typeof header === 'string' ? (
            <h3 className="text-lg font-semibold text-gray-900">{header}</h3>
          ) : (
            header
          )}
        </div>
      )}

      <div className="flex-1">
        {children}
      </div>

      {footer && (
        <div className="border-t border-gray-200 pt-4 mt-4">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
