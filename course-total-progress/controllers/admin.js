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
  Product.create({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description,
  })
  .then((result) => {
    console.log('Product Was Created!');
  })
  .catch(err => console.log(err)
  );
}

exports.postDeleteProduct = (req, res, next) => {
  const deletedProductId = req.body.productId;
  Product.deleteById(deletedProductId);
  res.redirect('/admin/products');
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode){
    res.redirect('/');
  }
  const prodId = req.params.productId;

  Product.getById(prodId, product => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: "Editing Product", 
      path: '/admin/edit-product',
      prod: product,
      editing: editMode   
    });
  });
}

exports.postEditProduct = (req, res, next) => {
  
  const prodId = req.body.productId;
  console.log("the id is!!!" + prodId);
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;
  const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedDescription, updatedPrice);
  updatedProduct.save();
  res.redirect('/admin/products');
}



exports.getAdminProducts = (req, res, next) => {
  Product.fetchAll()
  .then(([rows, fieldData]) => {
    res.render('admin/products', {
      prods: rows,
      pageTitle: "Admin Products",
      path: '/admin/products',
      hasProducts: rows.length > 0,
      });
  })
.catch((err) => {
  console.log(err);
});
}
