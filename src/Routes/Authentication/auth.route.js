const { Router } = require('express');
const { login } = require('../../Controllers/Authentication/auth.controller');

const auth = Router();

auth.post('/login', login);


module.exports = auth;