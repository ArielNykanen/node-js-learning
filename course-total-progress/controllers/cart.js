const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getCart = (req, res, next) => {
  req.user.getCart().then(
    cart => {
      return cart.getProducts(); 
    }).then(products => {
        res.render('shop/cart', {
        pageTitle: "In Cart", 
        path: '/cart',
        products: products
    });
    }).catch(err => console.log(err))
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user.getCart().then(cart => {
    fetchedCart = cart;
    return cart.getProducts({where: { id: prodId }});
  })
  .then(products => {
    let product;
    if (products.length > 0) {
      product = products[0];
    }
    if (product) {
      const oldQuantity = product.cartItem.quantity;
      newQuantity = oldQuantity + 1;
     return product;
    }
   return Product.findByPk(prodId);
  })
  .then(product => {
    return fetchedCart.addProduct(product, {
      through: { quantity: newQuantity }
    });
  })
  .then(() => {
    res.redirect('/cart');
  })
  .catch(err => console.log(err)
  );
}

exports.postCartDeleteItem = (req, res, next) => {
  const prodId = req.body.productId;
  req.user.getCart().then(cart => {
    return cart.getProducts({ where: { id: prodId} });
  })
  .then(products => {
    const product = products[0];
    product.cartItem.destroy();
  })
  .then(result => {
    res.redirect('/cart');
  })
  .catch(err => console.log(err)
  )
};


exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {pageTitle: "In Orders", path: '/orders'});
}


exports.getCheckOut = (req, res, next) => {
  res.render('shop/checkout', {pageTitle: "In Checkout", path: '/checkout'});
}