const express = require('express');
require('dotenv').config();

const { PORT = 3000 } = process.env;
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
