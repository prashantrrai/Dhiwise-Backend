const { Router } = require("express");

// import controllers
const { registerUser, getUser, getUserById, editUser, deleteUser } = require("../../Controllers/User/user.controller");

const user = Router();


user.post("/user", registerUser);
// user.get("/user", getUser);
// user.get("/user/:id", getUserById);
// user.put("/user/:id", editUser);
// user.delete("/user/:id", deleteUser);

module.exports = user;