const fs = require('fs');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Subcategory = require('../models/Subcategory');
const { details } = require('../transformers/subcategories');
const {
  getFileExtension,
  getRandomString,
  uploadToS3
} = require('../utils/common');

// @desc      Create subcategory
// @route     POST /api/v1/subcategories
// @access    Private/Admin
exports.createSubcategory = asyncHandler(async (req, res, next) => {
  const msgs = res.__('subcategories');

  const { name, category } = req.body;

  // Check for duplicate name
  let subcategory = await Subcategory.findOne({ name, category });
  if (subcategory) {
    return next(new ErrorResponse(msgs.alreadyExists, 400));
  }

  subcategory = await Subcategory.create(req.body);

  res.status(201).json({
    success: true,
    msgs: msgs.created,
    data: details(subcategory)
  });
});

// @desc      Get all subcategories
// @route     GET /api/v1/subcategories
// @access    Private
exports.getSubcategories = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get single subcategory
// @route     GET /api/v1/subcategories/:id
// @access    Private
exports.getSubcategory = asyncHandler(async (req, res, next) => {
  const msgs = res.__('subcategories');

  const subcategory = await Subcategory.findById(req.params.id).populate(
    'category',
    'name image'
  );

  if (!subcategory) {
    return next(new ErrorResponse(`${msgs.notFound} ${req.params.id}.`, 404));
  }

  res.status(200).json({
    success: true,
    message: msgs.found,
    data: details(subcategory)
  });
});

// @desc      Update subcategory
// @route     PUT /api/v1/subcategories/:id
// @access    Private/Admin
exports.updateSubcategory = asyncHandler(async (req, res, next) => {
  const msgs = res.__('subcategories');

  const { name, description, image } = req.body;

  const { id } = req.params;

  let subcategory = await Subcategory.findById(id);

  if (!subcategory) {
    return next(new ErrorResponse(`${msgs.notFound} ${req.params.id}.`, 404));
  }

  // Prevent name duplication
  if (name) {
    const foundSubcategory = await Subcategory.findOne({
      _id: { $ne: id },
      name,
      category: subcategory.category
    });

    if (foundSubcategory) {
      return next(new ErrorResponse(msgs.alreadyExists, 400));
    }

    subcategory.name = name;
    user.image = image || image === '' ? image : user.image;
  }

  subcategory.description =
    description || description === '' ? description : subcategory.description;

  subcategory = await subcategory.save();

  res.status(200).json({
    success: true,
    message: msgs.updated,
    data: details(subcategory)
  });
});

// @desc      Delete subcategory
// @route     DELETE /api/v1/subcategories/:id
// @access    Private/Admin
exports.deleteSubcategory = asyncHandler(async (req, res, next) => {
  const msgs = res.__('subcategories');

  const subcategory = await Subcategory.findById(req.params.id);

  if (!subcategory) {
    return next(new ErrorResponse(`${msgs.notFound} ${req.params.id}.`, 404));
  }

  await subcategory.remove();

  res.status(200).json({ success: true, message: msgs.deleted, data: {} });
});
