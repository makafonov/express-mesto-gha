const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const cardController = require('../controllers/cards');

const cardIdParam = {
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
};

router.get('/', cardController.getCards);
router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string()
        .uri({
          scheme: ['http', 'https'],
        })
        .required(),
      createdAt: Joi.date(),
    }),
  }),
  cardController.createCard
);
router.delete('/:cardId', celebrate(cardIdParam), cardController.deleteCard);
router.put('/:cardId/likes', celebrate(cardIdParam), cardController.likeCard);
router.delete('/:cardId/likes', celebrate(cardIdParam), cardController.dislikeCard);

module.exports = { router };
