const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a task title'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a task description']
  },
  dueDate: {
    type: Date,
    required: [true, 'Please add a due date']
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending'
  },
  assignedTo: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  relatedLead: {
    type: mongoose.Schema.ObjectId,
    ref: 'Lead'
  },
  relatedCustomer: {
    type: mongoose.Schema.ObjectId,
    ref: 'Customer'
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
}, { 
  timestamps: true 
});

// Indexes to prevent COLLSCAN and improve query throughput
TaskSchema.index({ status: 1, assignedTo: 1, dueDate: 1 });
TaskSchema.index({ priority: 1 });
TaskSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Task', TaskSchema);
