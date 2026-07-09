import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Bell, Check, Trash2, ShieldAlert, Target, CheckSquare } from 'lucide-react';
import { markAsRead, markAllAsRead, deleteNotification } from '../../../redux/slices/notificationSlice';
import { showToast } from '../../../components/ui/Toast';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';

export default function NotificationCenter() {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notification.items);
  
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleMarkRead = (id) => {
    dispatch(markAsRead(id));
  };

  const handleMarkAllRead = () => {
    dispatch(markAllAsRead());
    showToast.success('All notifications marked as read');
  };

  const handleDelete = (id) => {
    dispatch(deleteNotification(id));
    showToast.success('Notification removed');
  };

  const getIcon = (type) => {
    const icons = {
      lead: <Target className="h-5 w-5 text-accent" />,
      task: <CheckSquare className="h-5 w-5 text-warning" />,
      system: <ShieldAlert className="h-5 w-5 text-slate-400" />,
    };
    return icons[type] || <Bell className="h-5 w-5 text-primary" />;
  };

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Header controls */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <span className="text-small text-slate-500">
          You have <span className="font-bold text-slate-700 dark:text-slate-300">{unreadCount}</span> unread alerts.
        </span>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="text-xs font-bold text-primary hover:underline"
          >
            Mark all read
          </button>
        )}
      </div>

      {/* Feed list */}
      <div className="flex-1 overflow-y-auto space-y-3.5 pr-1">
        {notifications.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-small">
            No notifications available.
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => !notif.isRead && handleMarkRead(notif.id)}
              className={`p-4 border rounded-card transition-all flex gap-3.5 relative cursor-pointer ${
                notif.isRead
                  ? 'bg-white border-slate-100 dark:bg-slate-900/50 dark:border-slate-800/80 opacity-75'
                  : 'bg-primary/5 border-primary/20 dark:bg-primary/10 dark:border-primary/20 shadow-sm'
              }`}
            >
              {/* Left type icon */}
              <div className="flex items-center justify-center h-10 w-10 rounded-button bg-slate-50 dark:bg-slate-800 shrink-0">
                {getIcon(notif.type)}
              </div>

              {/* Middle details */}
              <div className="flex-1 flex flex-col gap-0.5 pr-6">
                <span className="text-small font-bold text-slate-800 dark:text-slate-200">
                  {notif.title}
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {notif.message}
                </p>
                <span className="text-[10px] text-slate-400 mt-1">{notif.createdAt}</span>
              </div>

              {/* Right actions */}
              <div className="absolute right-3.5 top-3.5 flex gap-1 items-center">
                {!notif.isRead && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMarkRead(notif.id);
                    }}
                    className="p-1 rounded-full text-slate-400 hover:text-success hover:bg-success/5 transition-colors"
                    title="Mark Read"
                  >
                    <Check className="h-4 w-4" />
                  </button>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(notif.id);
                  }}
                  className="p-1 rounded-full text-slate-400 hover:text-danger hover:bg-danger/5 transition-colors"
                  title="Remove"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
