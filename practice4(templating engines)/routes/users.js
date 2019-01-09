const path = require('path');
const express = require('express');
const router = express.Router();
const usersData = require('./index');

router.get('/user', (req, res, next) => {
  res.render('users', {users: usersData.users, pageTitle: 'users'})
})

module.exports = router;
