const reportService = require('../services/reportService');
const ResponseHelper = require('../utils/responseHelper');

const reportController = {
  getSales: async (req, res, next) => {
    try {
      const data = await reportService.getSalesReports(req.query);
      return ResponseHelper.success(res, 200, 'Sales report generated', data);
    } catch (err) {
      next(err);
    }
  },

  getCustomers: async (req, res, next) => {
    try {
      const data = await reportService.getCustomerReports(req.query);
      return ResponseHelper.success(res, 200, 'Customer report generated', data);
    } catch (err) {
      next(err);
    }
  },

  getLeads: async (req, res, next) => {
    try {
      const data = await reportService.getLeadReports(req.query);
      return ResponseHelper.success(res, 200, 'Lead report generated', data);
    } catch (err) {
      next(err);
    }
  },

  getTasks: async (req, res, next) => {
    try {
      const data = await reportService.getTaskReports(req.query);
      return ResponseHelper.success(res, 200, 'Task report generated', data);
    } catch (err) {
      next(err);
    }
  }
};

module.exports = reportController;
