import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function Drawer({
  isOpen,
  onClose,
  title,
  children,
  size = 'md', // sm | md | lg
  position = 'right', // right | left
  className = '',
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
  };

  const drawerVariants = {
    hidden: { x: position === 'right' ? '100%' : '-100%' },
    visible: { x: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/30 backdrop-blur-sm"
          />

          <div className={`absolute inset-y-0 ${position === 'right' ? 'right-0' : 'left-0'} flex max-w-full`}>
            {/* Panel */}
            <motion.div
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
              className={`pointer-events-auto w-screen ${sizes[size]} bg-white dark:bg-slate-900 border-l border-slate-100 dark:border-slate-800 shadow-2xl flex flex-col h-full ${className}`}
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <h2 className="text-h3 font-bold text-slate-900 dark:text-slate-100">
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  className="p-1 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6 text-body">
                {children}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
