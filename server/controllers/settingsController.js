const settingsController = {
  getAll: async (req, res, next) => {
    try {
      res.json({ message: 'GET all from settings' });
    } catch (err) {
      next(err);
    }
  },
  create: async (req, res, next) => {
    try {
      res.json({ message: 'POST to settings' });
    } catch (err) {
      next(err);
    }
  }
};

module.exports = settingsController;
