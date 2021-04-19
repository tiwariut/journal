const express = require('express');
const validator = require('express-joi-validator');
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });

const {
  login,
  logout,
  getMe,
  updateDetails,
  updatePassword
} = require('../controllers/auth');

const {
  loginSchema,
  updateDetailsSchema,
  updatePasswordSchema
} = require('../validations/auth');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.post('/login', validator(loginSchema), login);

router.put('/logout', protect, logout);

router.get('/me', protect, getMe);

router.put(
  '/updatedetails',
  protect,
  validator(updateDetailsSchema),
  updateDetails
);

router.put(
  '/updatepassword',
  protect,
  validator(updatePasswordSchema),
  updatePassword
);

module.exports = router;
