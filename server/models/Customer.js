const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: [true, 'Please add a customer name'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  company: {
    type: String,
    required: [true, 'Please add a company name'],
    trim: true
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  phone: {
    type: String,
    maxlength: [20, 'Phone number cannot exceed 20 characters']
  },
  address: {
    type: String
  },
  industry: {
    type: String
  },
  website: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'Please use a valid URL with HTTP or HTTPS'
    ]
  },
  notes: {
    type: String
  },
  assignedExecutive: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Churned'],
    default: 'Active'
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
CustomerSchema.index({ status: 1, assignedExecutive: 1 });
CustomerSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Customer', CustomerSchema);
