import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Calendar as CalendarIcon, Clock, CheckCircle2, Circle } from 'lucide-react';
import { updateTaskStatus } from '../../../redux/slices/taskSlice';
import { showToast } from '../../../components/ui/Toast';
import Card from '../../../components/ui/Card';
import Calendar from '../../../components/ui/Calendar';
import Badge from '../../../components/ui/Badge';

export default function CalendarView() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.items);
  const [selectedDay, setSelectedDay] = useState(9); // Default to July 9, 2026 to fit system time demo

  const selectedDateStr = `2026-07-${String(selectedDay).padStart(2, '0')}`;
  const dayTasks = tasks.filter(t => t.dueDate === selectedDateStr);

  const handleToggleStatus = (task) => {
    const nextStatus = task.status === 'completed' ? 'todo' : 'completed';
    dispatch(updateTaskStatus({ taskId: task.id, status: nextStatus }));
    showToast.success('Task status updated');
  };

  const getPriorityBadgeVariant = (priority) => {
    const variants = {
      high: 'danger',
      medium: 'warning',
      low: 'success',
    };
    return variants[priority] || 'default';
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-h1 font-black text-slate-900 dark:text-white">Workspace Calendar</h1>
        <p className="text-small text-slate-500">Select dates to audit scheduled events and customer deliverables.</p>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6 items-start">
        {/* Left: Custom Calendar Grid */}
        <div className="lg:col-span-2">
          <Calendar
            tasks={tasks}
            onSelectDay={(day) => setSelectedDay(day)}
          />
        </div>

        {/* Right: Daily Schedule Panel */}
        <Card className="p-6 bg-white dark:bg-slate-900 border-slate-100 flex flex-col gap-5 min-h-[400px]">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
            <h3 className="text-body font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>Agenda for July {selectedDay}</span>
            </h3>
            <Badge variant="primary">{dayTasks.length} Scheduled</Badge>
          </div>

          <div className="space-y-4 overflow-y-auto flex-1 max-h-[450px] pr-1">
            {dayTasks.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-small">
                No deliverables due on this date.
              </div>
            ) : (
              dayTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-4 border border-slate-100 dark:border-slate-850 rounded-card flex gap-3 relative bg-slate-50/20 dark:bg-slate-950/10 hover:shadow-sm transition-shadow"
                >
                  <button
                    onClick={() => handleToggleStatus(task)}
                    className="text-slate-400 hover:text-primary transition-colors shrink-0 mt-0.5"
                  >
                    {task.status === 'completed' ? (
                      <CheckCircle2 className="h-5 w-5 text-success" />
                    ) : (
                      <Circle className="h-5 w-5" />
                    )}
                  </button>

                  <div className="flex flex-col gap-1 pr-6 flex-1">
                    <span
                      className={`text-small font-bold leading-snug ${
                        task.status === 'completed'
                          ? 'line-through text-slate-400'
                          : 'text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      {task.title}
                    </span>
                    <p className="text-xs text-slate-500 line-clamp-2">{task.description}</p>
                    <div className="flex gap-2 items-center mt-2 flex-wrap">
                      <Badge variant={getPriorityBadgeVariant(task.priority)} className="text-[9px]">
                        {task.priority}
                      </Badge>
                      <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                        {task.relatedTo || 'Internal'}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
