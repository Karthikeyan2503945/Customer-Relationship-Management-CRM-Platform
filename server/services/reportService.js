const Customer = require('../models/Customer');
const Lead = require('../models/Lead');
const Task = require('../models/Task');

class ReportService {
  async getSalesReports(query) {
    // Generate sales report based on Won leads
    let filter = { status: 'Won' };
    if (query.startDate && query.endDate) {
      filter.updatedAt = { $gte: new Date(query.startDate), $lte: new Date(query.endDate) };
    }

    const sales = await Lead.find(filter).populate('assignedExecutive', 'name').sort('-updatedAt');
    const totalRevenue = sales.reduce((acc, sale) => acc + (sale.expectedValue || 0), 0);

    return {
      totalRevenue,
      totalSales: sales.length,
      data: sales
    };
  }

  async getCustomerReports(query) {
    let filter = {};
    if (query.startDate && query.endDate) {
      filter.createdAt = { $gte: new Date(query.startDate), $lte: new Date(query.endDate) };
    }

    const customers = await Customer.find(filter).populate('assignedExecutive', 'name').sort('-createdAt');
    return {
      totalCustomers: customers.length,
      data: customers
    };
  }

  async getLeadReports(query) {
    let filter = {};
    if (query.startDate && query.endDate) {
      filter.createdAt = { $gte: new Date(query.startDate), $lte: new Date(query.endDate) };
    }

    const leads = await Lead.find(filter).populate('assignedExecutive', 'name').sort('-createdAt');
    return {
      totalLeads: leads.length,
      data: leads
    };
  }

  async getTaskReports(query) {
    let filter = {};
    if (query.startDate && query.endDate) {
      filter.dueDate = { $gte: new Date(query.startDate), $lte: new Date(query.endDate) };
    }
    if (query.status) {
      filter.status = query.status;
    }

    const tasks = await Task.find(filter).populate('assignedTo', 'name').sort('-dueDate');
    return {
      totalTasks: tasks.length,
      data: tasks
    };
  }
}

module.exports = new ReportService();
