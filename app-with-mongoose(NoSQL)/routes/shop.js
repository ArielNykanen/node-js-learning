const shopCtrl = require('../controllers/shop');
const cartCtrl = require('../controllers/cart');
const express = require('express');
const router = express.Router();
router.get('/',  shopCtrl.getIndexPage); 

router.get('/cart', cartCtrl.getCart); 
router.post('/cart/add-product', cartCtrl.postCart); 
router.post('/cart/delete-item', cartCtrl.removeFromCart); 

router.post('/create-order', cartCtrl.createOrder); 
router.get('/orders', cartCtrl.getOrders); 


router.get('/products', shopCtrl.getProducts); 
// when handeling dynamic params and adding products/something after the dynamic params as below
//  it will never reach products/something because it will handle it as the dynamic params.
router.get('/products/:productId', shopCtrl.getProduct); 


module.exports = router;
  