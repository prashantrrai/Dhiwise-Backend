// Importing Packages and Libraries
const bcrypt = require('bcrypt');
const User = require("../../Models/User/user.model");


const getUser = async () => {
    try {
        const userData = await User.find();
        return userData;
    } catch (error) {
        console.error("ERROR IN getUser SERVICE:", error);
        throw error;
    }
}

const getUserById = async (Id) => {
    try {
        const userData = await User.findById(Id);
        return userData;
    } catch (error) {
        console.error("ERROR IN getUserById SERVICE:", error);
        throw error;
    }
}

const editUser = async (id, userData) => {
    try {
        const { username, profile, email, password, phone, roleId, verificationStatus } = userData;
        const user = await User.findById(id);

        // User exists, proceed with edit
        if (!user) {
            throw new Error('Sorry, user not found');
        }

        // Password validation
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
        if (!regex.test(password)) {
            throw new Error('Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character, and be at least 8 characters long.');
        }

        // Hashing the password before saving it.
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update user data
        user.username = username;
        user.profile = profile;
        user.email = email;
        user.password = hashedPassword;
        user.phone = phone;
        user.roleId = roleId;
        user.verificationStatus = verificationStatus;
        user.password_last_Changed = Date.now;
        user.updatedBy = user._id;

        return updatedUser = await user.save();

    } catch (error) {
        console.error('ERROR IN editUser SERVICE:', error);
        throw error;
    }
}

const deleteUser = async (id) => {
    try {

        const user = await User.findById(id);

        if (!user) {
            throw new Error('Sorry, user not found');
        }

        // User exists, proceed with deletion
        return await User.findByIdAndDelete(id);

    } catch (error) {
        console.error('ERROR IN deleteUser SERVICE:', error);
        throw error;
    }
}


module.exports = { getUser, getUserById, editUser, deleteUser };