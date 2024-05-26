const { Router } = require('express');
const { STATUS_OK, STATUS_ERROR, MESSAGE_OK, MESSAGE_ERROR } = require("../../Constants/message.constant");


const homeRouter = Router();

homeRouter.get('/', (req, res) => {
    try {
        res.status(STATUS_OK).json({
            success: true,
            message: MESSAGE_OK,
            data: "Welcome to Dhiwise"
        });
    } catch (error) {
        console.error("ERROR IN HOME ROUTE:", error);
        res.status(STATUS_ERROR).json({
            success: false,
            message: MESSAGE_ERROR
        });
    }
});

module.exports = homeRouter;