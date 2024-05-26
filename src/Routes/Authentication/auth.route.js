const { Router } = require('express');
const { login } = require('../../Controllers/Authentication/auth.controller');

const authRouter = Router();

authRouter.post('/login', login);


module.exports = authRouter;