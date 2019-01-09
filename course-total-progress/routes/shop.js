const path = require('path');
const rootDir = require('../util/path');

const express = require('express');
const adminData = require('./admin')
const router = express.Router();
router.get('/',(req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'shop.html'));
  console.log(adminData.products);
  console.log('in middleware2!');
}); 

module.exports = router;
 