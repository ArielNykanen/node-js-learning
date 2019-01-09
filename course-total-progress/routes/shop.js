const path = require('path');
const rootDir = require('../util/path');

const productsCtrl = require('../controllers/products');

const express = require('express');
const adminData = require('./admin')
const router = express.Router();
router.get('/', productsCtrl.getProducts); 

module.exports = router;
 