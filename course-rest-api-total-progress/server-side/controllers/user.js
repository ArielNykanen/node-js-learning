const User = require('../models/user');
const { validationResult } = require('express-validator/check');
exports.getStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error('Something went wrong user not found!');
      error.statusCode = 404;
      throw error;
    }
    const status = user.status;
    res.status(200).json({ message: 'Status fetched successfuly!', status: status });
  } catch (err) {
    next(err);
  }
}

exports.updateStatus = async (req, res, next) => {
  const newStatus = req.body.status;
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error('Something went wrong user not found!');
      error.statusCode = 404;
      throw error;
    }
    user.status = newStatus;
    const result = await user.save();
    res.status(200).json({ nessage: 'User updated.' })
  } catch (err) {
      next(err);
  }
}