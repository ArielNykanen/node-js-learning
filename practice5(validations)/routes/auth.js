const express = require('express');
const { check, body } = require('express-validator/check');
const User = require('../models/user');

const authCtrl = require('../controllers/auth');

const router = express.Router();

router.get('/login', authCtrl.getLogin);
router.get('/signup', authCtrl.getSignUp);
router.get('/reset', authCtrl.getReset);
router.get('/reset/:token', authCtrl.newPassword);

router.post('/login',
[
  body('email')
  .isEmail()
  .withMessage('Please enter a valid email'),
  body('password', 'please enter valid password')
  .isLength({ min:5 })
  .isAlphanumeric(),
], authCtrl.postLogin);
router.post('/logout', authCtrl.postLogout);
router.post('/signup',
  [
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        // if (value === 'test@test.com') {
        //   throw new Error('Email is forbiden!');
        // }
        // return true;
        return User.findOne({ email: value })
          .then(userDoc => {
            if (userDoc) {
              return Promise.reject(
                'Email is already registred, please pick different one.'
              );
            }
          });
      }),
    body(
      'password',
      'Please enter at least 5 characters long password and only alphanumeric!'
    )
      .isLength({ min: 5 })
      .isAlphanumeric(),
    body('confirmPassword')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords needs to match!')
        }
        return true;
      })
  ]
  , authCtrl.postSignUp);
router.post('/reset', authCtrl.postReset);
router.post('/new-password', authCtrl.postNewPassword);

module.exports = router;