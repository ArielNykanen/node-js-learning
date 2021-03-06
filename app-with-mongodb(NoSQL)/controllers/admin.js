const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: "Add Products", 
    path: '/admin/add-product',
    editing: false
  })
}

exports.postAddProduct =  (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user.createProduct({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description,
  })
  .then(result => {
    console.log('Product Was Created!');
    res.redirect('/admin/products');
  })
  .catch(err => console.log(err));

}

exports.postDeleteProduct = (req, res, next) => {
  const deletedProductId = req.body.productId;
  Product.findByPk(deletedProductId).then((product) => {
    return product.destroy();
  })
  .then((results) => {
    console.log("product was deleted successfuly!");
    res.redirect('/admin/products');
  })
  .catch(err => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode){
    res.redirect('/');
  }
  const prodId = req.params.productId;
  req.user
  .getProducts({ where: {id: prodId}})
  // Product.findByPk(prodId)
  .then(products => {
    const product = products[0];
    res.render('admin/edit-product', {
      pageTitle: "Editing Product", 
      path: '/admin/edit-product',
      prod: product,
      editing: editMode   
    });
  })
  .catch(err => console.log(err));
}

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  console.log("the id is!!!" + prodId);
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;
  Product.findByPk(prodId).then((product) => {
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.imageUrl = updatedImageUrl;
    product.description = updatedDescription;
    return product.save();
  })
  .then((result) => {
    res.redirect('/admin/products');
    console.log('Product was updated!');
  })
  .catch(err => console.log(err));
}



exports.getAdminProducts = (req, res, next) => {
  req.user.getProducts()
  .then((products) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: "Admin Products",
      path: '/admin/products',
      hasProducts: products.length > 0,
      });
  }).catch(
    err => console.log(err)
    );
 
}
