import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: localStorage.getItem('theme') || 'light',
  language: 'en',
  brandName: 'CRM360',
  notifications: {
    emailAlerts: true,
    pushAlerts: true,
    weeklyDigest: false,
    leadAssignments: true,
  },
  layoutMode: 'spacious', // spacious | compact
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.theme);
      
      // Update body class for tailwind styling immediately
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(state.theme);
      
      const body = window.document.body;
      body.classList.remove('light', 'dark');
      body.classList.add(state.theme);
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
    },
    updateNotifications: (state, action) => {
      state.notifications = { ...state.notifications, ...action.payload };
    },
    updateGeneralSettings: (state, action) => {
      return { ...state, ...action.payload };
    }
  },
});

export const {
  toggleTheme,
  setTheme,
  updateNotifications,
  updateGeneralSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;
