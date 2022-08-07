const express = require('express');

const { router: userRoutes } = require('./user');
const { router: cardRoutes } = require('./card');
const NotFoundError = require('../errors/not-found-err');

const routes = express.Router();
routes.use('/users', userRoutes);
routes.use('/cards', cardRoutes);

routes.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = { routes };
