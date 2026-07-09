const authService = require('../services/authService');
const ResponseHelper = require('../utils/responseHelper');

const authController = {
  register: async (req, res, next) => {
    try {
      const user = await authService.registerUser(req.body);
      return ResponseHelper.success(res, 201, 'User registered successfully', { user });
    } catch (err) {
      next(err);
    }
  },
  
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const data = await authService.loginUser(email, password);
      return ResponseHelper.success(res, 200, 'Logged in successfully', data);
    } catch (err) {
      next(err);
    }
  },
  
  logout: async (req, res, next) => {
    try {
      // In a more robust system, we would invalidate the refresh token in the database
      return ResponseHelper.success(res, 200, 'Logged out successfully');
    } catch (err) {
      next(err);
    }
  },

  refreshToken: async (req, res, next) => {
    try {
      const { token } = req.body;
      const data = await authService.refreshToken(token);
      return ResponseHelper.success(res, 200, 'Token refreshed', data);
    } catch (err) {
      next(err);
    }
  },

  getProfile: async (req, res, next) => {
    try {
      const user = await authService.getUserProfile(req.user.id);
      return ResponseHelper.success(res, 200, 'Profile retrieved', { user });
    } catch (err) {
      next(err);
    }
  },

  updateProfile: async (req, res, next) => {
    try {
      const user = await authService.updateProfile(req.user.id, req.body);
      return ResponseHelper.success(res, 200, 'Profile updated', { user });
    } catch (err) {
      next(err);
    }
  },

  changePassword: async (req, res, next) => {
    try {
      const { currentPassword, newPassword } = req.body;
      const data = await authService.changePassword(req.user.id, currentPassword, newPassword);
      return ResponseHelper.success(res, 200, 'Password changed successfully', data);
    } catch (err) {
      next(err);
    }
  }
};

module.exports = authController;
