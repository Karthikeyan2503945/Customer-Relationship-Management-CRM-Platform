const leadRepository = require('../repositories/leadRepository');
const customerRepository = require('../repositories/customerRepository');
const AppError = require('../utils/AppError');

class LeadService {
  async getAllLeads(query) {
    const page = parseInt(query.page, 10) || 1;
    const limit = parseInt(query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    let filter = {};
    if (query.search) {
      filter = {
        $or: [
          { leadName: { $regex: query.search, $options: 'i' } },
          { company: { $regex: query.search, $options: 'i' } },
          { email: { $regex: query.search, $options: 'i' } }
        ]
      };
    }
    
    if (query.status) filter.status = query.status;
    if (query.priority) filter.priority = query.priority;
    if (query.assignedExecutive) filter.assignedExecutive = query.assignedExecutive;

    const options = {
      skip: startIndex,
      limit: limit,
      sort: query.sort ? query.sort.split(',').join(' ') : '-createdAt',
      populate: [
        { path: 'assignedExecutive', select: 'name email' },
        { path: 'createdBy', select: 'name email' }
      ]
    };

    const leads = await leadRepository.find(filter, '', options);
    const total = await leadRepository.countDocuments(filter);

    return {
      leads,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    };
  }

  async getLeadById(id) {
    const lead = await leadRepository.findById(id, '', [
      { path: 'assignedExecutive', select: 'name email' },
      { path: 'createdBy', select: 'name email' }
    ]);
    if (!lead) throw new AppError('Lead not found', 404);
    return lead;
  }

  async createLead(leadData, userId) {
    leadData.createdBy = userId;
    return await leadRepository.create(leadData);
  }

  async updateLead(id, leadData) {
    const lead = await leadRepository.update(id, leadData);
    if (!lead) throw new AppError('Lead not found', 404);
    return lead;
  }

  async assignLead(id, assignedExecutive) {
    const lead = await leadRepository.update(id, { assignedExecutive });
    if (!lead) throw new AppError('Lead not found', 404);
    return lead;
  }

  async convertToCustomer(id, userId) {
    const lead = await leadRepository.findById(id);
    if (!lead) throw new AppError('Lead not found', 404);
    
    if (lead.status === 'Won') {
      throw new AppError('Lead is already converted', 400);
    }

    const customerData = {
      customerName: lead.leadName,
      company: lead.company,
      email: lead.email,
      phone: lead.phone,
      industry: 'Other',
      assignedExecutive: lead.assignedExecutive,
      createdBy: userId,
      status: 'Active'
    };

    const newCustomer = await customerRepository.create(customerData);

    await leadRepository.update(id, { status: 'Won' });

    return { customer: newCustomer, lead: await leadRepository.findById(id) };
  }

  async deleteLead(id) {
    const lead = await leadRepository.delete(id);
    if (!lead) throw new AppError('Lead not found', 404);
    return lead;
  }
}

module.exports = new LeadService();
