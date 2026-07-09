import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumb({
  items = [], // [{ label, path }]
  className = '',
}) {
  return (
    <nav className={`flex ${className}`} aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 text-small font-medium text-slate-500 dark:text-slate-400">
        <li className="inline-flex items-center">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 hover:text-slate-700 dark:hover:text-slate-200"
          >
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, idx) => (
          <li key={idx}>
            <div className="flex items-center">
              <ChevronRight className="h-4 w-4 text-slate-400 mx-1" />
              {item.path ? (
                <Link
                  to={item.path}
                  className="ml-1 hover:text-slate-700 dark:hover:text-slate-200"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="ml-1 text-slate-700 dark:text-slate-200 pointer-events-none">
                  {item.label}
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
