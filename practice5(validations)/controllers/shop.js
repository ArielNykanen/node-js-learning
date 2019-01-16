const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.find()
  .then((products) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: "All Products",
      path: '/products',
      hasProducts: products.length > 0,
      });
  }).catch(
    err => console.log(err)
    );
} 

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
    // findById is mongoose method =>
      // automatically converting string to ObjectId()
  Product.findById(prodId)
  .then(product => {
    console.log(product);
      res.render('shop/product-detail', {
      prod: product,
      pageTitle: product.title,
      path: "/products",
    });
  })
  .catch(err => {
    console.log(err);
  });
}

exports.getIndexPage = (req, res, next) => {
  
  Product.find()
  .then((products) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: "Shop",
      path: '/',
      hasProducts: products.length > 0,
      });
  }).catch(
    err => console.log(err) 
    );
}
