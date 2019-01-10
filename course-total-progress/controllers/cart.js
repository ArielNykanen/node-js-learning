const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {pageTitle: "In Cart", path: '/cart'});
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.getById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  })
  res.redirect('/cart');
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {pageTitle: "In Orders", path: '/orders'});
}

exports.getCheckOut = (req, res, next) => {
  res.render('shop/checkout', {pageTitle: "In Checkout", path: '/checkout'});
}