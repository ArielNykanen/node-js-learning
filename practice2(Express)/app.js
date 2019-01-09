const express = require('express');


const app = express();

app.listen(3000);

// app.use((req, res, next) => {
// console.log('first middleware! using next method');
// next();
// });

// app.use((req, res, next) => {
// console.log('second middleware!');
// res.send('<h1 align=center>Practice Done!</h1>');
// });

 // order is important here root filtering needs to be last in this case
app.use('/users', (req, res, next) => {
  res.send('<h1>middleware that handles just /users </h1>');
})

// root middleware
app.use('/', (req, res, next) => {
  res.send('<h1>middleware that handles just / </h1>');
})