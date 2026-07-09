import { createSlice } from '@reduxjs/toolkit';
import { mockDashboardData } from '../../data/dashboardData';

const initialState = {
  data: mockDashboardData,
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    updateKpi: (state, action) => {
      state.data.kpis = { ...state.data.kpis, ...action.payload };
    },
    addActivity: (state, action) => {
      state.data.recentActivities.unshift({
        id: state.data.recentActivities.length + 1,
        date: 'Just now',
        ...action.payload
      });
    }
  }
});

export const { updateKpi, addActivity } = dashboardSlice.actions;
export default dashboardSlice.reducer;
