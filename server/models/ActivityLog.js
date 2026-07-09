const mongoose = require('mongoose');

const ActivityLogSchema = new mongoose.Schema({
  actor: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    required: true
  },
  entity: {
    type: String,
    required: true
  },
  entityId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  details: {
    type: Object
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('ActivityLog', ActivityLogSchema);
