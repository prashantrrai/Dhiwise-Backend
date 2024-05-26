const { Router } = require("express");
const { registerUser, getUser, getUserById, editUser, deleteUser } = require("../../Controllers/User/user.controller");
const { authenticateToken } = require("../../Middlewares/Authentication/auth.middleware");


const userRouter = Router();

// Route to register a new user
userRouter.post("/", registerUser);

// Route to get all users
userRouter.get("/", getUser);

// Route to get a user by ID, requires authentication
userRouter.get("/:id", authenticateToken, getUserById);

// Route to edit a user by ID, requires authentication
userRouter.put("/:id", authenticateToken, editUser);

// Route to delete a user by ID, requires authentication
userRouter.delete("/:id", authenticateToken, deleteUser);

module.exports = userRouter;