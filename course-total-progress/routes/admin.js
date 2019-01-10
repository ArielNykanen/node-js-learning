const path = require('path');
const express = require('express');
const rootDir = require('../util/path');
const productsCtrl = require('../controllers/admin');
const router = express.Router();

router.get('/add-product', productsCtrl.getAddProduct);

router.get('/products', productsCtrl.getAdminProducts);

router.post('/add-product', productsCtrl.postAddProduct);

router.get('/edit-product/:productId', productsCtrl.getEditProduct)

router.post('/edit-product', productsCtrl.postEditProduct)

router.post('/delete-product', productsCtrl.postDeleteProduct)

module.exports = router;