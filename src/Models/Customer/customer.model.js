const mongoose = require('mongoose');
const { Schema } = mongoose;

const customerSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    shippingAddress: {
        type: String,
        required: true
    },
    billingAddress: {
        type: String,
        required: true
    },
    loyaltyPoints: {
        type: Number,
        default: 0
    },
    orders: [{
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }],
    wishlist: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    paymentMethod: {
        type: Schema.Types.ObjectId,
        ref: 'PaymentMethod'
    }
}, {
    timestamps: true
});


const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;
