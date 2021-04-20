const crypto = require('crypto');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    fullName: { type: String, default: '' },
    email: { type: String, required: true },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user'
    },
    password: { type: String, select: false, required: true },
    dob: { type: Date, default: null },
    aboutMe: { type: String, default: '' },
    profilePicture: { type: String, default: '' },
    resetPasswordToken: { type: String, default: '' },
    resetPasswordExpire: { type: Date, default: null },
    language: { type: String, enum: ['en'], default: 'en' },
    failedLoginAttempt: {
      date: { type: Date, default: null },
      count: { type: Number, default: 0 }
    },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }
  },
  { timestamps: true }
);

// Encrypt password using bcrypt
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, config.get('jwt.secret'), {
    expiresIn: config.get('jwt.expire')
  });
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash token
UserSchema.methods.getAndSetToken = function (type) {
  // Generate token
  const token = crypto.randomBytes(20).toString('hex');

  // Hash token
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  if (type === 'resetPassword') {
    this.resetPasswordToken = hashedToken;
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 mins
  } else if (type === 'emailVerify') {
    this.emailVerifyToken = hashedToken;
  }

  return token;
};

module.exports = mongoose.model('User', UserSchema);
