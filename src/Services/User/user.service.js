// Importing Packages and Libraries
const bcrypt = require('bcrypt');

const User = require("../../Models/User/user.model");



const registerUser = async (userData) => {
    try {
        const { username, profile, email, password, phone, roleId } = userData;

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
            const error = new Error('Password must contain at least one lowercase letter, one number, and one special character, and be at least 8 characters long.');
            return next(error);
        }

        // Hashing the password before saving it.
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        // Load HTML template for forgot password email
        //const template = await readFile('src/templates/registration-success.html', 'utf8');

        // compose email content
        // const subject = 'Registration Successful';
        // const description = template.replace('{{ username }}', username).replace('{{ password }}', password).replace('{{ firstname }}', profile.firstName).replace('{{ lastname }}', profile.lastName);

        // await sendMail(email, subject, description);

        // Create and save the user in a single step
        const result = await User.create({
            username: userData.username,
            profile: userData.profile,
            email: userData.email,
            password: hashedPassword,
            phone: phone,
            roleId: userData.roleId,
        });

        return result;

    } catch (error) {
        console.error('ERROR IN registerUser SERVICE:', error);
        throw error;
    }
};

module.exports = { registerUser };