const User = require('../models/user');
const { handleError } = require('../utils');
const { NOT_FOUND } = require('../constants');

exports.getUsers = (req, res) => {
  User.find({}).then((users) => res.send(users));
};

exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND).send({ message: 'Объект не найден' });
      } else {
        res.send(user);
      }
    })
    .catch((err) => handleError(err, res));
};

exports.createUser = async (req, res) => {
  User.create(req.body)
    .then((user) => res.send(user))
    .catch((err) => handleError(err, res));
};
