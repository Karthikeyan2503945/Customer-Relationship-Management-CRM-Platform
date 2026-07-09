const BaseRepository = require('./baseRepository');
const Customer = require('../models/Customer');

class CustomerRepository extends BaseRepository {
  constructor() {
    super(Customer);
  }
}

module.exports = new CustomerRepository();
