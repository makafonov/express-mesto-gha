const { ERROR_CODE } = require('../constants');
const User = require('../models/user');
const { handleError } = require('../utils');

exports.getUsers = (req, res) => {
  User.find({}).then((users) => res.send(users));
};

exports.getUserById = (req, res) =>
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => handleError(err, res));

exports.createUser = (req, res) =>
  User.create(req.body)
    .then((user) => res.send(user))
    .catch((err) => handleError(err, res));

exports.updateUser = (req, res) => {
  const { avatar, ...userInfo } = req.body;
  User.findByIdAndUpdate(req.user._id, userInfo)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => handleError(err, res));
};

exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  if (!avatar) {
    res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные' });
    return;
  }

  User.findByIdAndUpdate(req.user._id, { avatar })
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => handleError(err, res));
};
