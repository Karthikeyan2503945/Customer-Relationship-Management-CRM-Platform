import { createSlice } from '@reduxjs/toolkit';
import { mockCustomers } from '../../data/customers';

const initialState = {
  items: mockCustomers,
  selectedCustomer: null,
  loading: false,
  error: null,
};

const customerSlice = createSlice({
  name: 'customer',
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
    selectCustomer: (state, action) => {
      state.selectedCustomer = state.items.find(c => c.id === action.payload) || null;
    },
    addCustomer: (state, action) => {
      const newCustomer = {
        id: `cust_${state.items.length + 1}`,
        createdAt: new Date().toISOString(),
        timeline: [],
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        ...action.payload
      };
      state.items.unshift(newCustomer);
    },
    updateCustomer: (state, action) => {
      const index = state.items.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
        if (state.selectedCustomer && state.selectedCustomer.id === action.payload.id) {
          state.selectedCustomer = state.items[index];
        }
      }
    },
    deleteCustomer: (state, action) => {
      state.items = state.items.filter(c => c.id !== action.payload);
      if (state.selectedCustomer && state.selectedCustomer.id === action.payload) {
        state.selectedCustomer = null;
      }
    },
    addCustomerTimeline: (state, action) => {
      const { customerId, type, text, actor } = action.payload;
      const customer = state.items.find(c => c.id === customerId);
      if (customer) {
        customer.timeline.unshift({
          id: customer.timeline.length + 1,
          type,
          text,
          actor,
          date: new Date().toISOString()
        });
        if (state.selectedCustomer && state.selectedCustomer.id === customerId) {
          state.selectedCustomer = customer;
        }
      }
    }
  },
});

export const {
  fetchStart,
  fetchSuccess,
  fetchFailure,
  selectCustomer,
  addCustomer,
  updateCustomer,
  deleteCustomer,
  addCustomerTimeline,
} = customerSlice.actions;

export default customerSlice.reducer;
