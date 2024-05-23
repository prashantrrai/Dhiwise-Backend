const { STATUS_OK, STATUS_ERROR } = require("../../Constants/message.constant");
const service = require("../../Services/Authentication/auth.service");


const login = async (req, res) => {
    try {
        const credentials = req.body;
        const token = await service.login(credentials);

        res.status(STATUS_OK).json({
            success: true,
            message: "Login Successfully",
            token: token
        })
    } catch (error) {
        console.error("ERROR IN login CONTROLLER:", error);
        return res.status(STATUS_ERROR).json({
            success: false,
            message: error.message,
        })
    }
};


module.exports = { login };
