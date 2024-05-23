// Importing Packages and Libraries
const bcrypt = require('bcrypt');
const fs = require('fs');
const util = require('util');
const { sendMail } = require('../Email/email.service');
const User = require("../../Models/User/user.model");

// Promisify fs.readFile
const readFile = util.promisify(fs.readFile);


const registerUser = async (userData) => {
    try {
        const { username, profile, email, password, phone, roleId, verificationStatus } = userData;

        // Check if any required field is missing
        if (!username || !profile || !email || !password || !phone || !roleId) {
            throw new Error('Sorry, All fields are required.');
        }

        const existingEmail = await User.findOne({ email: email });

        // Checking if email is already registered.
        if (existingEmail) {
            throw new Error('Email is already registered. Please use a different email.');
        }

        const existingUsername = await User.findOne({ username: username });

        // Checking if username is already registered.  
        if (existingUsername) {
            throw new Error('Username is already registered. Please use a different username.');
        }

        // Password validation
        const regex = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
        if (!regex.test(password)) {
            throw new Error('Password must contain at least one lowercase letter, one number, and one special character, and be at least 8 characters long.');
        }

        // Hashing the password before saving it.
        const hashedPassword = await bcrypt.hash(password, 10);

        // Load HTML template for forgot password email
        const template = await readFile('src/Templates/Email/RegistrationSuccess.html', 'utf8');

        // compose email content
        const subject = 'Registration Successful';
        const description = template.replace('{{ username }}', username).replace('{{ password }}', password).replace('{{ firstname }}', profile.firstName).replace('{{ lastname }}', profile.lastName);

        await sendMail(email, subject, description);

        // Create and save the user in a single step
        const result = await User.create({
            username: username,
            profile: profile,
            email: email,
            password: hashedPassword,
            phone: phone,
            roleId: roleId,
            verificationStatus: verificationStatus
        });

        return result;

    } catch (error) {
        console.error('ERROR IN registerUser SERVICE:', error);
        throw error;
    }
};


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
        const regex = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
        if (!regex.test(userData.password)) {
            throw new Error('Password must contain at least one lowercase letter, one number, and one special character, and be at least 8 characters long.');
        }

        // Hashing the password before saving it.
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        // Update user data
        user.username = username;
        user.profile = profile;
        user.email = email;
        user.password = hashedPassword;
        user.phone = phone;
        user.roleId = roleId;
        user.verificationStatus = verificationStatus;

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


module.exports = { registerUser, getUser, getUserById, editUser, deleteUser };