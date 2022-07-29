const express = require('express');
const cardController = require('../controllers/cards');

const cardRoutes = express.Router();

cardRoutes.get('/', cardController.getCards);
cardRoutes.post('/', cardController.createCard);
cardRoutes.delete('/:cardId', cardController.deleteCard);
cardRoutes.put('/:cardId/likes', cardController.likeCard);
cardRoutes.delete('/:cardId/likes', cardController.dislikeCard);

module.exports = { cardRoutes };
