'use strict';

const Joi = require('@hapi/joi');
const { registration } = require('../../model/commenter/registration');

exports.registration = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .trim()
      .pattern(/^[a-zA-Z\s]+$/)
      .required()
      .label('Name'),
    email: Joi.string().trim().lowercase().email().required().label('Email address'),
    password: Joi.string().trim().min(5).max(50).label('Password'),
    confirm_password: Joi.ref('password'),
  });

  const validateResult = schema.validate({
    name: req.body.name,
    mobile_number: req.body.mobile_number,
    email: req.body.email,
    password: req.body.password,
    confirm_password: req.body.confirm_password,
  });

  if (validateResult.error) {
    return res.json({
      success: false,
      message: fromErrorMessage(validateResult.error.details[0]),
    });
  }

  registration(validateResult.value)
    .then(({ success, info }) => {
      if (success) {
        return res.json({
          success: true,
          message: 'Successfully Register',
        });
      } else {
        return res.json({
          success: false,
          message: info,
        });
      }
    })
    .catch((err) => next(err));
};
