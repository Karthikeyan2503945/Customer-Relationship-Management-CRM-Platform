import { createSlice } from '@reduxjs/toolkit';
import { mockLeads } from '../../data/leads';

const initialState = {
  items: mockLeads,
  selectedLead: null,
  loading: false,
  error: null,
};

const leadSlice = createSlice({
  name: 'lead',
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
    selectLead: (state, action) => {
      state.selectedLead = state.items.find(l => l.id === action.payload) || null;
    },
    addLead: (state, action) => {
      const newLead = {
        id: `lead_${state.items.length + 1}`,
        createdAt: new Date().toISOString(),
        timeline: [],
        ...action.payload
      };
      state.items.push(newLead);
    },
    updateLeadStage: (state, action) => {
      const { leadId, stage } = action.payload;
      const lead = state.items.find(l => l.id === leadId);
      if (lead) {
        lead.stage = stage;
      }
    },
    updateLead: (state, action) => {
      const index = state.items.findIndex(l => l.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
        if (state.selectedLead && state.selectedLead.id === action.payload.id) {
          state.selectedLead = state.items[index];
        }
      }
    },
    deleteLead: (state, action) => {
      state.items = state.items.filter(l => l.id !== action.payload);
      if (state.selectedLead && state.selectedLead.id === action.payload) {
        state.selectedLead = null;
      }
    },
    addLeadTimeline: (state, action) => {
      const { leadId, text, actor } = action.payload;
      const lead = state.items.find(l => l.id === leadId);
      if (lead) {
        lead.timeline.unshift({
          id: lead.timeline.length + 1,
          type: 'update',
          text,
          actor,
          date: new Date().toISOString()
        });
        if (state.selectedLead && state.selectedLead.id === leadId) {
          state.selectedLead = lead;
        }
      }
    }
  },
});

export const {
  fetchStart,
  fetchSuccess,
  fetchFailure,
  selectLead,
  addLead,
  updateLeadStage,
  updateLead,
  deleteLead,
  addLeadTimeline,
} = leadSlice.actions;

export default leadSlice.reducer;
