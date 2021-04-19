const fs = require('fs');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Category = require('../models/Category');
const { details } = require('../transformers/categories');
const {
  getFileExtension,
  getRandomString,
  uploadToS3
} = require('../utils/common');

// @desc      Create category
// @route     POST /api/v1/categories
// @access    Private/Admin
exports.createCategory = asyncHandler(async (req, res, next) => {
  const msgs = res.__('categories');

  const { name } = req.body;

  // Check for duplicate name
  let category = await Category.findOne({ name });
  if (category) {
    return next(new ErrorResponse(msgs.alreadyExists, 400));
  }

  category = await Category.create(req.body);

  res.status(201).json({
    success: true,
    msgs: msgs.created,
    data: details(category)
  });
});

// @desc      Get all categories
// @route     GET /api/v1/categories
// @access    Private
exports.getCategories = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get single category
// @route     GET /api/v1/categories/:id
// @access    Private
exports.getCategory = asyncHandler(async (req, res, next) => {
  const msgs = res.__('categories');

  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorResponse(`${msgs.notFound} ${req.params.id}.`, 404));
  }

  res.status(200).json({
    success: true,
    message: msgs.found,
    data: details(category)
  });
});

// @desc      Update category
// @route     PUT /api/v1/categories/:id
// @access    Private/Admin
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const msgs = res.__('categories');

  const { name, description, image } = req.body;

  const { id } = req.params;

  let category = await Category.findById(id);

  if (!category) {
    return next(new ErrorResponse(`${msgs.notFound} ${req.params.id}.`, 404));
  }

  // Prevent name duplication
  if (name) {
    const foundCategory = await Category.findOne({
      _id: { $ne: id },
      name
    });

    if (foundCategory) {
      return next(new ErrorResponse(msgs.alreadyExists, 400));
    }

    category.name = name;
  }

  category.description =
    description || description === '' ? description : category.description;
  user.image = image || image === '' ? image : user.image;

  category = await category.save();

  res.status(200).json({
    success: true,
    message: msgs.updated,
    data: details(category)
  });
});

// @desc      Delete category
// @route     DELETE /api/v1/categories/:id
// @access    Private/Admin
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const msgs = res.__('categories');

  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorResponse(`${msgs.notFound} ${req.params.id}.`, 404));
  }

  await category.remove();

  res.status(200).json({ success: true, message: msgs.deleted, data: {} });
});
