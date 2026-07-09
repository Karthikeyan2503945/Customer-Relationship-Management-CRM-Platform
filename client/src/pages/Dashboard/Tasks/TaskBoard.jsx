import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Kanban, ListFilter, Calendar as CalendarIcon, Plus, Trash2, CheckCircle2, Circle } from 'lucide-react';
import { addTask, updateTaskStatus, deleteTask } from '../../../redux/slices/taskSlice';
import { showToast } from '../../../components/ui/Toast';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';
import Modal from '../../../components/ui/Modal';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import DataTable from '../../../components/ui/DataTable';
import Calendar from '../../../components/ui/Calendar';

export default function TaskBoard() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.items);
  
  const [viewMode, setViewMode] = useState('board'); // board | list | calendar
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', dueDate: '', priority: 'medium', status: 'todo', relatedTo: '' });
  
  const columns = [
    { key: 'todo', label: 'To Do', color: 'border-t-slate-400 bg-slate-100/5' },
    { key: 'in_progress', label: 'In Progress', color: 'border-t-primary bg-primary/5' },
    { key: 'completed', label: 'Completed', color: 'border-t-success bg-success/5' },
  ];

  // Drag and Drop
  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('text/plain', taskId);
  };

  const handleDrop = (e, status) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    if (taskId) {
      dispatch(updateTaskStatus({ taskId, status }));
      showToast.success(`Task status updated to ${status.replace('_', ' ')}`);
    }
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!form.title || !form.dueDate) {
      showToast.error('Please enter task title and due date');
      return;
    }
    dispatch(addTask(form));
    showToast.success('New task scheduled');
    setModalOpen(false);
    setForm({ title: '', description: '', dueDate: '', priority: 'medium', status: 'todo', relatedTo: '' });
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
    showToast.success('Task removed');
  };

  const handleToggleStatus = (task) => {
    const nextStatus = task.status === 'completed' ? 'todo' : 'completed';
    dispatch(updateTaskStatus({ taskId: task.id, status: nextStatus }));
  };

  const getPriorityBadgeVariant = (priority) => {
    const variants = {
      high: 'danger',
      medium: 'warning',
      low: 'success',
    };
    return variants[priority] || 'default';
  };

  // Columns for List view
  const listColumns = [
    {
      key: 'status',
      label: 'Status',
      render: (row) => (
        <button onClick={() => handleToggleStatus(row)} className="text-slate-400 hover:text-primary transition-colors">
          {row.status === 'completed' ? (
            <CheckCircle2 className="h-5 w-5 text-success" />
          ) : (
            <Circle className="h-5 w-5" />
          )}
        </button>
      )
    },
    { key: 'title', label: 'Task Title', render: (row) => <span className={`font-bold ${row.status === 'completed' ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200'}`}>{row.title}</span> },
    { key: 'description', label: 'Description' },
    { key: 'dueDate', label: 'Due Date' },
    { key: 'priority', label: 'Priority', render: (row) => <Badge variant={getPriorityBadgeVariant(row.priority)}>{row.priority}</Badge> },
    { key: 'relatedTo', label: 'Account' },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <button
          onClick={() => handleDeleteTask(row.id)}
          className="p-1.5 rounded-full hover:bg-red-50 text-red-500 transition-colors"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      )
    }
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-h1 font-black text-slate-900 dark:text-white">Task Management</h1>
          <p className="text-small text-slate-500">Track and schedule due deliverables across client accounts.</p>
        </div>
        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex rounded-button border border-slate-200 bg-white p-1 dark:border-slate-800 dark:bg-slate-950 shrink-0">
            <button
              onClick={() => setViewMode('board')}
              className={`p-1.5 rounded-button text-xs font-semibold gap-1.5 flex items-center transition-all ${
                viewMode === 'board' ? 'bg-primary text-white' : 'text-slate-500'
              }`}
            >
              <Kanban className="h-3.5 w-3.5" />
              <span>Board</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-button text-xs font-semibold gap-1.5 flex items-center transition-all ${
                viewMode === 'list' ? 'bg-primary text-white' : 'text-slate-500'
              }`}
            >
              <ListFilter className="h-3.5 w-3.5" />
              <span>List</span>
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`p-1.5 rounded-button text-xs font-semibold gap-1.5 flex items-center transition-all ${
                viewMode === 'calendar' ? 'bg-primary text-white' : 'text-slate-500'
              }`}
            >
              <CalendarIcon className="h-3.5 w-3.5" />
              <span>Calendar</span>
            </button>
          </div>

          <Button variant="primary" size="sm" onClick={() => setModalOpen(true)} icon={<Plus className="h-4 w-4" />}>
            Create Task
          </Button>
        </div>
      </div>

      {viewMode === 'board' ? (
        /* Board Mode */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start overflow-x-auto min-h-[500px]">
          {columns.map((col) => {
            const colTasks = tasks.filter(t => t.status === col.key);
            
            return (
              <div
                key={col.key}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, col.key)}
                className={`flex flex-col h-full rounded-card border border-slate-100 dark:border-slate-800 p-4 border-t-4 ${col.color} shrink-0 w-full sm:min-w-[280px]`}
              >
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-body font-bold text-slate-800 dark:text-slate-200">{col.label}</span>
                  <Badge variant="default">{colTasks.length}</Badge>
                </div>

                <div className="flex flex-col gap-3 flex-1 overflow-y-auto max-h-[600px] pr-1">
                  {colTasks.map((task) => (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task.id)}
                      className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-card shadow-sm cursor-grab active:cursor-grabbing hover:shadow-md transition-all flex flex-col gap-2.5"
                    >
                      <div className="flex justify-between items-start gap-2">
                        <span className="text-small font-extrabold text-slate-800 dark:text-slate-100 line-clamp-2 leading-snug">
                          {task.title}
                        </span>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="p-1 rounded text-slate-400 hover:text-danger hover:bg-danger/5 transition-colors shrink-0"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <p className="text-xs text-slate-500 line-clamp-2">{task.description}</p>

                      <div className="flex flex-col gap-1 mt-2 text-xs text-slate-500 border-t border-slate-50 dark:border-slate-800/60 pt-2.5">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Account: {task.relatedTo || 'N/A'}</span>
                        <span>Due: {task.dueDate}</span>
                      </div>

                      <div className="flex justify-between items-center mt-1">
                        <Badge variant={getPriorityBadgeVariant(task.priority)} className="text-[10px]">
                          {task.priority}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  {colTasks.length === 0 && (
                    <div className="text-center py-12 text-slate-400 text-xs border border-dashed border-slate-200 dark:border-slate-800 rounded-lg">
                      No tasks in this stage
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : viewMode === 'list' ? (
        /* List Mode */
        <DataTable
          columns={listColumns}
          data={tasks}
          emptyMessage="No tasks scheduled."
        />
      ) : (
        /* Calendar Mode */
        <div className="max-w-4xl mx-auto w-full">
          <Calendar
            tasks={tasks}
            onSelectDay={(day) => {
              const dayStr = `2026-07-${String(day).padStart(2, '0')}`;
              const dayTasks = tasks.filter(t => t.dueDate === dayStr);
              if (dayTasks.length > 0) {
                showToast.info(`July ${day}: ${dayTasks.length} task(s) scheduled.`);
              } else {
                showToast.info(`July ${day}: No scheduled deadlines.`);
              }
            }}
          />
        </div>
      )}

      {/* Create Task Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Create Scheduled Task">
        <form onSubmit={handleCreateTask} className="space-y-4">
          <Input label="Task Title" placeholder="Review billing proposal" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <Input label="Description" placeholder="Add any technical details or checklist items..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Due Date" type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} required />
            <Input label="Related Account (Company)" placeholder="Stripe Inc" value={form.relatedTo} onChange={(e) => setForm({ ...form, relatedTo: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Priority"
              options={[{ value: 'low', label: 'Low' }, { value: 'medium', label: 'Medium' }, { value: 'high', label: 'High' }]}
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
            />
            <Select
              label="Status"
              options={[{ value: 'todo', label: 'To Do' }, { value: 'in_progress', label: 'In Progress' }, { value: 'completed', label: 'Completed' }]}
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary" size="sm">Schedule Task</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
