const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: req.session.isLoggedIn
  });
}

exports.getSignUp = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Sign-Up',
    isAuthenticated: req.session.isLoggedIn
  });
}

exports.postSignUp = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({ email: email })
  .then(userDoc => {
    if (userDoc) {
      return res.redirect('/signup');
    }
    return bcrypt.hash(password, 12)
    .then(hashedPassword => {
      const user = new User({
        email: email,
        password: hashedPassword,
        cart: { items: [] }
      });
      return user.save();
    })
    .then(result => {
      res.redirect('/login');
    });
   
  })
  .catch(err => {
    console.log('\x1b[31m%s\x1b[23m', 'Error!!!! from auth CTRL, at line 24 reason: ' + err + ' ');
  });
}

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        return res.redirect('/login');
      }
      bcrypt.compare(password, user.password)
      .then(doMatch => {
        if (doMatch) {
          req.session.isLoggedIn = true;
          req.session.user = user;
          return req.session.save(err => {
            res.redirect('/');
          });
        }
        res.redirect('/login');
      })
      .catch(err => {
        console.log('\x1b[31m%s\x1b[23m', 'Error!!!! from auth password validation, at line 58 reason: ' + err + ' ');
        res.redirect('/login');

      })
    
    })
    .catch(err => console.log(err));
}



exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    res.redirect('/');
    console.log(err);
  });
}

