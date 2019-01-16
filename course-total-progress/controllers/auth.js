const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  console.log(req.session.isLoggedIn);
  res.render('auth/login', {
    path:'/login',
    pageTitle: 'Login',
    isAuthenticated: req.session.isLoggedIn
  });
}

exports.postLogin = (req, res, next) => {
  User.findById('5c3d80aba19a09a4b557935e')
  .then(user => {
    req.session.isLoggedIn = true;
    req.session.user = user;
    res.redirect('/');
      })
      .catch(err => console.log(err));
}

