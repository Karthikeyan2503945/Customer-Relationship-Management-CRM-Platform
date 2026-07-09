const customerService = require('../services/customerService');
const ResponseHelper = require('../utils/responseHelper');

const customerController = {
  getAll: async (req, res, next) => {
    try {
      // For Sales Executive, restrict to their own customers unless Admin/Manager
      if (req.user.role === 'Sales Executive') {
        req.query.assignedExecutive = req.user.id;
      }
      
      const data = await customerService.getAllCustomers(req.query);
      return ResponseHelper.success(res, 200, 'Customers retrieved successfully', data.customers, data.pagination);
    } catch (err) {
      next(err);
    }
  },

  getById: async (req, res, next) => {
    try {
      const customer = await customerService.getCustomerById(req.params.id);
      // RBAC check
      if (req.user.role === 'Sales Executive' && customer.assignedExecutive?._id.toString() !== req.user.id) {
        return ResponseHelper.error(res, 403, 'Not authorized to access this customer');
      }
      return ResponseHelper.success(res, 200, 'Customer retrieved successfully', { customer });
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const customer = await customerService.createCustomer(req.body, req.user.id);
      return ResponseHelper.success(res, 201, 'Customer created successfully', { customer });
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const customer = await customerService.updateCustomer(req.params.id, req.body);
      return ResponseHelper.success(res, 200, 'Customer updated successfully', { customer });
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      await customerService.deleteCustomer(req.params.id);
      return ResponseHelper.success(res, 200, 'Customer deleted successfully');
    } catch (err) {
      next(err);
    }
  }
};

module.exports = customerController;
