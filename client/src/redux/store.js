import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import customerReducer from './slices/customerSlice';
import dashboardReducer from './slices/dashboardSlice';
import leadReducer from './slices/leadSlice';
import notificationReducer from './slices/notificationSlice';
import reportReducer from './slices/reportSlice';
import settingsReducer from './slices/settingsSlice';
import taskReducer from './slices/taskSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    dashboard: dashboardReducer,
    lead: leadReducer,
    notification: notificationReducer,
    report: reportReducer,
    settings: settingsReducer,
    task: taskReducer,
  },
});
