import api from './api';

const taskService = {
  getAll: async () => {
    const response = await api.get('/task');
    return response.data;
  }
};

export default taskService;
