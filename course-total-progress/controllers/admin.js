const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: "Add Products", 
    path: '/admin/add-product',
    formsCSS: true,
    activeAddPro: true,
    layout: false
  })
}

exports.postAddProduct =  (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl,description, price);
  product.save();
  res.redirect('/');
}



exports.getAdminProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: "Admin Products",
      path: '/admin/admin-products',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
      layout: false
      });
  })
}
