const HttpError = require('../utils/httpError');

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || ''));

const validate = (schema) => (req, res, next) => {
  const errors = [];
  Object.entries(schema).forEach(([field, rules]) => {
    const value = req.body[field];
    if (rules.required && (value === undefined || value === null || value === '')) {
      errors.push(`${field} is required`);
      return;
    }
    if (value === undefined || value === null || value === '') return;
    if (rules.type && typeof value !== rules.type) errors.push(`${field} must be ${rules.type}`);
    if (rules.email && !isEmail(value)) errors.push(`${field} must be a valid email`);
    if (rules.min && String(value).length < rules.min) errors.push(`${field} must be at least ${rules.min} characters`);
  });

  if (errors.length) return next(new HttpError(422, 'Validation failed', errors));
  next();
};

module.exports = validate;
