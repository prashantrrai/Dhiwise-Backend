const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "Product Name is Required."]
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: [true, "Price is Required."]
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
        required: [true, "Category is Required."]
    },
    supplier: {
        name: {
            type: String,
            required: [true, "Supplier Name is Required."]
        },
        contact: {
            type: String,
            required: [true, "Supplier Contact is Required."]
        },
        address: {
            type: String,
            required: [true, "Supplier Address is Required."]
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
            },
            comment: {
                type: String,
            },
            created_At: {
                type: Date,
                default: Date.now
            }
        }
    ],
    Image: {
        type: String,
        default: 'https://imgs.search.brave.com/B4qy_aiNEPygH7a24ZhhqztXmMO0XEQlwGD0gaB9StQ/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL2ltYWdlcy81/ODQ4MmVjMGNlZjEw/MTRjMGI1ZTRhNzAu/cG5n'
    }
},
    {
        timestamps: true
    }

);


const Product = mongoose.model('Product', productSchema);
module.exports = Product;
