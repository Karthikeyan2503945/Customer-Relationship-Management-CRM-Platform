import api from './api';

const customerService = {
  getAll: async () => {
    const response = await api.get('/customer');
    return response.data;
  }
};

export default customerService;
