const express = require('express');
const { router: userRoutes } = require('./user');
const { router: cardRoutes } = require('./card');

const routes = express.Router();
routes.use('/users', userRoutes);
routes.use('/cards', cardRoutes);

module.exports = { routes };
