const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    department: {
        type: String,
        required: true
    },
    permissions: [{
        type: String
    }],
    supervisedEmployees: [{
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    }],
    tasks: [{
        type: String
    }],
    reports: [{
        type: Schema.Types.ObjectId,
        ref: 'Report'
    }],
    systemSettings: {
        type: Schema.Types.Mixed
    }
}, {
    timestamps: true
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
