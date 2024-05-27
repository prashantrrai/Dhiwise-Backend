require("dotenv").config();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require("../../Models/User/user.model");
const secretKey = process.env.SECRET_KEY;
const fs = require('fs');
const util = require('util');
const { sendMail } = require('../Email/email.service');
const readFile = util.promisify(fs.readFile);


const login = async (credentials) => {
    try {
        const { username, password } = credentials;
        const user = await User.findOne({ username });

        if (!user) {
            throw new Error('Sorry, Invalid username');
        }

        // Compare the password using bcrypt.compare
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw new Error('Sorry, Invalid password');
        }

        // Password is correct, generate JWT token
        const token = jwt.sign({
            id: user._id,
            username: user.username,
            email: user.email,
            roleId: user.roleId,
            role: user.roleDetails
        }, secretKey, { expiresIn: '1h' });

        // Extract IP address from the request
        // const userIp = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        // Update lastLogins field with timestamp and IP address
        await User.findByIdAndUpdate(user._id, {
            $push: {
                lastLogins: {}
            }
        });

        return token;
    } catch (error) {
        console.error('ERROR IN login SERVICE:', error);
        throw error;
    }
}

const signup = async (userData) => {

    try {
        const { username, email, password } = userData;

        // Check if any required field is missing
        if (!username || !email || !password) {
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
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
        if (!regex.test(password)) {
            throw new Error('Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character, and be at least 8 characters long.');
        }

        // Hashing the password before saving it.
        const hashedPassword = await bcrypt.hash(password, 10);

        // Load HTML template for forgot password email
        const template = await readFile('src/Templates/Email/RegistrationSuccess.html', 'utf8');

        // compose email content
        const subject = 'Registration Successful';
        const description = template.replace('{{ username }}', username).replace('{{ email }}', email).replace('{{ password }}', password);

        await sendMail(email, subject, description);

        // Create and save the user in a single step
        const result = await User.create({
            username: username,
            email: email,
            password: hashedPassword
        });

        return result;
    } catch (error) {
        console.error('ERROR IN signUp SERVICE:', error);
        throw error;
    }
};


module.exports = { login, signup };