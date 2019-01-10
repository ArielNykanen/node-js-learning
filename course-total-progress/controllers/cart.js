exports.getCart = (req, res, next) => {
  res.render('shop/cart', {pageTitle: "In Cart", path: '/cart'});
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {pageTitle: "In Orders", path: '/orders'});
}

exports.getCheckOut = (req, res, next) => {
  res.render('shop/checkout', {pageTitle: "In Checkout", path: '/checkout'});
}