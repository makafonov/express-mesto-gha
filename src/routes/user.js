const express = require('express');
const userController = require('../controllers/user');

const userRoutes = express.Router();

userRoutes.get('/', userController.getUsers);
userRoutes.get('/:userId', userController.getUserById);
userRoutes.post('/', userController.createUser);

module.exports = { userRoutes };
