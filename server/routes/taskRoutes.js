const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/authorize');

router.use(protect);

router.route('/')
  .get(taskController.getAll)
  .post(taskController.create);

router.route('/:id')
  .get(taskController.getById)
  .put(taskController.update)
  .delete(authorize('Admin', 'Sales Manager'), taskController.delete);

router.patch('/:id/complete', taskController.complete);

module.exports = router;
