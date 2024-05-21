// Importing Packages and Libraries
const express = require("express");
const cors = require('cors');


// Extracting files and configurations
require("dotenv").config();
require("./Config/DB/connection");


// Import Routes
const home = require("./src/Routes/Home/home.route");
const user = require("./src/Routes/User/user.route");


// setting configurations
const app = express();
const PORT = process.env.PORT || 8080;


// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Use Routes as middlewares
app.use("/api/v1", home);
app.use("/api/v1", user);


// Default route
app.get('/api/v1', (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "Welcome to Admin Panel"
        });
    } catch (error) {
        console.error("ERROR IN Home ROUTE:", error);
        res.status(500).json({
            success: false,
        });
    }
});

// Server listening
app.listen(PORT, () => {
    console.log(`Development Server is running on http://localhost:${PORT}/api/v1`);
    console.log(`Production Server is running on https://${process.env.SERVER_URL}`);
})