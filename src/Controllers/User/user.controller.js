const { STATUS_CREATED, MESSAGE_REGISTER, STATUS_ERROR, MESSAGE_ERROR } = require("../../Constants/message.constant");
const service = require("../../Services/User/user.service");

const registerUser = async (req, res) => {
    try {
        const userData = await service.registerUser(req.body);

        res.status(STATUS_CREATED).json({
            success: true,
            message: MESSAGE_REGISTER,
            response: userData
        })
    } catch (error) {
        console.error("ERROR IN registerUser CONTROLLER:", error);
        return res.status(STATUS_ERROR).json({
            success: false,
            message: MESSAGE_ERROR,
            error: error.message
        })
    }
}


module.exports = { registerUser };