const express = require('express');
const mongoose = require('mongoose');
const { routes } = require('./routes');
require('dotenv').config();

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(routes);

const main = () => {
  mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
  });

  app.listen(PORT);
};

main();
