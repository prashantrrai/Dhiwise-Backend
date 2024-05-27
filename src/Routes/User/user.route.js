const { Router } = require("express");
const controller = require("../../Controllers/User/user.controller");
const { authenticateToken } = require("../../Middlewares/Authentication/auth.middleware");


const userRouter = Router();

// Route to get all users
userRouter.get("/", authenticateToken, controller.GetUser);

// Route to get a user by ID, requires authentication
userRouter.get("/:id", authenticateToken, controller.GetUserById);

// Route to edit a user by ID, requires authentication
userRouter.put("/:id", authenticateToken, controller.EditUser);

// Route to delete a user by ID, requires authentication
userRouter.delete("/:id", authenticateToken, controller.RemoveUser);

module.exports = userRouter;