const userRepository = require('../repositories/userRepository');
const AppError = require('../utils/AppError');
const { clearUserCache } = require('../middleware/auth');

class UserService {
  async getAllUsers(query) {
    return await userRepository.find(query);
  }

  async getUserById(id) {
    const user = await userRepository.findById(id);
    if (!user) throw new AppError('User not found', 404);
    return user;
  }

  async createUser(userData) {
    const existing = await userRepository.findOne({ email: userData.email });
    if (existing) throw new AppError('Email already in use', 400);
    return await userRepository.create(userData);
  }

  async updateUser(id, userData) {
    if (userData.password) {
      throw new AppError('Use auth routes for password changes', 400);
    }
    const user = await userRepository.update(id, userData);
    if (!user) throw new AppError('User not found', 404);
    clearUserCache(id);
    return user;
  }

  async deleteUser(id) {
    const user = await userRepository.delete(id);
    if (!user) throw new AppError('User not found', 404);
    clearUserCache(id);
    return user;
  }
}

module.exports = new UserService();
