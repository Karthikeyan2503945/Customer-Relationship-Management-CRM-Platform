const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/authorize');

router.use(protect);

router.route('/')
  .get(customerController.getAll)
  .post(authorize('Admin', 'Sales Manager', 'Sales Executive'), customerController.create);

router.route('/:id')
  .get(customerController.getById)
  .put(authorize('Admin', 'Sales Manager', 'Sales Executive'), customerController.update)
  .delete(authorize('Admin', 'Sales Manager'), customerController.delete);

module.exports = router;
