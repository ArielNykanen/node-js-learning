const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({

  user: {
    userId: {
      type: Schema.ObjectId,
      required: true
    },
    email: {
      type: String,
      required: true,
      ref: 'User'
    }
  },
    items: []
});


module.exports = mongoose.model('Order', OrderSchema);