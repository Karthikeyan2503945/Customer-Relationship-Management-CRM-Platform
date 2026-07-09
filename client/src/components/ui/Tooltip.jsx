import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Tooltip({
  children,
  content,
  position = 'top', // top | bottom | left | right
  className = '',
}) {
  const [active, setActive] = useState(false);

  const showTooltip = () => setActive(true);
  const hideTooltip = () => setActive(false);

  const positionStyles = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const animationVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      <AnimatePresence>
        {active && content && (
          <motion.div
            variants={animationVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.15 }}
            className={`absolute z-50 whitespace-nowrap bg-slate-900 text-white text-xs px-2.5 py-1.5 rounded shadow-lg pointer-events-none dark:bg-slate-800 ${positionStyles[position]} ${className}`}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
