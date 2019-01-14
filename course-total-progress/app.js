const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const errorCtrl = require('./controllers/errors')
const mongoConnect = require('./util/database').mongoConnect;

app.set('view engine', 'ejs')
app.set('views', 'views')
const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
// User.findByPk(1)
// .then(user => {
//   req.user = user;
//   next();
// })
// .catch(err => console.log(err));
next();
});

app.use('/admin', adminRoute);
app.use(shopRoute);

app.use(errorCtrl.get404);

mongoConnect(() => {
  app.listen(3000);
})
 