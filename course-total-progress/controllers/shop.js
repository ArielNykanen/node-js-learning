const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: "All Products",
      path: '/shop/products',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
      layout: false
      });
  })
}
