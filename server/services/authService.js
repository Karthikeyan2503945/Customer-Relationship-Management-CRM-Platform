const userRepository = require('../repositories/userRepository');
const AppError = require('../utils/AppError');
const jwt = require('jsonwebtoken');
const { clearUserCache } = require('../middleware/auth');

class AuthService {
  generateToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
      expiresIn: process.env.JWT_EXPIRE || '1d',
    });
  }

  generateRefreshToken(id) {
    return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET || 'refresh_secret', {
      expiresIn: process.env.JWT_REFRESH_EXPIRE || '7d',
    });
  }

  async registerUser(userData) {
    const existingUser = await userRepository.findOne({ email: userData.email });
    if (existingUser) {
      throw new AppError('Email already in use', 400);
    }
    const user = await userRepository.create(userData);
    user.password = undefined;
    return user;
  }

  async loginUser(email, password) {
    if (!email || !password) {
      throw new AppError('Please provide email and password', 400);
    }
    const user = await userRepository.findByEmailWithPassword(email);
    if (!user || !(await user.matchPassword(password))) {
      throw new AppError('Invalid credentials', 401);
    }
    
    if (!user.isActive) {
      throw new AppError('User account is inactive', 401);
    }

    await userRepository.update(user._id, { lastLogin: new Date() });

    const accessToken = this.generateToken(user._id);
    const refreshToken = this.generateRefreshToken(user._id);

    user.password = undefined;

    return { user, accessToken, refreshToken };
  }

  async refreshToken(token) {
    if (!token) throw new AppError('No refresh token provided', 400);
    try {
      const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET || 'refresh_secret');
      const user = await userRepository.findById(decoded.id);
      if (!user) throw new AppError('User not found', 401);
      
      const newAccessToken = this.generateToken(user._id);
      return { accessToken: newAccessToken };
    } catch (err) {
      throw new AppError('Invalid refresh token', 401);
    }
  }

  async getUserProfile(userId) {
    const user = await userRepository.findById(userId);
    if (!user) throw new AppError('User not found', 404);
    return user;
  }

  async updateProfile(userId, updateData) {
    if (updateData.password) {
      throw new AppError('This route is not for password updates.', 400);
    }
    const user = await userRepository.update(userId, updateData);
    clearUserCache(userId);
    return user;
  }

  async changePassword(userId, currentPassword, newPassword) {
    const user = await userRepository.model.findById(userId).select('+password');
    if (!(await user.matchPassword(currentPassword))) {
      throw new AppError('Current password is incorrect', 401);
    }
    user.password = newPassword;
    await user.save();
    clearUserCache(userId);
    const token = this.generateToken(user._id);
    return { token };
  }
}

module.exports = new AuthService();
