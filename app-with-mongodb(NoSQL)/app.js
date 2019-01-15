const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const errorCtrl = require('./controllers/errors')
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');


app.set('view engine', 'ejs')
app.set('views', 'views')
const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
User.findByPk(1)
.then(user => {
  req.user = user;
  next();
})
.catch(err => console.log(err));
});

app.use('/admin', adminRoute);
app.use(shopRoute);

app.use(errorCtrl.get404);

// relations
Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem});
Product.belongsToMany(Cart, { through: CartItem});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem })
// use it when you want to overite db
// sequelize.sync({force: true}).then(
sequelize.sync().then(
  (result) => {
    return User.findByPk(1);
    // console.log(result);
  }
)
.then((user) => {
  if (!user) {
    return User.create({name: 'user1', email: 'test@gmail.com'});
  }
  // return Promise.resolve(user);
    // no need to declare in here. it will be automaticly promise type
  return user;
})
.then(user => {
  // console.log(user);
  return user.createCart();
}).then(cart => {
  console.log("Cart was created" + cart);
  app.listen(3000);
})
.catch(err => console.log(err)); 