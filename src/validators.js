const { isURL } = require('validator');
const { Joi } = require('celebrate');

const validateUrl = (value) => {
  if (!isURL(value, { require_protocol: true })) {
    throw new Error('Неправильный формат ссылки');
  }
  return value;
};

const cardIdParam = {
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
};

module.exports = {
  validateUrl,
  cardIdParam,
};
