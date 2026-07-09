const Customer = require('../models/Customer');
const Lead = require('../models/Lead');
const Task = require('../models/Task');
const ActivityLog = require('../models/ActivityLog');
const mongoose = require('mongoose');

class DashboardService {
  async getSummary(user) {
    let customerFilter = {};
    let leadFilter = {};
    let taskFilter = {};
    
    if (user.role === 'Sales Executive') {
      customerFilter.assignedExecutive = new mongoose.Types.ObjectId(user.id);
      leadFilter.assignedExecutive = new mongoose.Types.ObjectId(user.id);
      taskFilter.assignedTo = new mongoose.Types.ObjectId(user.id);
    }

    const totalCustomers = await Customer.countDocuments(customerFilter);
    const totalLeads = await Lead.countDocuments(leadFilter);
    const activeOpportunities = await Lead.countDocuments({ ...leadFilter, status: { $in: ['Contacted', 'Qualified', 'Proposal Sent'] } });
    const pendingTasks = await Task.countDocuments({ ...taskFilter, status: { $in: ['Pending', 'In Progress'] } });
    
    const wonLeads = await Lead.find({ ...leadFilter, status: 'Won' });
    const totalRevenue = wonLeads.reduce((acc, lead) => acc + (lead.expectedValue || 0), 0);
    const closedDeals = wonLeads.length;
    
    const conversionRate = totalLeads === 0 ? 0 : ((closedDeals / totalLeads) * 100).toFixed(2);

    return {
      totalCustomers,
      totalLeads,
      activeOpportunities,
      pendingTasks,
      totalRevenue,
      closedDeals,
      conversionRate
    };
  }

  async getCharts(user) {
    let leadFilter = {};
    if (user.role === 'Sales Executive') {
      leadFilter.assignedExecutive = new mongoose.Types.ObjectId(user.id);
    }

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyRevenue = await Lead.aggregate([
      { 
        $match: { 
          ...leadFilter,
          status: 'Won',
          updatedAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: { month: { $month: '$updatedAt' }, year: { $year: '$updatedAt' } },
          revenue: { $sum: '$expectedValue' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    const leadSources = await Lead.aggregate([
      { $match: leadFilter },
      { $group: { _id: '$source', count: { $sum: 1 } } }
    ]);

    return { monthlyRevenue, leadSources };
  }

  async getRecentActivities(user) {
    let filter = {};
    if (user.role === 'Sales Executive') {
      filter.actor = user.id; // Basic filter; more robust would check if entity belongs to user
    }

    const activities = await ActivityLog.find(filter)
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('actor', 'name avatar');
      
    return activities;
  }
}

module.exports = new DashboardService();
