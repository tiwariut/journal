const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });
const validator = require('express-joi-validator');

const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
} = require('../controllers/users');

const { createUserSchema, updateUserSchema } = require('../validations/users');

const User = require('../models/User');
const { details } = require('../transformers/users');

const router = express.Router();

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router
  .route('/')
  .get(advancedResults(User, details), getUsers)
  .post(authorize('admin'), validator(createUserSchema), createUser);

router
  .route('/:id')
  .get(getUser)
  .put(authorize('admin'), validator(updateUserSchema), updateUser)
  .delete(authorize('admin'), deleteUser);

module.exports = router;
