const taskService = require('../services/taskService');
const ResponseHelper = require('../utils/responseHelper');

const taskController = {
  getAll: async (req, res, next) => {
    try {
      if (req.user.role === 'Sales Executive') {
        req.query.assignedTo = req.user.id;
      }
      const data = await taskService.getAllTasks(req.query);
      return ResponseHelper.success(res, 200, 'Tasks retrieved successfully', data.tasks, data.pagination);
    } catch (err) {
      next(err);
    }
  },

  getById: async (req, res, next) => {
    try {
      const task = await taskService.getTaskById(req.params.id);
      if (req.user.role === 'Sales Executive' && task.assignedTo?._id.toString() !== req.user.id && task.createdBy?._id.toString() !== req.user.id) {
        return ResponseHelper.error(res, 403, 'Not authorized to access this task');
      }
      return ResponseHelper.success(res, 200, 'Task retrieved successfully', { task });
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const task = await taskService.createTask(req.body, req.user.id);
      return ResponseHelper.success(res, 201, 'Task created successfully', { task });
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const task = await taskService.updateTask(req.params.id, req.body);
      return ResponseHelper.success(res, 200, 'Task updated successfully', { task });
    } catch (err) {
      next(err);
    }
  },

  complete: async (req, res, next) => {
    try {
      const task = await taskService.completeTask(req.params.id);
      return ResponseHelper.success(res, 200, 'Task marked as completed', { task });
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      await taskService.deleteTask(req.params.id);
      return ResponseHelper.success(res, 200, 'Task deleted successfully');
    } catch (err) {
      next(err);
    }
  }
};

module.exports = taskController;
