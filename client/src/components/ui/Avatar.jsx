import React, { useState } from 'react';

export default function Avatar({
  src,
  name = '',
  size = 'md', // xs | sm | md | lg | xl
  className = '',
  ...props
}) {
  const [hasError, setHasError] = useState(false);
  const sizes = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
    xl: 'h-16 w-16 text-xl',
  };

  const getInitials = (fullName) => {
    if (!fullName) return '';
    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full overflow-hidden bg-slate-100 border border-slate-200 text-slate-600 font-semibold dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 shrink-0 ${sizes[size]} ${className}`}
      {...props}
    >
      {src && !hasError ? (
        <img
          src={src}
          alt={name || 'Avatar'}
          className="h-full w-full object-cover"
          onError={() => setHasError(true)}
        />
      ) : (
        <span>{getInitials(name)}</span>
      )}
    </div>
  );
}
