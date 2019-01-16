const Product = require('../models/product');
const Order = require('../models/order');
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
        products: products,
        isAuthenticated: req.session.isLoggedIn
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

exports.removeFromCart = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err)
    );
};




exports.createOrder = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    // populate will not return promise 
    // need to use execPopulate to use then()
    .execPopulate()
    .then(user => {
      const products = user.cart.items.map(i => {
        // ._doc with spread operator will store all the product data and not only the id
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
          email: req.user.email,
          userId: req.user
        },
        items: products
      });
      return order.save();
    })
    .then(result => {
      return req.user.clearCart();
    })
    .then(result => {
      res.render('shop/cart', {
        pageTitle: "In Cart",
        path: '/cart',
        products: result.cart.items,
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch(err => console.log(err))
}

exports.getOrders = (req, res, next) => {
  Order.find({ "user.userId": req.user._id })
    .then(orders => {
      res.render('shop/orders', {
        pageTitle: "In Orders",
        path: '/orders',
        orders: orders,
        isAuthenticated: req.session.isLoggedIn
      });
    }).catch(err => console.log(err)
    );
}
