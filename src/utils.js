const { ERROR_CODE, NOT_FOUND, SERVER_ERROR, CONFLICT } = require('./constants');

const handleError = (err, res) => {
  switch (err.name) {
    case 'MongoServerError':
      if (err.code === 11000) {
        res.status(CONFLICT).send({
          message: 'Пользователь с указанным email уже существует',
        });
      } else {
        res.status(SERVER_ERROR).send({
          message: err.message,
        });
      }
      break;
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
