import React, { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  error,
  type = 'text',
  className = '',
  id,
  required = false,
  icon,
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-small font-medium text-slate-700 dark:text-slate-300"
        >
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-4 text-slate-400 dark:text-slate-500 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          type={type}
          ref={ref}
          className={`w-full px-4 py-3 rounded-input border transition-all duration-200 outline-none text-body bg-white dark:bg-slate-900/60 text-slate-800 dark:text-slate-100 ${
            icon ? 'pl-11' : ''
          } ${
            error
              ? 'border-danger focus:ring-danger/20 focus:border-danger'
              : 'border-slate-200 dark:border-slate-800 focus:ring-primary/20 focus:border-primary'
          } focus:ring-4`}
          {...props}
        />
      </div>
      {error && (
        <span className="text-small text-danger font-medium mt-0.5">
          {error}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
