import React from 'react';
import Input from './Input';
import { Calendar as CalendarIcon } from 'lucide-react';

export default function DatePicker({ label, error, ...props }) {
  return (
    <Input
      type="date"
      label={label}
      error={error}
      icon={<CalendarIcon className="h-5 w-5 text-slate-400" />}
      {...props}
    />
  );
}
