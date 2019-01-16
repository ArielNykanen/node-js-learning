const express = require('express');

const authCtrl = require('../controllers/auth');

const router = express.Router();

router.get('/login', authCtrl.getLogin);
router.get('/signup', authCtrl.getSignUp);
router.get('/reset', authCtrl.getReset);
router.get('/reset/:token', authCtrl.newPassword);
 
router.post('/login', authCtrl.postLogin);
router.post('/logout', authCtrl.postLogout);
router.post('/signup', authCtrl.postSignUp);
router.post('/reset', authCtrl.postReset);
router.post('/new-password', authCtrl.postNewPassword);

module.exports = router;