const Product = require('../models/product');
const fs = require('fs');
const Order = require('../models/order');
const path = require('path');
const PDFdcoument = require('pdfkit');

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
    err => {
      const error = new Error();
      error.httpStatusCode = 500;
      return next(error);
    }
    );
} 

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
    // findById is mongoose method =>
      // automatically converting string to ObjectId()
  Product.findById(prodId)
  .then(product => {
      res.render('shop/product-detail', {
      prod: product,
      pageTitle: product.title,
      path: "/products",
    });
  })
  .catch(err => {
    {
      const error = new Error();
      error.httpStatusCode = 500;
      return next(error);
    }
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
    err => {
      const error = new Error();
      error.httpStatusCode = 500;
      return next(error);
    } 
    );
}

exports.getInvoice = (req, res, next) => {
  const orderId = req.params.orderId;
  Order.findById(orderId)
  .then(order => {
    if (!order) {
    return next(new Error('No order found.'));
    }
    if (order.user.userId.toString() !== req.user._id.toString()) {
      return next(new Error('Unauthorized!'));
    }
    const invoiceName = 'invoice-' + orderId + '.pdf';
    const invoicePath = path.join('data', 'invoices', invoiceName);
    const pdfDoc = new PDFdcoument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition', 
      'inline; filename="' + invoiceName + '"'
      );
    pdfDoc.pipe(fs.createWriteStream(invoicePath));
    pdfDoc.pipe(res);
    pdfDoc.fontSize(26).text('Invoice', {
      underline: true
    });
    pdfDoc.text('--------------------------------------------------');
    let totalPrice = 0;
    order.items.forEach(prod => {
      totalPrice += prod.quantity * prod.product.price;
      pdfDoc.fontSize(14).text(prod.product.title + '-' + prod.quantity + ' X $' + prod.product.price);
    });
    pdfDoc.text('---');
    pdfDoc.fontSize(20).text('Total Price: $' + totalPrice)
    pdfDoc.end();
    //? this will first read and download the entire file before it will serve it.
    //? its ok to use this method for small files
      // fs.readFile(invoicePath, (err, data) => {
      //   if (err) {
      //    return next(err);
      //   }
      //   res.setHeader('Content-Type', 'application/pdf');
      //   res.setHeader('Content-Disposition', 'inline; filename="' + invoiceName + '"');
      //   res.send(data);
      // });

    //? this methos will stream the data through the response to the browser step by step 
    //? for large files this is better way to send files to user.
    //? it will stream the file on the fly.
    // const file = fs.createReadStream(invoicePath);

      // file.pipe(res);
  })
  .catch(err => next(err));
}