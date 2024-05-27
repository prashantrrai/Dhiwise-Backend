const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        lowercase: true,
        trim: true,
        unique: true,
    },
    profile: {
        firstName: {},
        middleName: {
            type: String,
            required: false
        },
        lastName: {},
        DOB: {
            type: Date,
            required: false
        },
        sex: {
            type: String,
            enum: ['male', 'female', 'other'],
            required: false
        },
        address: {
            type: String,
            required: false
        },
        avatarURL: {
            type: String,
            default: 'https://imgs.search.brave.com/ITQtmiubqEzO_LL-pZX7k1389ZSHzP66DYgVCW3edIo/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMtMDAuaWNvbmR1/Y2suY29tL2Fzc2V0/cy4wMC9wcm9maWxl/LWRlZmF1bHQtaWNv/bi0xMDI0eDEwMjMt/NHU1bXJqMnYucG5n'
        }
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address.']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    phone: {},
    roleId: {
        type: Number,
        enum: [1, 2, 3],
        default: 3
    },
    roleDetails: {},
    verificationStatus: {
        isActive: {
            type: Boolean,
            default: 0
        },
        two_factor_Enabled: {
            type: Boolean,
            default: 0
        },
    },
    lastLogins: [{
        Date: {
            type: Date,
            default: Date.now
        },
        IPv4: {
            type: String,
            default: "49.34.120.205"
        },
        IPv6: {
            type: String,
            default: "2409:4080:9c81:5cd9:b4c5:5f99:b5bd:f628"
        }
    }],
    password_last_Changed: {
        type: Date,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},
    {
        timestamps: true
    }

);


// Pre-save hook to set roleDetails based on roleId
userSchema.pre('save', function (next) {
    const roleIdDetailsMap = {
        1: "Admin",
        2: "Employee",
        3: "Customer"
    };

    this.roleDetails = roleIdDetailsMap[this.roleId];
    next();
});

// Customize response object to include roleDetails inside roleId
userSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.roleId = {
            id: ret.roleId,
            role: doc.roleDetails
        };
        delete ret.roleDetails;
        return ret;
    }
});


const User = mongoose.model('User', userSchema);
module.exports = User;