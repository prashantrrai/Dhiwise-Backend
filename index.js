// Importing Packages and Libraries
const express = require("express");
const cors = require('cors');
const config = require('./Config/URL/config');

// Extracting files and configurations
require("dotenv").config();
const connectDB = require("./Config/DB/connection");
connectDB();


// Import Routes
const homeRouter = require("./src/Routes/Home/home.route");
const userRouter = require("./src/Routes/User/user.route");
const authRouter = require("./src/Routes/Authentication/auth.route");
const productRouter = require("./src/Routes/Product/product.route");


// setting configurations
const app = express();
const PORT = process.env.PORT || 8080;


// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Create a new router for /api/v1 & Use Routes as middlewares
const apiRouter = express.Router();

apiRouter.use('/home', homeRouter);
apiRouter.use('/user', userRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/product', productRouter);

// Use the apiRouter
app.use('/api/v1', apiRouter);

// Default route
app.get('/', (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "Welcome to Dhiwise",
            server: `Backend URL is: ${config.backendUrl}`
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
    console.log(`App running on port ${PORT}`);
    console.log(`Server is running on ${config.backendUrl}`);
})