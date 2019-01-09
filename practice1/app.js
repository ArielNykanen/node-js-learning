const express = require('express');
const app = express();
app.use((req, res, next) => {
  console.log('in the middlewere');
  next();
})

app.use((req, res, next) => {
  console.log('in another midleware!');
  res.send('<h1>Hello to ariel the best!</h1>');
})

app.listen(3000);