const BaseRepository = require('./baseRepository');
const Lead = require('../models/Lead');

class LeadRepository extends BaseRepository {
  constructor() {
    super(Lead);
  }
}

module.exports = new LeadRepository();
