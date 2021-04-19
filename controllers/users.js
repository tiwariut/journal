const fs = require('fs');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const { details } = require('../transformers/users');
const {
  getFileExtension,
  getRandomString,
  uploadToS3
} = require('../utils/common');

// @desc      Create a user
// @route     POST /api/v1/users
// @access    Private/Admin
exports.createUser = asyncHandler(async (req, res, next) => {
  const msgs = res.__('users');

  const { email } = req.body;

  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorResponse(msgs.alreadyRegistered, 401));
  }

  user = new User(req.body);
  user.fullName = `${user.firstName} ${user.lastName}`;

  user = await user.save();

  res.status(200).send({
    success: true,
    message: msgs.created,
    data: details(user)
  });
});

// @desc      Get all users
// @route     GET /api/v1/users
// @access    Private
exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get single user
// @route     GET /api/v1/users/:id
// @access    Private
exports.getUser = asyncHandler(async (req, res, next) => {
  const msgs = res.__('users');

  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorResponse(`${msgs.notFound} ${req.params.id}.`, 404));
  }

  res.status(200).json({
    success: true,
    message: msgs.found,
    data: details(user)
  });
});

// @desc      Update a user
// @route     PUT /api/v1/users/:id
// @access    Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  const msgs = res.__('users');

  const {
    firstName,
    lastName,
    email,
    password,
    dob,
    aboutMe,
    profilePicture
  } = req.body;

  const { id } = req.params;

  let user = await User.findById(id).select('+password');

  if (!user) {
    return next(new ErrorResponse(`${msgs.notFound} ${req.params.id}.`, 404));
  }

  // Prevent email duplication
  if (email) {
    const foundUser = await User.findOne({
      _id: { $ne: id },
      email
    });

    if (foundUser) {
      return next(new ErrorResponse(msgs.alreadyRegistered, 400));
    }

    user.email = email;
  }

  user.firstName = firstName ? firstName : user.firstName;
  user.lastName = lastName ? lastName : user.lastName;
  user.fullName = `${user.firstName} ${user.lastName}`;
  user.password = password ? password : user.password;
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
    data: details(user)
  });
});

// @desc      Delete a user
// @route     DELETE /api/v1/users/:id
// @access    Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const msgs = res.__('users');

  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorResponse(`${msgs.notFound} ${req.params.id}.`, 404));
  }

  await user.remove();

  res.status(200).json({ success: true, message: msgs.deleted, data: {} });
});
