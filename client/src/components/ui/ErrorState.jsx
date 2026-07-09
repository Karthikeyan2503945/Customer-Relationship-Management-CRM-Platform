import React from 'react';
import { AlertCircle } from 'lucide-react';
import Button from './Button';

export default function ErrorState({
  title = 'Something went wrong',
  description = 'An error occurred while loading this section. Please try again.',
  actionText = 'Retry',
  onAction,
  className = '',
}) {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 border border-danger/10 rounded-card bg-danger/5 text-slate-800 dark:text-slate-100 ${className}`}>
      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-danger/10 text-danger mb-4 shrink-0">
        <AlertCircle className="h-6 w-6" />
      </div>
      <h3 className="text-body font-bold text-slate-900 dark:text-red-400 mb-1">
        {title}
      </h3>
      <p className="text-small text-slate-500 dark:text-slate-400 max-w-sm mb-5">
        {description}
      </p>
      {onAction && (
        <Button variant="danger" size="sm" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
}
