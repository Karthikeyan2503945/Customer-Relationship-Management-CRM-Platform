import React from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search records...',
  className = '',
}) {
  return (
    <div className={`relative flex items-center w-full max-w-sm ${className}`}>
      <Search className="absolute left-4 h-4 w-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-4 py-2.5 text-body bg-white border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-input outline-none transition-all dark:bg-slate-900/60 dark:border-slate-800 dark:text-slate-100"
      />
    </div>
  );
}
