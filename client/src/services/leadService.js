import api from './api';

const leadService = {
  getAll: async () => {
    const response = await api.get('/lead');
    return response.data;
  }
};

export default leadService;
