const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const User = require('../models/User');

// In-memory cache for user verification (5 minutes TTL) to eliminate N+1 DB queries on every request
const userCache = new Map();
const USER_CACHE_TTL = 5 * 60 * 1000;

exports.clearUserCache = (userId) => {
  if (userId) {
    userCache.delete(userId.toString());
  } else {
    userCache.clear();
  }
};

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new AppError('You are not logged in! Please log in to get access.', 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    const userId = decoded.id;

    // Check in-memory cache first
    const cached = userCache.get(userId);
    if (cached && Date.now() - cached.timestamp < USER_CACHE_TTL) {
      req.user = cached.user;
      return next();
    }

    // Query database if cache miss or expired
    const currentUser = await User.findById(userId);
    if (!currentUser) {
      userCache.delete(userId);
      return next(new AppError('The user belonging to this token does no longer exist.', 401));
    }

    if (!currentUser.isActive) {
      userCache.delete(userId);
      return next(new AppError('This user account is inactive. Please contact support.', 401));
    }

    // Populate cache
    userCache.set(userId, { user: currentUser, timestamp: Date.now() });

    req.user = currentUser;
    next();
  } catch (err) {
    next(err);
  }
};
