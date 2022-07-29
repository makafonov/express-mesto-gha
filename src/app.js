const express = require('express');
const mongoose = require('mongoose');
const { routes } = require('./routes');
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
app.use(routes);

const main = () => {
  mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
  });

  app.listen(PORT);
};

main();
