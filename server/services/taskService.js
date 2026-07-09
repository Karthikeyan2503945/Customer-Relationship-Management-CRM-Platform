const taskRepository = require('../repositories/taskRepository');
const AppError = require('../utils/AppError');

class TaskService {
  async getAllTasks(query) {
    const page = parseInt(query.page, 10) || 1;
    const limit = parseInt(query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    let filter = {};
    
    if (query.status) filter.status = query.status;
    if (query.priority) filter.priority = query.priority;
    if (query.assignedTo) filter.assignedTo = query.assignedTo;

    const options = {
      skip: startIndex,
      limit: limit,
      sort: query.sort ? query.sort.split(',').join(' ') : 'dueDate',
      populate: [
        { path: 'assignedTo', select: 'name email' },
        { path: 'createdBy', select: 'name email' },
        { path: 'relatedLead', select: 'leadName company' },
        { path: 'relatedCustomer', select: 'customerName company' }
      ]
    };

    const tasks = await taskRepository.find(filter, '', options);
    const total = await taskRepository.countDocuments(filter);

    return {
      tasks,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    };
  }

  async getTaskById(id) {
    const task = await taskRepository.findById(id, '', [
      { path: 'assignedTo', select: 'name email' },
      { path: 'createdBy', select: 'name email' },
      { path: 'relatedLead', select: 'leadName company' },
      { path: 'relatedCustomer', select: 'customerName company' }
    ]);
    if (!task) throw new AppError('Task not found', 404);
    return task;
  }

  async createTask(taskData, userId) {
    taskData.createdBy = userId;
    if (!taskData.assignedTo) {
      taskData.assignedTo = userId;
    }
    return await taskRepository.create(taskData);
  }

  async updateTask(id, taskData) {
    const task = await taskRepository.update(id, taskData);
    if (!task) throw new AppError('Task not found', 404);
    return task;
  }

  async completeTask(id) {
    const task = await taskRepository.update(id, { status: 'Completed' });
    if (!task) throw new AppError('Task not found', 404);
    return task;
  }

  async deleteTask(id) {
    const task = await taskRepository.delete(id);
    if (!task) throw new AppError('Task not found', 404);
    return task;
  }
}

module.exports = new TaskService();
