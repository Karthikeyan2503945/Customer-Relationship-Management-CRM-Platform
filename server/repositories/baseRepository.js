class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async find(query = {}, select = '', options = {}) {
    let mongooseQuery = this.model.find(query);
    if (select) {
      mongooseQuery = mongooseQuery.select(select);
    }
    if (options.sort) {
      mongooseQuery = mongooseQuery.sort(options.sort);
    }
    if (options.populate) {
      mongooseQuery = mongooseQuery.populate(options.populate);
    }
    if (options.limit) {
      mongooseQuery = mongooseQuery.limit(options.limit);
    }
    if (options.skip) {
      mongooseQuery = mongooseQuery.skip(options.skip);
    }
    return await mongooseQuery;
  }

  async findOne(query = {}, select = '', populate = '') {
    let mongooseQuery = this.model.findOne(query);
    if (select) mongooseQuery = mongooseQuery.select(select);
    if (populate) mongooseQuery = mongooseQuery.populate(populate);
    return await mongooseQuery;
  }

  async findById(id, select = '', populate = '') {
    let mongooseQuery = this.model.findById(id);
    if (select) mongooseQuery = mongooseQuery.select(select);
    if (populate) mongooseQuery = mongooseQuery.populate(populate);
    return await mongooseQuery;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async update(id, data) {
    return await this.model.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id) {
    return await this.model.findByIdAndDelete(id);
  }

  async countDocuments(query = {}) {
    return await this.model.countDocuments(query);
  }

  async aggregate(pipeline) {
    return await this.model.aggregate(pipeline);
  }
}

module.exports = BaseRepository;
