const {
  HTTP_ERROR,
  HTTP_NOT_FOUND,
  HTTP_SERVER_ERROR,
  HTTP_CONFLICT,
} = require('./constants');

// eslint-disable-next-line no-unused-vars
const handleError = (err, req, res, next) => {
  const { statusCode, message } = err;

  switch (err.name) {
    case 'MongoServerError':
      if (err.code === 11000) {
        res.status(HTTP_CONFLICT).send({
          message: 'Пользователь с указанным email уже существует',
        });
      } else {
        res.status(HTTP_SERVER_ERROR).send({
          message: err.message,
        });
      }
      break;
    case 'CastError':
      res.status(HTTP_ERROR).send({
        message: 'Переданы некорректные данные',
      });
      break;
    case 'ValidationError':
      res.status(HTTP_ERROR).send({
        message: err.message,
      });
      break;
    case 'DocumentNotFoundError':
      res.status(HTTP_NOT_FOUND).send({
        message: 'Объект не найден',
      });
      break;
    case 'Error':
      res.status(statusCode).send({ message });
      break;
    default:
      res.status(HTTP_SERVER_ERROR).send({
        message: 'На сервере произошла ошибка',
      });
  }
};

module.exports = { handleError };
