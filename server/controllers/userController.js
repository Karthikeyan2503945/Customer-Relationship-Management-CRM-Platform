const userService = require('../services/userService');
const ResponseHelper = require('../utils/responseHelper');

const userController = {
  getAll: async (req, res, next) => {
    try {
      const users = await userService.getAllUsers(req.query);
      return ResponseHelper.success(res, 200, 'Users retrieved successfully', { users });
    } catch (err) {
      next(err);
    }
  },

  getById: async (req, res, next) => {
    try {
      const user = await userService.getUserById(req.params.id);
      return ResponseHelper.success(res, 200, 'User retrieved successfully', { user });
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const user = await userService.createUser(req.body);
      return ResponseHelper.success(res, 201, 'User created successfully', { user });
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      return ResponseHelper.success(res, 200, 'User updated successfully', { user });
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      await userService.deleteUser(req.params.id);
      return ResponseHelper.success(res, 200, 'User deleted successfully');
    } catch (err) {
      next(err);
    }
  }
};

module.exports = userController;
