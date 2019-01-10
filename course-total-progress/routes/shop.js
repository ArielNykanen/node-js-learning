const path = require('path');
const rootDir = require('../util/path');

const shopCtrl = require('../controllers/shop');
const mainPageCtrl = require('../controllers/main-page');
const cartCtrl = require('../controllers/cart');

const express = require('express');
const adminData = require('./admin')
const router = express.Router();
router.get('/cart', cartCtrl.getCart); 
router.get('/checkout', cartCtrl.getCheckOut); 
router.get('/shop/products', shopCtrl.getProducts); 
router.get(['/', '/shop'],  mainPageCtrl.getMainPage); 

module.exports = router;
 