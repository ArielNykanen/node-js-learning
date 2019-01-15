const Product = require('../models/product');
const User = require('../models/user');

exports.getCart = (req, res, next) => {
  req.user
  .populate('cart.items.productId')
  // populate will not return promise 
   // need to use execPopulate to use then()
  .execPopulate()
  .then(user => {
    const products = user.cart.items;    
    res.render('shop/cart', {
    pageTitle: "In Cart", 
    path: '/cart',
    products: products
    });
    }).catch(err => console.log(err))
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
  .then(product => {
    return req.user.addToCart(product);
  })
  .then(result => {
    console.log(result);
    res.redirect('/cart');
  })
  .catch(err => console.log(err)
  )
  // let fetchedCart;
  // let newQuantity = 1;
  // req.user.getCart().then(cart => {
  //   fetchedCart = cart;
  //   return cart.getProducts({where: { id: prodId }});
  // })
  // .then(products => {
  //   let product;
  //   if (products.length > 0) {
  //     product = products[0];
  //   }
  //   if (product) {
  //     const oldQuantity = product.cartItem.quantity;
  //     newQuantity = oldQuantity + 1;
  //    return product;
  //   }
  //  return Product.findByPk(prodId);
  // })
  // .then(product => {
  //   return fetchedCart.addProduct(product, {
  //     through: { quantity: newQuantity }
  //   });
  // })
  // .then(() => {
  //   res.redirect('/cart');
  // })
  // .catch(err => console.log(err)
  // );
}

exports.postCartDeleteItem = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
  .deleteItemFromCart(prodId)
  .then(result => {
    res.redirect('/cart');
  })
  .catch(err => console.log(err)
  );
};




exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user.addOrder()
  .then(result => {
    res.redirect('/orders');
  })
  .catch(err => console.log(err)
  );
}

exports.getOrders = (req, res, next) => {
  req.user.getOrders()
  .then(orders => {
    res.render('shop/orders', {
      pageTitle: "In Orders", 
      path: '/orders',
      orders: orders
    });
  }).catch(err => console.log(err)
  );
}
