const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.route('/')
  .get(notificationController.getAll);

router.route('/:id/read')
  .patch(notificationController.markAsRead);

router.route('/:id')
  .delete(notificationController.delete);

module.exports = router;
