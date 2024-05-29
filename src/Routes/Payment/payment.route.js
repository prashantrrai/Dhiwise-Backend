const { Router } = require('express');
const { paymentCheckout } = require('../../Controllers/Payment/payment.controller');


const paymentRouter = Router();

paymentRouter.post('/checkout', paymentCheckout);

module.exports = paymentRouter;