const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/authorize');
const upload = require('../middleware/upload');

router.use(protect);

router.post('/avatar', upload.single('avatar'), async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'Please upload a file' });
    const user = await require('../services/userService').updateUser(req.user.id, { avatar: `/uploads/${req.file.filename}` });
    res.status(200).json({ success: true, message: 'Avatar updated', data: { avatar: user.avatar } });
  } catch (err) {
    next(err);
  }
});

router.use(authorize('Admin'));

router.route('/')
  .get(userController.getAll)
  .post(userController.create);

router.route('/:id')
  .get(userController.getById)
  .put(userController.update)
  .delete(userController.delete);

module.exports = router;
