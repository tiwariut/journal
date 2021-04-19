const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });
const validator = require('express-joi-validator');

const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categories');

const {
  createCategorySchema,
  updateCategorySchema
} = require('../validations/categories');

const Category = require('../models/Category');
const { details } = require('../transformers/categories');

const router = express.Router();

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router
  .route('/')
  .get(advancedResults(Category, details), getCategories)
  .post(authorize('admin'), validator(createCategorySchema), createCategory);

router
  .route('/:id')
  .get(getCategory)
  .put(authorize('admin'), validator(updateCategorySchema), updateCategory)
  .delete(authorize('admin'), deleteCategory);

module.exports = router;
