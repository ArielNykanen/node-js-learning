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

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.getById(prodId, product => {
    res.render('shop/product-detail', {
      prod: product,
      pageTitle: product.title,
      path: "/products"
    })
  });
  
  
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