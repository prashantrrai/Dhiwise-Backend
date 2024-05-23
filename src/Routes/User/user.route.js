const { Router } = require("express");

const { registerUser, getUser, getUserById, editUser, deleteUser } = require("../../Controllers/User/user.controller");
const { authenticateToken } = require("../../Middlewares/Authentication/auth.middleware");

const user = Router();


user.post("/user", registerUser);
user.get("/user", authenticateToken, getUser);
user.get("/user/:id", authenticateToken, getUserById);
user.put("/user/:id", authenticateToken, editUser);
user.delete("/user/:id", authenticateToken, deleteUser);

module.exports = user;