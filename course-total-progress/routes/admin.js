const path = require('path');
const express = require('express');
const rootDir = require('../util/path');
const { check, body } = require('express-validator/check');
const productsCtrl = require('../controllers/admin');
const router = express.Router();
const isAuth = require('../middleware/is-auth');

router.get('/add-product', isAuth, productsCtrl.getAddProduct);
router.post('/add-product',
[
  body('title')
  .trim(),
  body('description')
  .trim(),
],
isAuth, productsCtrl.postAddProduct);


router.get('/products', isAuth, productsCtrl.getAdminProducts);

router.get('/edit-product/:productId', isAuth, productsCtrl.getEditProduct)

router.post('/edit-product', isAuth, productsCtrl.postEditProduct)

router.post('/delete-product', isAuth, productsCtrl.postDeleteProduct)

module.exports = router;