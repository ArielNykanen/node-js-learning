const path = require('path');
const express = require('express');
const rootDir = require('../util/path');
const productsCtrl = require('../controllers/admin');
const router = express.Router();

router.get('/add-product', productsCtrl.getAddProduct);

router.post('/add-product', productsCtrl.postAddProduct);

router.get('/admin-products', productsCtrl.getAdminProducts);

module.exports = router;