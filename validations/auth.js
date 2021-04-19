const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports.loginSchema = {
  body: {
    email: Joi.string().required(),
    password: Joi.string().required()
  }
};

module.exports.updateDetailsSchema = {
  body: {
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    dob: Joi.date().iso().allow(null).optional(),
    aboutMe: Joi.string().allow('').optional(),
    profilePicture: Joi.string().uri().allow('').optional()
  }
};

module.exports.updatePasswordSchema = {
  body: {
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().min(6).required()
  }
};
