const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/summary', dashboardController.getSummary);
router.get('/charts', dashboardController.getCharts);
router.get('/recent-activities', dashboardController.getRecentActivities);

module.exports = router;
