const User = require('../models/user');
const { validationResult } = require('express-validator/check');
exports.getStatus = (req, res, next) => {
  User.findById(req.userId)
    .then(user => {
      if (!user) {
        const error = new Error('Something went wrong user not found!');
        error.statusCode = 404;
        throw error;
      }
      const status = user.status;
      res.status(200).json({ message: 'Status fetched successfuly!', status: status });
    })
    .catch(err => {
      const error = new Error('Status not found!')
    })
}

exports.updateStatus = (req, res, next) => {
  const newStatus = req.body.status;
  User.findById(req.userId)
    .then(user => {
      if (!user) {
        const error = new Error('Something went wrong user not found!');
        error.statusCode = 404;
        throw error;
      }
      user.status = newStatus;
      return user.save();
    })
    .then(result => {
      res.status(200).json({ nessage: 'User updated.' })
    })
    .catch(err => {
      const error = new Error('Status not found!')
    })
  console.log(req.body);

}