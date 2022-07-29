const express = require('express');
const userController = require('../controllers/user');

const userRoutes = express.Router();

userRoutes.get('/', userController.getUsers);
userRoutes.get('/:userId', userController.getUserById);
userRoutes.post('/', userController.createUser);
userRoutes.patch('/me', userController.updateUser);
userRoutes.patch('/me/avatar', userController.updateAvatar);

module.exports = { userRoutes };
