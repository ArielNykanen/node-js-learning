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
  const product = new Product({
    title: title, 
    price: price, 
    description: description, 
    imageUrl: imageUrl
  });
    // save method comming from mongoose built in method
  product.save()
  .then(result => {
    console.log('Product Was Created!');
    res.redirect('/admin/products');
  })
  .catch(err => console.log(err));

}

exports.postDeleteProduct = (req, res, next) => {
  const deletedProductId = req.body.productId;
   // findByIdAndDelete is mongoose method =>
      // automatically converting string to ObjectId()
  Product.findByIdAndRemove(deletedProductId)
  .then(result => {
    console.log('Redirecting to admin/products...');
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
   // findById is mongoose method =>
      // automatically converting string to ObjectId()
  Product.findById(prodId)
  .then(product => {
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
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;
   // findById is mongoose method =>
      // automatically converting string to ObjectId()
  Product.findById(prodId).then(product => {
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.description = updatedDescription;
    product.imageUrl = updatedImageUrl;
      // when using save on existing item it will automatically update the item
    product.save();
  })
  .then(result => {
    res.redirect('/admin/products');
    console.log(result);
  })
  .catch(err => console.log(err));
}



exports.getAdminProducts = (req, res, next) => {
  Product.find()
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
