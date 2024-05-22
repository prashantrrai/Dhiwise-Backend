const { STATUS_CREATED, MESSAGE_REGISTER, STATUS_ERROR, MESSAGE_ERROR, MESSAGE_FETCHED, STATUS_OK, MESSAGE_DELETED, MESSAGE_UPDATED } = require("../../Constants/message.constant");
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

const getUser = async (req, res) => {
    try {
        const userData = await service.getUser();

        res.status(STATUS_OK).json({
            success: true,
            message: MESSAGE_FETCHED,
            response: userData
        })
    } catch (error) {
        console.error("ERROR IN getUser CONTROLLER:", error);
        return res.status(STATUS_ERROR).json({
            success: false,
            message: MESSAGE_ERROR,
            error: error.message
        })
    }
}

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const userData = await service.getUserById(id);

        res.status(STATUS_OK).json({
            success: true,
            message: MESSAGE_FETCHED,
            response: userData
        })
    } catch (error) {
        console.error("ERROR IN getUserById CONTROLLER:", error);
        return res.status(STATUS_ERROR).json({
            success: false,
            message: MESSAGE_ERROR,
            error: error.message
        })
    }
}

const editUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userData = req.body;

        const updatedUser = await service.editUser(id, userData);

        res.status(STATUS_OK).json({
            success: true,
            message: MESSAGE_UPDATED,
            response: updatedUser
        })
    } catch (error) {
        console.error("ERROR IN editUser CONTROLLER:", error);
        return res.status(STATUS_ERROR).json({
            success: false,
            message: error.message
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        await service.deleteUser(id);

        res.status(STATUS_OK).json({
            success: true,
            message: MESSAGE_DELETED
        })
    } catch (error) {
        console.error("ERROR IN deleteUser CONTROLLER:", error);
        return res.status(STATUS_ERROR).json({
            success: false,
            message: error.message,
        })
    }
}


module.exports = { registerUser, getUser, getUserById, editUser, deleteUser };