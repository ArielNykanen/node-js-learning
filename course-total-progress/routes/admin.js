const path = require('path');
const express = require('express');
const rootDir = require('../util/path');
const productsCtrl = require('../controllers/products');
const router = express.Router();

router.get('/add-product', productsCtrl.getAddProduct);

router.post('/add-product', productsCtrl.postAddProduct);

module.exports = router;