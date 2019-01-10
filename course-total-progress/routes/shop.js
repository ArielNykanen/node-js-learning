const shopCtrl = require('../controllers/shop');
const cartCtrl = require('../controllers/cart');
const express = require('express');
const router = express.Router();
router.get('/orders', cartCtrl.getOrders); 
router.get('/cart', cartCtrl.getCart); 
router.get('/checkout', cartCtrl.getCheckOut); 
router.get('/products', shopCtrl.getProducts); 
router.get('/',  shopCtrl.getIndexPage); 

module.exports = router;
 