const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const errorCtrl = require('./controllers/errors')
const User = require('./models/user'); 

app.set('view engine', 'ejs')
app.set('views', 'views')
const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
 
app.use((req, res, next) => {
User.getById('5c3c6bae3dd8fd06f9d6ea3a')
.then(user => {
  req.user = new User(user.name, user.email, user.cart, user._id);
  next();
})
.catch(err => console.log(err));
});

app.use('/admin', adminRoute);
app.use(shopRoute);

app.use(errorCtrl.get404);

mongoose.connect('mongodb+srv://ariel:12131415@cluster0-4a0ak.mongodb.net/test?retryWrites=true').then(result => {
  app.listen(3000);
}).catch(err => {
  console.log(err);
})