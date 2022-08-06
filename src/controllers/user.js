const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { JWT_EXPIRES_IN, SALT_LENGTH, SECRET_KEY } = require('../config');
const { HTTP_CREATED, HTTP_OK } = require('../constants');
const User = require('../models/user');

exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

exports.getUserById = (req, res, next) =>
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send(user))
    .catch(next);

exports.createUser = (req, res, next) =>
  bcrypt
    .hash(String(req.body.password), SALT_LENGTH)
    .then((hash) => User.create({ ...req.body, password: hash }))
    // eslint-disable-next-line no-underscore-dangle
    .then((user) => res.status(HTTP_CREATED).send({ ...user._doc, password: undefined }))
    .catch(next);

exports.updateUser = (req, res, next) => {
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
    .catch(next);
};

exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send(user))
    .catch(next);
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: JWT_EXPIRES_IN }),
      });
    })
    .catch(next);
};

exports.getCurrentUserInfo = (req, res, next) =>
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.status(HTTP_OK).send(user))
    .catch(next);
