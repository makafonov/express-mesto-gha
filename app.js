const express = require('express');
const mongoose = require('mongoose');
const { errors, Joi, celebrate } = require('celebrate');

const { PORT, DATABASE_URL } = require('./src/config');
const userController = require('./src/controllers/user');
const auth = require('./src/middlewares/auth');
const { routes } = require('./src/routes');
const { handleError } = require('./src/utils');
const { validateUrl } = require('./src/validators');

const app = express();

app.use(express.json());

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  userController.login,
);
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().custom(validateUrl),
    }),
  }),
  userController.createUser,
);

app.use(auth);

app.use(routes);
app.use(errors());
app.use(handleError);

const main = () => {
  mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
  });

  app.listen(PORT);
};

main();
