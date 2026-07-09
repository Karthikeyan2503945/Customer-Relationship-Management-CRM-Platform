import api from './api';

const notificationService = {
  getAll: async () => {
    const response = await api.get('/notification');
    return response.data;
  }
};

export default notificationService;
