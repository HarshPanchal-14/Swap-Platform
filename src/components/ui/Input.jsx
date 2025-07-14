import React, { forwardRef } from 'react';

/**
 * Reusable Input component with validation and error handling
 */
const Input = forwardRef(({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  disabled = false,
  required = false,
  fullWidth = false,
  className = '',
  ...props
}, ref) => {
  const inputId = props.id || `input-${Math.random().toString(36).substr(2, 9)}`;

  const baseClasses = 'block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors';

  const stateClasses = error
    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
    : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500';

  const disabledClasses = disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white';
  const widthClass = fullWidth ? 'w-full' : '';

  const inputClasses = [
    baseClasses,
    stateClasses,
    disabledClasses,
    widthClass,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <input
        ref={ref}
        id={inputId}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={inputClasses}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />

      {error && (
        <p
          id={`${inputId}-error`}
          className="mt-1 text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
