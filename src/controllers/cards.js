const { HTTP_CREATED } = require('../constants');
const ForbiddenError = require('../errors/forbidden-err');
const Card = require('../models/card');

exports.getCards = (req, res, next) =>
  Card.find({})
    .populate('owner')
    .then((cards) => res.send(cards))
    .catch(next);

exports.createCard = (req, res, next) =>
  Card.create({ ...req.body, owner: req.user._id })
    .then((card) => card.populate('owner'))
    .then((card) => res.status(HTTP_CREATED).send(card))
    .catch(next);

exports.deleteCard = (req, res, next) =>
  Card.findById(req.params.cardId)
    .orFail()
    .populate('owner')
    .then((card) => {
      if (card.owner._id.toString() === req.user._id) {
        return card
          .remove()
          .then((removedCard) => res.send(removedCard))
          .catch(next);
      }
      throw new ForbiddenError('Доступ запрещен');
    })
    .catch(next);

exports.likeCard = (req, res, next) =>
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail()
    .populate('owner')
    .then((card) => res.send(card))
    .catch(next);

exports.dislikeCard = (req, res, next) =>
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail()
    .populate('owner')
    .then((card) => res.send(card))
    .catch(next);
