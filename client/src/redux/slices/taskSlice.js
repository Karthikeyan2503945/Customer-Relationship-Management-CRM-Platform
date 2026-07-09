import { createSlice } from '@reduxjs/toolkit';
import { mockTasks } from '../../data/tasks';

const initialState = {
  items: mockTasks,
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: 'task',
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
    addTask: (state, action) => {
      const newTask = {
        id: `task_${state.items.length + 1}`,
        progress: 0,
        ...action.payload
      };
      state.items.push(newTask);
    },
    updateTaskStatus: (state, action) => {
      const { taskId, status } = action.payload;
      const task = state.items.find(t => t.id === taskId);
      if (task) {
        task.status = status;
        if (status === 'completed') {
          task.progress = 100;
        }
      }
    },
    updateTask: (state, action) => {
      const index = state.items.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
    deleteTask: (state, action) => {
      state.items = state.items.filter(t => t.id !== action.payload);
    }
  },
});

export const {
  fetchStart,
  fetchSuccess,
  fetchFailure,
  addTask,
  updateTaskStatus,
  updateTask,
  deleteTask,
} = taskSlice.actions;

export default taskSlice.reducer;
