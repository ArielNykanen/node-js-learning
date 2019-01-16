const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: message
  });
}

exports.getSignUp = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Sign-Up',
    errorMessage: message
  });
}

exports.postSignUp = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({ email: email })
  .then(userDoc => {
    if (userDoc) {
      req.flash('error', 'Email is already registred, please pick different one.');
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
        req.flash('error', 'Invalid Email or Password.')
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
        req.flash('error', 'Invalid Email or Password.')
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

