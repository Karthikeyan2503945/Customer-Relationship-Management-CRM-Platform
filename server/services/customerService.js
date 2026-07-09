const customerRepository = require('../repositories/customerRepository');
const AppError = require('../utils/AppError');

class CustomerService {
  async getAllCustomers(query) {
    const page = parseInt(query.page, 10) || 1;
    const limit = parseInt(query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    let filter = {};
    if (query.search) {
      filter = {
        $or: [
          { customerName: { $regex: query.search, $options: 'i' } },
          { company: { $regex: query.search, $options: 'i' } },
          { email: { $regex: query.search, $options: 'i' } }
        ]
      };
    }
    
    if (query.status) {
      filter.status = query.status;
    }
    if (query.assignedExecutive) {
      filter.assignedExecutive = query.assignedExecutive;
    }

    const options = {
      skip: startIndex,
      limit: limit,
      sort: query.sort ? query.sort.split(',').join(' ') : '-createdAt',
      populate: [
        { path: 'assignedExecutive', select: 'name email' },
        { path: 'createdBy', select: 'name email' }
      ]
    };

    const customers = await customerRepository.find(filter, '', options);
    const total = await customerRepository.countDocuments(filter);

    return {
      customers,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    };
  }

  async getCustomerById(id) {
    const customer = await customerRepository.findById(id, '', [
      { path: 'assignedExecutive', select: 'name email' },
      { path: 'createdBy', select: 'name email' }
    ]);
    if (!customer) throw new AppError('Customer not found', 404);
    return customer;
  }

  async createCustomer(customerData, userId) {
    customerData.createdBy = userId;
    return await customerRepository.create(customerData);
  }

  async updateCustomer(id, customerData) {
    const customer = await customerRepository.update(id, customerData);
    if (!customer) throw new AppError('Customer not found', 404);
    return customer;
  }

  async deleteCustomer(id) {
    const customer = await customerRepository.delete(id);
    if (!customer) throw new AppError('Customer not found', 404);
    return customer;
  }
}

module.exports = new CustomerService();
