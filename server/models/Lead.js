const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  leadName: {
    type: String,
    required: [true, 'Please add a lead name'],
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
  source: {
    type: String,
    enum: ['Website', 'Referral', 'Cold Call', 'Conference', 'Social Media', 'Other'],
    default: 'Other'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost'],
    default: 'New'
  },
  followUpDate: {
    type: Date
  },
  expectedValue: {
    type: Number,
    default: 0
  },
  assignedExecutive: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  notes: {
    type: String
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
LeadSchema.index({ status: 1, assignedExecutive: 1 });
LeadSchema.index({ priority: 1 });
LeadSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Lead', LeadSchema);
