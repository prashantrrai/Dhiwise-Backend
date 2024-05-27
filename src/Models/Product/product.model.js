const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        isAvailable: {
            type: Boolean,
            default: 0
        },
        quantity: {
            type: Number,
            default: 0
        }
    },
    category: {
        type: String,
        required: true
    },
    supplier: {
        name: {
            type: String,
            required: true
        },
        contact: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        }
    },
    reviews: [
        {
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            },
            created_At: {
                type: Date,
                default: Date.now
            }
        }
    ]
},
    {
        timestamps: true
    }

);


const Product = mongoose.model('Product', productSchema);
module.exports = Product;
