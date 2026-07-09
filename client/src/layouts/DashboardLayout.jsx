import React, { useState, useEffect, Suspense } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import Sidebar from '../components/Navigation/Sidebar';
import Header from '../components/Navigation/Header';
import Drawer from '../components/ui/Drawer';
import Loader from '../components/Common/Loader';

const NotificationCenter = React.lazy(() => import('../pages/Dashboard/Notifications/NotificationCenter'));

export default function DashboardLayout() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const theme = useSelector((state) => state.settings.theme);
  
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Sync theme classes on initial mount
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    
    const body = window.document.body;
    body.classList.remove('light', 'dark');
    body.classList.add(theme);
  }, [theme]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={`min-h-screen bg-lightBg text-slate-800 dark:bg-darkBg dark:text-slate-100 transition-colors duration-300 font-sans`}>
      {/* Toast Notification Container */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Collapsible Sidebar - Desktop */}
      <div className="hidden lg:block">
        <Sidebar isCollapsed={sidebarCollapsed} setIsCollapsed={setSidebarCollapsed} />
      </div>

      {/* Drawer Sidebar - Mobile */}
      <Drawer
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
        title="CRM360 Nav"
        position="left"
        size="sm"
        className="lg:hidden bg-slate-900 border-r border-slate-800"
      >
        <Sidebar isCollapsed={false} setIsCollapsed={() => {}} />
      </Drawer>

      {/* Main Layout Area */}
      <div
        className="flex flex-col min-h-screen transition-all duration-300"
        style={{ paddingLeft: sidebarCollapsed ? '76px' : '260px' }}
      >
        {/* Top Header navbar */}
        <Header
          onOpenNotifications={() => setNotificationsOpen(true)}
          onToggleMobileSidebar={() => setMobileSidebarOpen(true)}
        />

        {/* Dynamic Nested Content */}
        <motion.main
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 p-6 lg:p-8"
        >
          <Outlet />
        </motion.main>
      </div>

      {/* Side Slide Notifications panel */}
      <Drawer
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        title="Notification Center"
        position="right"
        size="md"
      >
        <Suspense fallback={<Loader />}>
          <NotificationCenter />
        </Suspense>
      </Drawer>
    </div>
  );
}
