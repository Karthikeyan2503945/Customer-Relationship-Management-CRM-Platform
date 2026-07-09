import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';
import Card from './Card';
import Badge from './Badge';

export default function Calendar({
  tasks = [], // Array of task objects: [{ title, dueDate, priority }]
  onSelectDay,
}) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 6, 1)); // Fixed to July 2026 for demo matching
  
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const days = [];
  // Fill empty slots before first day
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  // Fill month days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Helper to get tasks for a specific date
  const getTasksForDay = (day) => {
    if (!day) return [];
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return tasks.filter(t => t.dueDate === dateStr);
  };

  return (
    <Card className="p-5 flex flex-col h-full bg-white dark:bg-slate-900">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-body font-bold text-slate-800 dark:text-slate-100">
          {monthNames[month]} {year}
        </h4>
        <div className="flex items-center gap-1">
          <button className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Week Names */}
      <div className="grid grid-cols-7 text-center text-xs font-semibold text-slate-400 dark:text-slate-500 mb-2 gap-y-1">
        <div>Su</div>
        <div>Mo</div>
        <div>Tu</div>
        <div>We</div>
        <div>Th</div>
        <div>Fr</div>
        <div>Sa</div>
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1 text-center flex-1">
        {days.map((day, idx) => {
          const dayTasks = getTasksForDay(day);
          const isToday = day === 9; // Mocking current day as July 9, 2026 to fit system time
          
          return (
            <div
              key={idx}
              className={`relative flex flex-col items-center justify-between p-1 min-h-[50px] border border-slate-50 dark:border-slate-800/40 rounded-lg ${
                day ? 'bg-slate-50/50 dark:bg-slate-900/10 cursor-pointer hover:bg-slate-100/50 dark:hover:bg-slate-800/30' : 'bg-transparent'
              } ${isToday ? 'ring-2 ring-primary ring-offset-2 dark:ring-offset-slate-900' : ''}`}
              onClick={() => day && onSelectDay && onSelectDay(day)}
            >
              {day && (
                <>
                  <span className={`text-small font-semibold ${isToday ? 'text-primary' : 'text-slate-700 dark:text-slate-300'}`}>
                    {day}
                  </span>
                  
                  {/* Task Dots */}
                  <div className="flex gap-1 mt-1 justify-center flex-wrap">
                    {dayTasks.slice(0, 3).map((t, tIdx) => {
                      const priorityColor = {
                        high: 'bg-danger',
                        medium: 'bg-warning',
                        low: 'bg-success',
                      };
                      return (
                        <span
                          key={tIdx}
                          className={`h-1.5 w-1.5 rounded-full ${priorityColor[t.priority] || 'bg-slate-400'}`}
                          title={t.title}
                        />
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
