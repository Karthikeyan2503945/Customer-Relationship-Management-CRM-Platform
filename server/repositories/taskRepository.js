const BaseRepository = require('./baseRepository');
const Task = require('../models/Task');

class TaskRepository extends BaseRepository {
  constructor() {
    super(Task);
  }
}

module.exports = new TaskRepository();
