const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const config = require('config');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
    // Set token from cookie
  }
  // else if (req.cookies.token) {
  //   token = req.cookies.token;
  // }

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route.', 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, config.get('jwt.secret'));

    const user = await User.findById(decoded.id);
    if (!user) {
      return next(
        new ErrorResponse('Not authorized to access this route.', 401)
      );
    }

    req.user = user;

    // Update user language with every request
    // const language = req.language;
    // user.language =
    //   language === 'en' || language === 'it' ? language : user.language;
    // await user.save();

    next();
  } catch (err) {
    return next(new ErrorResponse('Not authorized to access this route.', 401));
  }
});

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route.`,
          403
        )
      );
    }
    next();
  };
};
