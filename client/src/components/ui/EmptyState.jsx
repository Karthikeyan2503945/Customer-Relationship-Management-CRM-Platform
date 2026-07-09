import React from 'react';
import { PackageOpen } from 'lucide-react';
import Button from './Button';

export default function EmptyState({
  title = 'No records found',
  description = 'Get started by creating a new entry in this section.',
  actionText,
  onAction,
  icon,
  className = '',
}) {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 border border-dashed border-slate-200 dark:border-slate-800 rounded-card bg-slate-50/20 dark:bg-slate-900/5 ${className}`}>
      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500 mb-4 shrink-0">
        {icon || <PackageOpen className="h-6 w-6" />}
      </div>
      <h3 className="text-body font-bold text-slate-800 dark:text-slate-100 mb-1">
        {title}
      </h3>
      <p className="text-small text-slate-500 dark:text-slate-400 max-w-sm mb-5">
        {description}
      </p>
      {actionText && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
}
