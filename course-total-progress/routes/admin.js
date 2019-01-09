const path = require('path');
const express = require('express');
const rootDir = require('../util/path');
const router = express.Router();

router.get('/add-product', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
  console.log('in middleware2!');
});

router.post('/add-product', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
  console.log('in middleware2!');
});

module.exports = router;