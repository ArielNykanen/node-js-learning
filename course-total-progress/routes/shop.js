const shopCtrl = require('../controllers/shop');
const cartCtrl = require('../controllers/cart');
const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/is-auth');

router.get('/',  shopCtrl.getIndexPage); 

router.get('/cart', isAuth, cartCtrl.getCart); 
router.post('/cart/add-product', isAuth, cartCtrl.postCart); 
router.post('/cart/delete-item', isAuth, cartCtrl.removeFromCart); 

router.post('/create-order', isAuth, cartCtrl.createOrder); 
router.get('/orders', isAuth, cartCtrl.getOrders); 


router.get('/products', shopCtrl.getProducts); 
// when handeling dynamic params and adding products/something after the dynamic params as below
//  it will never reach products/something because it will handle it as the dynamic params.
router.get('/products/:productId', shopCtrl.getProduct); 

router.get('/orders/:orderId', isAuth, shopCtrl.getInvoice);

module.exports = router;
  