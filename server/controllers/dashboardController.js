const dashboardService = require('../services/dashboardService');
const ResponseHelper = require('../utils/responseHelper');

const dashboardController = {
  getSummary: async (req, res, next) => {
    try {
      const summary = await dashboardService.getSummary(req.user);
      return ResponseHelper.success(res, 200, 'Dashboard summary retrieved', summary);
    } catch (err) {
      next(err);
    }
  },

  getCharts: async (req, res, next) => {
    try {
      const charts = await dashboardService.getCharts(req.user);
      return ResponseHelper.success(res, 200, 'Dashboard charts retrieved', charts);
    } catch (err) {
      next(err);
    }
  },

  getRecentActivities: async (req, res, next) => {
    try {
      const activities = await dashboardService.getRecentActivities(req.user);
      return ResponseHelper.success(res, 200, 'Recent activities retrieved', activities);
    } catch (err) {
      next(err);
    }
  }
};

module.exports = dashboardController;
