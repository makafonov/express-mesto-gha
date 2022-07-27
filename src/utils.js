const { ERROR_CODE, NOT_FOUND, SERVER_ERROR } = require('./constants');

const handleError = (err, res) => {
  switch (err.name) {
    case 'CastError':
      res.status(ERROR_CODE).send({
        message: 'Переданы некорректные данные',
      });
      break;
    case 'ValidationError':
      res.status(ERROR_CODE).send({
        message: err.message,
      });
      break;
    case 'DocumentNotFoundError':
      res.status(NOT_FOUND).send({
        message: 'Объект не найден',
      });
      break;
    default:
      res.status(SERVER_ERROR).send({
        message: 'На сервере произошла ошибка',
      });
  }
};

module.exports = { handleError };
