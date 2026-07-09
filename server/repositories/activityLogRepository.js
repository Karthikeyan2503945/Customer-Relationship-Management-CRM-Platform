const BaseRepository = require('./baseRepository');
const ActivityLog = require('../models/ActivityLog');

class ActivityLogRepository extends BaseRepository {
  constructor() {
    super(ActivityLog);
  }
}

module.exports = new ActivityLogRepository();
