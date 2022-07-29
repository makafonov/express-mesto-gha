const { CREATED } = require('../constants');
const User = require('../models/user');
const { handleError } = require('../utils');

exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => handleError(err, res));
};

exports.getUserById = (req, res) =>
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => handleError(err, res));

exports.createUser = (req, res) =>
  User.create(req.body)
    .then((user) => res.status(CREATED).send(user))
    .catch((err) => handleError(err, res));

exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    }
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => handleError(err, res));
};

exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => handleError(err, res));
};
