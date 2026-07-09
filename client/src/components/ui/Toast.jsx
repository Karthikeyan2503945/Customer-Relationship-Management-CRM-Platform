import toast from 'react-hot-toast';

const toastStyle = {
  style: {
    borderRadius: '14px',
    background: '#0F172A',
    color: '#F8FAFC',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    padding: '12px 16px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
  success: {
    iconTheme: {
      primary: '#22C55E',
      secondary: '#0F172A',
    },
  },
  error: {
    iconTheme: {
      primary: '#EF4444',
      secondary: '#0F172A',
    },
  },
};

export const showToast = {
  success: (message) => toast.success(message, toastStyle),
  error: (message) => toast.error(message, toastStyle),
  info: (message) => toast(message, {
    ...toastStyle,
    icon: 'ℹ️'
  }),
};
