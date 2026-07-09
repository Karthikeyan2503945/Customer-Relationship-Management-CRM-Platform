import { createSlice } from '@reduxjs/toolkit';
import { mockReportsData } from '../../data/reports';

const initialState = {
  data: mockReportsData,
  loading: false,
  error: null,
};

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    setReportsData: (state, action) => {
      state.data = action.payload;
    }
  }
});

export const { setReportsData } = reportSlice.actions;
export default reportSlice.reducer;
