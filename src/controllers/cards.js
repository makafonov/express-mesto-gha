const { CREATED } = require('../constants');
const Card = require('../models/card');
const { handleError } = require('../utils');

exports.getCards = (req, res) =>
  Card.find({})
    .populate('owner')
    .then((cards) => res.send(cards))
    .catch((err) => handleError(err, res));

exports.createCard = (req, res) =>
  Card.create({ ...req.body, owner: req.user._id })
    .then((card) => card.populate('owner'))
    .then((card) => res.status(CREATED).send(card))
    .catch((err) => handleError(err, res));

exports.deleteCard = (req, res) =>
  Card.findByIdAndRemove(req.params.cardId)
    .orFail()
    .populate('owner')
    .then((card) => res.send(card))
    .catch((err) => handleError(err, res));

exports.likeCard = (req, res) =>
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail()
    .populate('owner')
    .then((card) => res.send(card))
    .catch((err) => handleError(err, res));

exports.dislikeCard = (req, res) =>
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail()
    .populate('owner')
    .then((card) => res.send(card))
    .catch((err) => handleError(err, res));
