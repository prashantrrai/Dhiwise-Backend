const mongoose = require('mongoose');
const { Schema } = mongoose;

const subscriptionSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    plan: {
        type: String,
        enum: ['basic', 'standard', 'premium'],
        required: true
    },
    startDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    endDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'paused', 'cancelled'],
        default: 'active'
    }
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
