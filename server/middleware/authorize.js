const AppError = require('../utils/AppError');

const roleMap = {
  'admin': 'admin',
  'sales_manager': 'sales_manager',
  'sales_executive': 'sales_executive',
  'sales manager': 'sales_manager',
  'sales executive': 'sales_executive'
};

const normalizeRole = (role) => {
  if (!role) return '';
  const clean = role.toString().trim().toLowerCase();
  return roleMap[clean] || clean;
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }
    const userRoleNormalized = normalizeRole(req.user.role);
    const allowedNormalized = roles.map(normalizeRole);
    if (!allowedNormalized.includes(userRoleNormalized)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }
    next();
  };
};
