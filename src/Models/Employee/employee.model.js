const mongoose = require('mongoose');
const { Schema } = mongoose;

const employeeSchema = new Schema({
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
    position: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    joiningDate: {
        type: Date,
        required: true
    },
    manager: {
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    },
    projects: [{
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }],
    skills: [{
        type: String
    }],
    performanceReviews: [{
        date: {
            type: Date,
            default: Date.now
        },
        review: {
            type: String
        }
    }],
    attendance: [{
        date: Date,
        status: String
    }]
}, {
    timestamps: true
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
