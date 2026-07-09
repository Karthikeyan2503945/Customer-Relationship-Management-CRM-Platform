import { createSlice } from '@reduxjs/toolkit';
import { mockNotifications } from '../../data/notifications';

const initialState = {
  items: mockNotifications,
  loading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload;
    },
    fetchFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    markAsRead: (state, action) => {
      const notif = state.items.find(n => n.id === action.payload);
      if (notif) {
        notif.isRead = true;
      }
    },
    markAllAsRead: (state) => {
      state.items.forEach(n => {
        n.isRead = true;
      });
    },
    addNotification: (state, action) => {
      state.items.unshift({
        id: `notif_${state.items.length + 1}`,
        isRead: false,
        createdAt: 'Just now',
        ...action.payload
      });
    },
    deleteNotification: (state, action) => {
      state.items = state.items.filter(n => n.id !== action.payload);
    }
  },
});

export const {
  fetchStart,
  fetchSuccess,
  fetchFailure,
  markAsRead,
  markAllAsRead,
  addNotification,
  deleteNotification,
} = notificationSlice.actions;

export default notificationSlice.reducer;
