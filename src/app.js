const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const { PORT = 3000 } = process.env;
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  await app.listen(PORT);
  console.log(`App listening on port ${PORT}`);
}

main();
