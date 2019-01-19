const Product = require('../models/product');
const { validationResult } = require('express-validator/check')
const fileHelper = require('../util/file');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: "Add Products",
    path: '/admin/add-product',
    editing: false,
    oldInput: {
      title: '',
      imageUrl: '',
      price: '',
      description: '',
    },
    errorMessage: null,
    validationErrors: [],
  })
}

exports.postAddProduct = (req, res, next) => {
  const errors = validationResult(req);
  const title = req.body.title;
  const image = req.file;
  const price = req.body.price;
  const description = req.body.description;
  if (!image) {
    return res.status(422).render('admin/edit-product', {
      pageTitle: "Add Products",
      path: '/admin/add-product',
      editing: false,
      oldInput: {
        title: title,
        price: price,
        description: description,
      },
      errorMessage:'Attached file is not image!',
      validationErrors: [],
    });
  }
  if (!errors.isEmpty()) {
    return res.status(422).render('admin/edit-product', {
      pageTitle: "Add Products",
      path: '/admin/add-product',
      editing: false,
      errorMessage: errors.array()[0].msg,
      oldInput: {
        title: title,
        imageUrl: imageUrl,
        price: price,
        description: description,
      },
      validationErrors: errors.array(),
    });
  }
  const imageUrl = image.path;
  const product = new Product({
    title: title, 
    price: price,
    description: description,
    imageUrl: imageUrl,
    // userId: req.user._id
    // you can save the intire objec (mongoose automatically will pick the id from it)
    userId: req.user
  });
  // save method comming from mongoose built in method
  product.save()
    .then(result => {
      console.log('Product Was Created!');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log('\x1b[31m%s\x1b[23m', 'Error!!!! from add-product, reason: ' + err + ' ');
      const error = new Error();
      error.httpStatusCode = 500;
      return next(error);
    });

}

exports.postDeleteProduct = (req, res, next) => {
  const deletedProductId = req.body.productId;
  Product.findById(deletedProductId)
  .then(product => {
    if (!product) {
      return next(new Error('Product not found!'));
    }
    fileHelper.deleteFile(product.imageUrl);
    return  Product.deleteOne({ _id: deletedProductId, userId: req.user._id });
  })
  // findByIdAndDelete is mongoose method =>
  // automatically converting string to ObjectId()
    .then(result => {
      console.log('Redirecting to admin/products...');
      res.redirect('/admin/products');
    })
    .catch(err => {
      const error = new Error();
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
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
        editing: editMode,
        validationErrors: [],
        errorMessage: null,
      });
    })
    .catch(err => {
      const error = new Error();
      error.httpStatusCode = 500;
      return next(error);
    });
}

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const image = req.file;
  const updatedDescription = req.body.description;
  // findById is mongoose method =>
  // automatically converting string to ObjectId()
  
  Product.findById(prodId)
    .then(product => {
      if (product.userId.toString() !== req.user._id.toString()) {
        return res.redirect('/');
      }
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDescription;
      if (image) {
        fileHelper.deleteFile(product.imageUrl);
        product.imageUrl = image.path;
      }
      // when using save on existing item it will automatically update the item
      product.save().then(result => {
        res.redirect('/admin/products');
      });
    })
    .catch(err => {
      const error = new Error();
      error.httpStatusCode = 500;
      return next(error);
    });
}



exports.getAdminProducts = (req, res, next) => {
  Product.find({ userId: req.user._id })
    // will select data like filter
    //? .selet('title price -_id')
    // populate will fetch data with all the data information and not only the id object
    // next arguments will sellect/filter only the object keys as defined 
    //? .populate('userId', 'name')
    .then((products) => {
      res.render('admin/products', {
        prods: products,
        pageTitle: "Admin Products",
        path: '/admin/products',
        hasProducts: products.length > 0,

      });
    }).catch(
      err => {
        const error = new Error();
        error.httpStatusCode = 500;
        return next(error);
      }
    );
}
