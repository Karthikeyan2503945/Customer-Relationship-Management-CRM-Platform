import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TrendingUp, CheckCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AuthLayout() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  // If already logged in, redirect to dashboard overview
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      {/* Left side: Premium branding section */}
      <div className="relative hidden w-1/2 bg-slate-900 lg:flex flex-col justify-between p-12 overflow-hidden border-r border-slate-800">
        {/* Animated background shapes */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,rgba(37,99,235,0.12),rgba(6,182,212,0.05),transparent)] pointer-events-none" />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 45, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-primary/10 blur-[120px] pointer-events-none"
        />

        {/* Top Logo */}
        <div className="flex items-center gap-2.5 relative z-10">
          <div className="flex items-center justify-center h-10 w-10 rounded-button bg-primary text-white font-extrabold shadow-md">
            <TrendingUp className="h-5.5 w-5.5" />
          </div>
          <span className="text-xl font-black text-white tracking-wider">CRM360</span>
        </div>

        {/* Middle Value Props */}
        <div className="max-w-md my-auto relative z-10 flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-h1 font-extrabold text-white leading-tight">
              Re-imagine Customer Relationships.
            </h1>
            <p className="text-body text-slate-400 mt-4 leading-relaxed">
              Supercharge your pipeline, automate workflows, and empower sales reps with the most beautiful, modern CRM ever designed.
            </p>
          </motion.div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <div>
                <span className="text-small font-bold text-white">Full Role-Based Access Control</span>
                <p className="text-xs text-slate-400">Restricted views tailored for Admins, Managers, and Executives.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <div>
                <span className="text-small font-bold text-white">Dynamic Sales Pipeline</span>
                <p className="text-xs text-slate-400">Drag-and-drop Kanban interface for real-time deal negotiations.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-xs text-slate-500 flex justify-between">
          <span>&copy; {new Date().getFullYear()} CRM360 Inc.</span>
        </div>
      </div>

      {/* Right side: Login forms card */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-md"
        >
          {/* Mobile brand header */}
          <div className="flex items-center gap-2 lg:hidden justify-center mb-8">
            <div className="flex items-center justify-center h-8 w-8 rounded-button bg-primary text-white font-extrabold shadow-md">
              <TrendingUp className="h-4.5 w-4.5" />
            </div>
            <span className="text-lg font-black text-slate-900 dark:text-white">CRM360</span>
          </div>

          <Outlet />
        </motion.div>
      </div>
    </div>
  );
}
