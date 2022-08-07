const express = require('express');
const mongoose = require('mongoose');
const { errors, Joi, celebrate } = require('celebrate');

const { PORT, DATABASE_URL } = require('./src/config');
const { HTTP_NOT_FOUND } = require('./src/constants');
const userController = require('./src/controllers/user');
const auth = require('./src/middlewares/auth');
const { routes } = require('./src/routes');
const { handleError } = require('./src/utils');

const app = express();

app.use(express.json());

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(8),
    }),
  }),
  userController.login,
);
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(8),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().uri({
        scheme: ['http', 'https'],
      }),
    }),
  }),
  userController.createUser,
);

app.use(auth);

app.use(routes);
app.use(errors());
app.use(handleError);
app.use((req, res) => {
  res.status(HTTP_NOT_FOUND).send({ message: 'Страница не найдена' });
});

const main = () => {
  mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
  });

  app.listen(PORT);
};

main();
