// Importing Packages and Libraries
const User = require("../../Models/User/user.model");


const GetUser = async () => {
    try {
        const userData = await User.find();
        return userData;
    } catch (error) {
        console.error("ERROR IN GetUser SERVICE:", error);
        throw error;
    }
}

const GetUserById = async (Id) => {
    try {
        const userData = await User.findById(Id);
        return userData;
    } catch (error) {
        console.error("ERROR IN GetUserById SERVICE:", error);
        throw error;
    }
}

const EditUser = async (id, userData) => {
    try {
        const { username, profile, email, phone, role, verificationStatus } = userData;
        const user = await User.findById(id);

        // User exists, proceed with edit
        if (!user) {
            throw new Error('Sorry, user not found');
        }

        // Update user data
        user.username = username;
        user.profile = profile;
        user.email = email;
        user.phone = phone;
        user.role = role;
        user.verificationStatus = verificationStatus;
        user.password_last_Changed = Date.now();
        user.updatedBy = user._id;

        return updatedUser = await user.save();

    } catch (error) {
        console.error('ERROR IN EditUser SERVICE:', error);
        throw error;
    }
}

const RemoveUser = async (id) => {
    try {

        const user = await User.findById(id);

        if (!user) {
            throw new Error('Sorry, user not found');
        }

        // User exists, proceed with deletion
        return await User.findByIdAndDelete(id);

    } catch (error) {
        console.error('ERROR IN RemoveUser SERVICE:', error);
        throw error;
    }
}


module.exports = { GetUser, GetUserById, EditUser, RemoveUser };