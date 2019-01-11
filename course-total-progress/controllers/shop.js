const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(([rows, fieldData]) => {
    res.render('shop/product-list', {
      prods: rows,
      pageTitle: "All Products",
      path: '/products',
      hasProducts: rows.length > 0,
      });
  })
  .catch((err) => {
    console.log(err);
  });
} 

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.getById(prodId)
  .then(([product]) => {
    res.render('shop/product-detail', {
      prod: product[0],
      pageTitle: product.title,
      path: "/products"
    });
  })
  .catch(err => console.log(err)
  );

  
}

exports.getIndexPage = (req, res, next) => {
  Product.fetchAll()
  .then(([rows, fieldData]) => {
    res.render('shop/index', {
      prods: rows,
      pageTitle: "Shop",
      path: '/',
      hasProducts: rows.length > 0,
      });
  })
  .catch((err) => {
    console.log(err);
  });
}