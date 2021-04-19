const ErrorResponse = require('../utils/errorResponse');
const { validationResult } = require('express-validator');

exports.validationErrorHandler = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const message = res.__('validations');

    const error = new ErrorResponse(
      message[errors.array()[0].msg] || 'Bad request',
      400
    );
    return res.status(error.statusCode).json({
      success: false,
      error: error.message
    });
  }

  next();
};
