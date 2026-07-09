const leadService = require('../services/leadService');
const ResponseHelper = require('../utils/responseHelper');

const leadController = {
  getAll: async (req, res, next) => {
    try {
      if (req.user.role === 'Sales Executive') {
        req.query.assignedExecutive = req.user.id;
      }
      const data = await leadService.getAllLeads(req.query);
      return ResponseHelper.success(res, 200, 'Leads retrieved successfully', data.leads, data.pagination);
    } catch (err) {
      next(err);
    }
  },

  getById: async (req, res, next) => {
    try {
      const lead = await leadService.getLeadById(req.params.id);
      if (req.user.role === 'Sales Executive' && lead.assignedExecutive?._id.toString() !== req.user.id) {
        return ResponseHelper.error(res, 403, 'Not authorized to access this lead');
      }
      return ResponseHelper.success(res, 200, 'Lead retrieved successfully', { lead });
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const lead = await leadService.createLead(req.body, req.user.id);
      return ResponseHelper.success(res, 201, 'Lead created successfully', { lead });
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const lead = await leadService.updateLead(req.params.id, req.body);
      return ResponseHelper.success(res, 200, 'Lead updated successfully', { lead });
    } catch (err) {
      next(err);
    }
  },

  assign: async (req, res, next) => {
    try {
      const lead = await leadService.assignLead(req.params.id, req.body.assignedExecutive);
      return ResponseHelper.success(res, 200, 'Lead assigned successfully', { lead });
    } catch (err) {
      next(err);
    }
  },

  convert: async (req, res, next) => {
    try {
      const data = await leadService.convertToCustomer(req.params.id, req.user.id);
      return ResponseHelper.success(res, 200, 'Lead converted to customer successfully', data);
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      await leadService.deleteLead(req.params.id);
      return ResponseHelper.success(res, 200, 'Lead deleted successfully');
    } catch (err) {
      next(err);
    }
  }
};

module.exports = leadController;
