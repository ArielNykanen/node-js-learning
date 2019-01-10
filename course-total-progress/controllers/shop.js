const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: "All Products",
      path: '/products',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
      layout: false
      });
  })
}

exports.getIndexPage = (req, res, next) => {
  Product.fetchAll((products) => {
  res.render('shop/index', {
  prods: products, 
  pageTitle: 'Marker', 
  path: '/'
});
});
}