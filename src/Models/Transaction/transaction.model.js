const mongoose = require('mongoose');
const { Schema } = mongoose;

const transactionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    transactionAmount: {
        type: Number,
        required: true
    },
    transactionCategory: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: Schema.Types.ObjectId,
        ref: 'PaymentMethod',
        required: true
    },
    transactionDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    transactionStatus: {
        type: String,
        enum: ['pending', 'success', 'failed'],
        default: 'pending'
    }
});


const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
