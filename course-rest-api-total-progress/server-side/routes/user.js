const express = require('express');
const isAuth = require('../middleware/is-auth');
const router = express.Router();
const { body } = require('express-validator/check');

const userCtrl = require('../controllers/user');

router.get('/status', isAuth, userCtrl.getStatus);

router.patch('/update/status', isAuth,
[
  body('status')
  .trim()
  .not()
  .isEmpty()
],
userCtrl.updateStatus)

module.exports = router;