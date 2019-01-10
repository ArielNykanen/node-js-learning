const shopCtrl = require('../controllers/shop');
const cartCtrl = require('../controllers/cart');
const express = require('express');
const router = express.Router();
router.get('/',  shopCtrl.getIndexPage); 

router.get('/orders', cartCtrl.getOrders); 

router.get('/cart', cartCtrl.getCart); 

router.get('/checkout', cartCtrl.getCheckOut); 

router.get('/products', shopCtrl.getProducts); 
// when handeling dynamic params and adding products/something after the dynamic params as below
//  it will never reach products/something because it will handle it as the dynamic params.
router.get('/products/:productId', shopCtrl.getProduct); 


module.exports = router;
 