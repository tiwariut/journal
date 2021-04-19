const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });
const validator = require('express-joi-validator');

const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost
} = require('../controllers/posts');

const { createPostSchema, updatePostSchema } = require('../validations/posts');

const Post = require('../models/Post');
const { details } = require('../transformers/posts');

const router = express.Router();

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router
  .route('/')
  .get(advancedResults(Post, details, 'user category subcategory'), getPosts)
  .post(validator(createPostSchema), createPost);

router
  .route('/:id')
  .get(getPost)
  .put(validator(updatePostSchema), updatePost)
  .delete(deletePost);

module.exports = router;
