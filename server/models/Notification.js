const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  receiver: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Please add a notification title']
  },
  message: {
    type: String,
    required: [true, 'Please add a notification message']
  },
  type: {
    type: String,
    enum: ['Task', 'Lead', 'Customer', 'System'],
    default: 'System'
  },
  isRead: {
    type: Boolean,
    default: false
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Notification', NotificationSchema);
