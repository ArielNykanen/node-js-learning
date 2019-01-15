const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.findAll()
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
  Product.findByPk(prodId)
  .then((product) => {
    res.render('shop/product-detail', {
      prod: product,
      pageTitle: product.title,
      path: "/products"
    });
  })
  .catch(err => console.log(err)
  );

  
}

exports.getIndexPage = (req, res, next) => {
  Product.findAll()
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
