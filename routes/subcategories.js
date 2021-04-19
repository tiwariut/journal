const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });
const validator = require('express-joi-validator');

const {
  getSubcategories,
  getSubcategory,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory
} = require('../controllers/subcategories');

const {
  createSubcategorySchema,
  updateSubcategorySchema
} = require('../validations/subcategories');

const Subcategory = require('../models/Subcategory');
const { details } = require('../transformers/subcategories');

const router = express.Router();

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router
  .route('/')
  .get(advancedResults(Subcategory, details, 'category'), getSubcategories)
  .post(
    authorize('admin'),
    validator(createSubcategorySchema),
    createSubcategory
  );

router
  .route('/:id')
  .get(getSubcategory)
  .put(
    authorize('admin'),
    validator(updateSubcategorySchema),
    updateSubcategory
  )
  .delete(authorize('admin'), deleteSubcategory);

module.exports = router;
