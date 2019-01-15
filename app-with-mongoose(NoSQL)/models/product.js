const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
      // giving up flexability of non Schema approach
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
     // relation setup to user model
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema);