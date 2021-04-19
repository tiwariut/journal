const fs = require('fs');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const { sendTokenResponse } = require('../utils/auth');
const { details } = require('../transformers/users');

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
  const msgs = res.__('auth');

  let { email, password } = req.body;
  email = email.toLowerCase();

  // Check for user
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new ErrorResponse(msgs.invalidCredentials, 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse(msgs.invalidCredentials, 401));
  }

  await user.save();

  sendTokenResponse(user, 200, msgs.login, res);
});

// @desc      Log user out / clear cookie
// @route     GET /api/v1/auth/logout
// @access    Private
exports.logout = asyncHandler(async (req, res, next) => {
  const msgs = res.__('auth');

  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    message: msgs.logout,
    data: {}
  });
});

// @desc      Get current logged in user
// @route     POST /api/v1/auth/me
// @access    Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const msgs = res.__('auth');

  const user = await User.findOne({ _id: req.user.id });

  res.status(200).json({
    success: true,
    message: msgs.found,
    data: details(user)
  });
});

// @desc      Update user details
// @route     PUT /api/v1/auth/updatedetails
// @access    Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
  const msgs = res.__('auth');

  const { firstName, lastName, dob, aboutMe, profilePicture } = req.body;

  let user = await User.findOne({ _id: req.user.id });

  user.firstName = firstName ? firstName : user.firstName;
  user.lastName = lastName ? lastName : user.lastName;
  user.fullName = `${user.firstName} ${user.lastName}`;
  user.dob = dob || dob === null ? dob : user.dob;
  user.aboutMe = aboutMe || aboutMe === '' ? aboutMe : user.aboutMe;
  user.profilePicture =
    profilePicture || profilePicture === ''
      ? profilePicture
      : user.profilePicture;

  user = await user.save();

  res.status(200).json({
    success: true,
    message: msgs.updated,
    data: {}
  });
});

// @desc      Update password
// @route     PUT /api/v1/auth/updatepassword
// @access    Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const msgs = res.__('auth');

  const user = await User.findOne({ _id: req.user.id }).select('+password');

  // Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse(msgs.incorrectPassword, 401));
  }

  user.password = req.body.newPassword;
  await user.save();

  res.status(200).send({
    success: true,
    message: msgs.passwordUpdated,
    data: {}
  });
});
