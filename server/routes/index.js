const express = require('express');
const router = express.Router();

router.use('/auth', require('./authRoutes'));
router.use('/users', require('./userRoutes'));
router.use('/customers', require('./customerRoutes'));
router.use('/leads', require('./leadRoutes'));
router.use('/tasks', require('./taskRoutes'));
router.use('/notifications', require('./notificationRoutes'));
router.use('/reports', require('./reportRoutes'));
router.use('/settings', require('./settingsRoutes'));
router.use('/dashboard', require('./dashboardRoutes'));

module.exports = router;
