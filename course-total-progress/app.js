const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const MONGODB_URI = 'mongodb+srv://ariel:12131415@cluster0-4a0ak.mongodb.net/test?retryWrites=true';

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

const errorCtrl = require('./controllers/errors')
const User = require('./models/user');

app.set('view engine', 'ejs')
app.set('views', 'views')
const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');
const authRoute = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(
  {
    secret: 'secret value',
    resave: false,
    saveUninitialized: false,
    store: store
  }));

// app.use((req, res, next) => {
//   User.findById('5c3d80aba19a09a4b557935e')
//     .then(user => {
//       req.session.user = user;
//       next();
//     })
//     .catch(err => console.log(err));
// });

app.use('/admin', adminRoute);
app.use(shopRoute);
app.use(authRoute);

app.use(errorCtrl.get404);

mongoose.connect(MONGODB_URI).then(result => {

  User.findOne().then(user => {
    if (!user) {
      const user = new User({
        name: 'test',
        email: 'test@test.com',
        cart: {
          items: []
        }
      });
      user.save();
    }
  })
  app.listen(3000);
}).catch(err => {
  console.log(err);
})