import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  LayoutDashboard,
  Users,
  GitFork,
  CheckSquare,
  BarChart3,
  Settings,
  User,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Calendar,
  Bell,
  UserCog,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Avatar from '../ui/Avatar';

export default function Sidebar({ isCollapsed, setIsCollapsed }) {
  const { user } = useSelector((state) => state.auth);
  
  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, roles: ['admin', 'sales_manager', 'sales_executive'] },
    { label: 'Customers', path: '/customers', icon: Users, roles: ['admin', 'sales_manager', 'sales_executive'] },
    { label: 'Leads', path: '/leads', icon: GitFork, roles: ['admin', 'sales_manager', 'sales_executive'] },
    { label: 'Sales Pipeline', path: '/pipeline', icon: GitFork, roles: ['admin', 'sales_manager', 'sales_executive'] },
    { label: 'Tasks', path: '/tasks', icon: CheckSquare, roles: ['admin', 'sales_manager', 'sales_executive'] },
    { label: 'Calendar', path: '/calendar', icon: Calendar, roles: ['admin', 'sales_manager', 'sales_executive'] },
    { label: 'Reports', path: '/reports', icon: BarChart3, roles: ['admin', 'sales_manager'] }, // Admin & Manager
    { label: 'Notifications', path: '/notifications', icon: Bell, roles: ['admin', 'sales_manager', 'sales_executive'] },
    { label: 'Users (Admin)', path: '/users', icon: UserCog, roles: ['admin'] }, // Admin Only
    { label: 'Profile', path: '/profile', icon: User, roles: ['admin', 'sales_manager', 'sales_executive'] },
    { label: 'Settings', path: '/settings', icon: Settings, roles: ['admin', 'sales_manager', 'sales_executive'] },
  ];

  // Filter links by user role (normalizing backend case like "Sales Executive" to "sales_executive")
  const formattedRole = user?.role
    ?.toLowerCase()
    ?.replace(' ', '_') || 'sales_executive';

  const visibleItems = navItems.filter((item) =>
    item.roles.includes(formattedRole)
  );

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 76 : 260 }}
      transition={{ type: 'spring', damping: 20, stiffness: 120 }}
      className="fixed inset-y-0 left-0 z-20 flex flex-col h-full bg-slate-900 text-slate-400 border-r border-slate-800 shrink-0"
    >
      {/* Brand logo header */}
      <div className="flex items-center justify-between h-16 px-5 border-b border-slate-800 shrink-0 overflow-hidden">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-9 w-9 rounded-button bg-primary shrink-0 text-white font-bold">
            <TrendingUp className="h-5 w-5" />
          </div>
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-lg font-extrabold text-white tracking-wide"
            >
              CRM360
            </motion.span>
          )}
        </div>
        {!isCollapsed && (
          <button
            onClick={() => setIsCollapsed(true)}
            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Navigation list */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto overflow-x-hidden">
        {visibleItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-3 py-3 rounded-input text-body font-semibold transition-all group ${
                  isActive
                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                    : 'hover:bg-slate-800/60 hover:text-slate-100'
                }`
              }
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-slate-800 flex items-center justify-center shrink-0">
        {isCollapsed && (
          <button
            onClick={() => setIsCollapsed(false)}
            className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
        {!isCollapsed && (
          <div className="flex items-center gap-3 w-full">
            <Avatar
              src={user?.avatar}
              name={user?.name}
              size="sm"
              className="border-slate-700 shrink-0"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-small font-bold text-white truncate">
                {user?.name}
              </span>
              <span className="text-[11px] text-slate-500 capitalize truncate">
                {user?.role?.replace('_', ' ')}
              </span>
            </div>
          </div>
        )}
      </div>
    </motion.aside>
  );
}
