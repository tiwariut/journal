const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports.createUserSchema = {
  body: {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required()
  }
};

module.exports.updateUserSchema = {
  body: {
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    email: Joi.string().optional(),
    password: Joi.string().min(6).optional(),
    dob: Joi.date().iso().allow(null).optional(),
    aboutMe: Joi.string().allow('').optional(),
    profilePicture: Joi.string().uri().allow('').optional()
  }
};
