const path = require('path');
const rootDir = require('../util/path');
const express = require('express');
const router = express.Router();
const users = [];

router.get('/', (req, res, next) => {
  res.render('index', {pageTitle: 'home page'});
});

router.post('/create-user', (req, res, next) => {
  res.redirect('/users/user')
  users.push({username: req.body.username, lastname: req.body.lastname});
})

module.exports.route = router;
module.exports.users = users;