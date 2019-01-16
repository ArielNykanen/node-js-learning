const crypto = require('crypto');

const bcrypt = require('bcryptjs');
const User = require('../models/user');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const { validationResult } = require('express-validator/check')

const transporter = nodemailer.createTransport(sendgridTransport({
  auth: {
    api_key: ''
  }
}));

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

exports.newPassword = (req, res, next) => {
  const token = req.params.token;
  User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
    .then(user => {
      if(!user) {
        return res.redirect('/login');
      }
      let message = req.flash('error');
      if (message.length > 0) {
        message = message[0];
      } else {
        message = null;
      }
      res.render('auth/new-password', {
        path: '/new-password',
        pageTitle: 'New Password',
        errorMessage: message,
        userId: user._id.toString(),
        passwordToken: token
      });
    })
    .catch(err => {
      console.log('\x1b[31m%s\x1b[23m', 'Error!!!! from auth, at line 33 reason: ' + err + ' ');
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
exports.getReset = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/reset-password', {
    path: '/reset',
    pageTitle: 'Reset Password',
    errorMessage: message
  });
}

exports.postSignUp = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render('auth/signup', {
      path: '/signup',
      pageTitle: 'Sign-Up',
      errorMessage: errors.array()[0].msg
    });
  }
  bcrypt.hash(password, 12)
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
          return transporter.sendMail({
            to: email,
            from: 'shop@marker-supplies.com',
            subject: 'Signup Succeeded!',
            html: '<h1>You successfuly signed up!</h1>'
          });
    })
    .catch(err => {
      console.log('\x1b[31m%s\x1b[23m', 'Error!!!! from auth CTRL, at line 24 reason: ' + err + ' ');
    });
}

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('auth/login', {
      path: '/login',
      pageTitle: 'Login',
      errorMessage: errors.array()[0].msg
    });
  }
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

exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log('\x1b[31m%s\x1b[23m', 'Error!!!! from auth, at line 137 reason: ' + err + ' ');
      return res.redirect('/reset');
    }
    const token = buffer.toString('hex');
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          req.flash('error', 'No Account With That Email Found.');
          return res.redirect('/reset');
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save()
          .then(result => {
            res.redirect('/');
            transporter.sendMail({
              to: req.body.email,
              from: 'shop@marker-supplies.com',
              subject: 'Password Reset',
              html: `
          <p>You requested a password reset</p>
          <p>Click this <a href="http://localhost:3000/reset/${token}" >Link </a> to set a new password</p>
          `
            });
          });
      })
      .catch(err => {
        console.log('\x1b[31m%s\x1b[23m', 'Error!!!! from auth , at line 144 reason: ' + err + ' ');
      });
  });
}

exports.postNewPassword = (req, res, next) => {
  const newPassword = req.body.password;
  const userId = req.body.userId;
  const passwordToken = req.body.passwordToken;
  let resetUser;
  User.findOne({ resetToken: passwordToken, 
    resetTokenExpiration: { $gt: Date.now() }, 
    _id: userId 
  })
  .then(user => {
    resetUser = user; 
    console.log(resetUser);
    
    if (!user) {
     return res.redirect('/login');
    }
    return bcrypt.hash(newPassword, 12)
    .then(hashedPassword => {
      resetUser.password = hashedPassword;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpiration = undefined;
      return resetUser.save();
    })
    .then(result => {
      res.redirect('/login'); 
    });
  })
  
  .catch(err => {
    console.log('\x1b[31m%s\x1b[23m', 'Error!!!! from auth, at line 204 reason: ' + err + ' ');
  })
};