const express = require('express');

const authCtrl = require('../controllers/auth');

const router = express.Router();

router.get('/login', authCtrl.getLogin);
router.get('/signup', authCtrl.getSignUp);

router.post('/login', authCtrl.postLogin);
router.post('/logout', authCtrl.postLogout);
router.post('/signup', authCtrl.postSignUp);

module.exports = router;