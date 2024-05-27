const mongoose = require('mongoose');
const { Schema } = mongoose;

const paymentMethodSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Payment Method is Required'],
    unique: true,
  }
});

// ['COD', 'UPI', 'Card', 'Net Banking', 'Wallet']

module.exports = mongoose.model('PaymentMethod', paymentMethodSchema);
