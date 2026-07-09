const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/authorize');

router.use(protect);

router.route('/')
  .get(leadController.getAll)
  .post(authorize('Admin', 'Sales Manager', 'Sales Executive'), leadController.create);

router.route('/:id')
  .get(leadController.getById)
  .put(authorize('Admin', 'Sales Manager', 'Sales Executive'), leadController.update)
  .delete(authorize('Admin', 'Sales Manager'), leadController.delete);

router.patch('/:id/assign', authorize('Admin', 'Sales Manager'), leadController.assign);
router.patch('/:id/convert', authorize('Admin', 'Sales Manager', 'Sales Executive'), leadController.convert);

module.exports = router;
