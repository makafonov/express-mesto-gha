const express = require('express');
const mongoose = require('mongoose');
const { NOT_FOUND } = require('./src/constants');
const { routes } = require('./src/routes');
const userController = require('./src/controllers/user');
require('dotenv').config();

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
// временное решение авторизации
app.use((req, res, next) => {
  req.user = {
    _id: '62e2b7a36cf3e8823ffeb057',
  };

  next();
});

app.post('/signin', userController.login);
app.post('/signup', userController.createUser);

app.use(routes);
app.use((req, res) => {
  res.status(NOT_FOUND).send({ message: 'Страница не найдена' });
});

const main = () => {
  mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
  });

  app.listen(PORT);
};

main();
