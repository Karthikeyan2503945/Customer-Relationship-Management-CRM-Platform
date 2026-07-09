import api from './api';

const reportService = {
  getAll: async () => {
    const response = await api.get('/report');
    return response.data;
  }
};

export default reportService;
