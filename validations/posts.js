const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports.createPostSchema = {
  body: {
    title: Joi.string().required(),
    summary: Joi.string().optional(),
    content: Joi.string().required(),
    image: Joi.string().uri().optional(),
    type: Joi.string().valid('public', 'private').optional(),
    category: Joi.objectId().required(),
    subcategory: Joi.objectId().required()
  }
};

module.exports.updatePostSchema = {
  body: {
    title: Joi.string().optional(),
    summary: Joi.string().allow('').optional(),
    content: Joi.string().optional(),
    image: Joi.string().uri().allow('').optional(),
    type: Joi.string().valid('public', 'private').optional(),
    category: Joi.objectId().optional(),
    subcategory: Joi.objectId().optional()
  }
};
