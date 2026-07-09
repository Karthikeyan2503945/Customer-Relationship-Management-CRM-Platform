const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/authorize');

router.use(protect);
router.use(authorize('Admin', 'Sales Manager')); // Only Admin and Managers can view reports

router.get('/sales', reportController.getSales);
router.get('/customers', reportController.getCustomers);
router.get('/leads', reportController.getLeads);
router.get('/tasks', reportController.getTasks);

module.exports = router;
