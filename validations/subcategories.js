const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports.createSubcategorySchema = {
  body: {
    name: Joi.string().required(),
    description: Joi.string().optional(),
    image: Joi.string().uri().optional(),
    category: Joi.objectId().required()
  }
};

module.exports.updateSubcategorySchema = {
  body: {
    name: Joi.string().optional(),
    description: Joi.string().allow('').optional(),
    image: Joi.string().uri().allow('').optional(),
    category: Joi.objectId().optional()
  }
};
