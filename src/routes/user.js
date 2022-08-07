const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const userController = require('../controllers/user');

router.get('/', userController.getUsers);
router.get('/me', userController.getCurrentUserInfo);
router.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().alphanum().length(24),
    }),
  }),
  userController.getUserById,
);
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  userController.updateUser,
);
router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().uri({
        scheme: ['http', 'https'],
      }),
    }),
  }),
  userController.updateAvatar,
);

module.exports = { router };
