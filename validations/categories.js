const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports.createCategorySchema = {
  body: {
    name: Joi.string().required(),
    description: Joi.string().optional(),
    image: Joi.string().uri().optional()
  }
};

module.exports.updateCategorySchema = {
  body: {
    name: Joi.string().optional(),
    description: Joi.string().allow('').optional(),
    image: Joi.string().uri().allow('').optional()
  }
};
