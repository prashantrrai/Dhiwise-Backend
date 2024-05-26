const mongoose = require("mongoose");

const db_name = 'dhiwise-backend';

const MONGO_URI = process.env.MONGO_URL || `mongodb://localhost:27017/${db_name}`;


const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Database Connected");
    } catch (error) {
        console.error("SOME BUGS IN Connection FILE :", error);
    }
};

module.exports = connectDB;