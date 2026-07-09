import api from './api';

const settingsService = {
  getAll: async () => {
    const response = await api.get('/settings');
    return response.data;
  }
};

export default settingsService;
