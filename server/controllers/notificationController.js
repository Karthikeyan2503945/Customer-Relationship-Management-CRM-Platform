const notificationService = require('../services/notificationService');
const ResponseHelper = require('../utils/responseHelper');

const notificationController = {
  getAll: async (req, res, next) => {
    try {
      const notifications = await notificationService.getNotifications(req.user.id, req.query);
      return ResponseHelper.success(res, 200, 'Notifications retrieved', { notifications });
    } catch (err) {
      next(err);
    }
  },

  markAsRead: async (req, res, next) => {
    try {
      const notification = await notificationService.markAsRead(req.params.id, req.user.id);
      return ResponseHelper.success(res, 200, 'Notification marked as read', { notification });
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      await notificationService.deleteNotification(req.params.id, req.user.id);
      return ResponseHelper.success(res, 200, 'Notification deleted');
    } catch (err) {
      next(err);
    }
  }
};

module.exports = notificationController;
