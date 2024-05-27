const { Router } = require('express');
const { login, signup } = require('../../Controllers/Authentication/auth.controller');

const authRouter = Router();

// Route to do user login
authRouter.post('/login', login);

// Route to do user signup
authRouter.post('/signup', signup);

module.exports = authRouter;