const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for(product of products) {
        const cartProductData = cart.products.find(prod => prod.id === product.id);
        if (cartProductData) {
          cartProducts.push({productData: product, qty: cartProductData.qty});
        }
      }
      res.render('shop/cart', {
        pageTitle: "In Cart", 
        path: '/cart',
        products: cartProducts
      });
    })
  });
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.getById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  })
  res.redirect('/cart');
}

exports.postCartDeleteItem = (req, res, next) => {
  const prodId = req.body.productId;
  Product.getById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  })
  
};


exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {pageTitle: "In Orders", path: '/orders'});
}


exports.getCheckOut = (req, res, next) => {
  res.render('shop/checkout', {pageTitle: "In Checkout", path: '/checkout'});
}