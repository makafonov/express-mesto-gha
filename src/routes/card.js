const express = require('express');
const cardController = require('../controllers/cards');

const cardRoutes = express.Router();

cardRoutes.get('/', cardController.getCards);
cardRoutes.post('/', cardController.createCard);
cardRoutes.delete('/:cardId', cardController.deleteCard);

module.exports = { cardRoutes };
