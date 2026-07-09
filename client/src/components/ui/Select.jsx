import React, { forwardRef } from 'react';

const Select = forwardRef(({
  label,
  error,
  options = [], // [{ value, label }]
  className = '',
  id,
  required = false,
  ...props
}, ref) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={selectId}
          className="text-small font-medium text-slate-700 dark:text-slate-300"
        >
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}
      <select
        id={selectId}
        ref={ref}
        className={`w-full px-4 py-3 rounded-input border transition-all duration-200 outline-none text-body bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 ${
          error
            ? 'border-danger focus:ring-danger/20 focus:border-danger'
            : 'border-slate-200 dark:border-slate-800 focus:ring-primary/20 focus:border-primary'
        } focus:ring-4 appearance-none`}
        style={{
          backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
          backgroundPosition: 'right 1rem center',
          backgroundSize: '1.25rem',
          backgroundRepeat: 'no-repeat',
        }}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <span className="text-small text-danger font-medium mt-0.5">
          {error}
        </span>
      )}
    </div>
  );
});

Select.displayName = 'Select';
export default Select;
