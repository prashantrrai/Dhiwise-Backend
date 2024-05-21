const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    Transaction: {
        type: Schema.type.ObjectId,
        ref: 'Transaction'
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Order', orderSchema);
