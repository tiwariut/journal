const fs = require('fs');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Post = require('../models/Post');
const { details } = require('../transformers/posts');
const {
  getFileExtension,
  getRandomString,
  uploadToS3
} = require('../utils/common');

// @desc      Create post
// @route     POST /api/v1/posts
// @access    Private
exports.createPost = asyncHandler(async (req, res, next) => {
  const msgs = res.__('posts');

  req.body.user = req.user.id;

  let post = await Post.create(req.body);

  res.status(201).json({
    success: true,
    msgs: msgs.created,
    data: details(post)
  });
});

// @desc      Get all posts
// @route     GET /api/v1/posts
// @access    Private
exports.getPosts = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get single post
// @route     GET /api/v1/posts/:id
// @access    Private
exports.getPost = asyncHandler(async (req, res, next) => {
  const msgs = res.__('posts');

  const post = await Post.findById(req.params.id)
    .populate('user', 'fullName email profilePicture')
    .populate('category', 'name image')
    .populate('subcategory', 'name image');

  if (!post) {
    return next(new ErrorResponse(`${msgs.notFound} ${req.params.id}.`, 404));
  }

  res.status(200).json({
    success: true,
    message: msgs.found,
    data: details(post)
  });
});

// @desc      Update post
// @route     PUT /api/v1/posts/:id
// @access    Private
exports.updatePost = asyncHandler(async (req, res, next) => {
  const msgs = res.__('posts');

  const {
    title,
    summary,
    content,
    image,
    type,
    category,
    subcategory
  } = req.body;

  let post = await Post.findById(req.params.id);

  if (!post) {
    return next(new ErrorResponse(`${msgs.notFound} ${req.params.id}.`, 404));
  }

  // Make sure user is post owner
  if (post.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(msgs.updateNotAllowed, 401));
  }

  post.title = title ? title : post.title;
  post.summary = summary || summary === '' ? summary : post.summary;
  post.content = content ? content : post.content;
  user.image = image || image === '' ? image : user.image;
  post.type = type ? type : post.type;
  post.category = category ? category : post.category;
  post.subcategory = subcategory ? subcategory : post.subcategory;

  post = await post.save();

  res.status(200).json({
    success: true,
    message: msgs.updated,
    data: details(post)
  });
});

// @desc      Delete post
// @route     DELETE /api/v1/posts/:id
// @access    Private
exports.deletePost = asyncHandler(async (req, res, next) => {
  const msgs = res.__('posts');

  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new ErrorResponse(`${msgs.notFound} ${req.params.id}.`, 404));
  }

  // Make sure user is post owner
  if (post.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(msgs.deleteNotAllowed, 401));
  }

  await post.remove();

  res.status(200).json({ success: true, message: msgs.deleted, data: {} });
});
