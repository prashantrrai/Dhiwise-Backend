const mongoose = require('mongoose');
const { Schema } = mongoose;

const roleSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Role name is required'],
        unique: true,
        enum: ['Admin', 'Employee', 'Customer'],
    },
    roleId: {
        type: Number,
        required: [true, 'Role ID is required'],
        unique: true,
        enum: [1, 2, 3],
        default: 3
    },
    permissions: {
        type: [String],
        default: [],
    }
}, {
    timestamps: true
});

const Role = mongoose.model('Role', roleSchema);
module.exports = Role;
