const notificationRepository = require('../repositories/notificationRepository');
const AppError = require('../utils/AppError');

class NotificationService {
  async getNotifications(userId, query) {
    let filter = { receiver: userId };
    if (query.isRead !== undefined) {
      filter.isRead = query.isRead === 'true';
    }

    const notifications = await notificationRepository.find(filter, '', { sort: '-createdAt' });
    return notifications;
  }

  async markAsRead(id, userId) {
    const notification = await notificationRepository.findById(id);
    if (!notification) throw new AppError('Notification not found', 404);
    if (notification.receiver.toString() !== userId) {
      throw new AppError('Unauthorized access', 403);
    }
    
    return await notificationRepository.update(id, { isRead: true });
  }

  async deleteNotification(id, userId) {
    const notification = await notificationRepository.findById(id);
    if (!notification) throw new AppError('Notification not found', 404);
    if (notification.receiver.toString() !== userId) {
      throw new AppError('Unauthorized access', 403);
    }

    return await notificationRepository.delete(id);
  }

  async createNotification(data) {
    const notification = await notificationRepository.create(data);
    
    // Emit via Socket.io
    try {
      const io = require('../sockets/socketHandler').getIO();
      io.to(data.receiver.toString()).emit('newNotification', notification);
    } catch (err) {
      console.log('Socket.io not initialized or error emitting', err);
    }

    return notification;
  }
}

module.exports = new NotificationService();
