const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  bets: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Bets'
    }
  ]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
