const { STATUS_ERROR, MESSAGE_ERROR, MESSAGE_FETCHED, STATUS_OK, MESSAGE_DELETED, MESSAGE_UPDATED } = require("../../Constants/message.constant");
const service = require("../../Services/User/user.service");


const GetUser = async (req, res) => {
    try {
        const userData = await service.getUser();

        res.status(STATUS_OK).json({
            success: true,
            message: MESSAGE_FETCHED,
            response: userData
        })
    } catch (error) {
        console.error("ERROR IN GetUser CONTROLLER:", error);
        return res.status(STATUS_ERROR).json({
            success: false,
            message: MESSAGE_ERROR,
            error: error.message
        })
    }
}

const GetUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const userData = await service.getUserById(id);

        res.status(STATUS_OK).json({
            success: true,
            message: MESSAGE_FETCHED,
            response: userData
        })
    } catch (error) {
        console.error("ERROR IN GetUserById CONTROLLER:", error);
        return res.status(STATUS_ERROR).json({
            success: false,
            message: MESSAGE_ERROR,
            error: error.message
        })
    }
}

const EditUser = async (req, res) => {
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
        console.error("ERROR IN EditUser CONTROLLER:", error);
        return res.status(STATUS_ERROR).json({
            success: false,
            message: error.message
        })
    }
}

const RemoveUser = async (req, res) => {
    try {
        const { id } = req.params;

        await service.deleteUser(id);

        res.status(STATUS_OK).json({
            success: true,
            message: MESSAGE_DELETED
        })
    } catch (error) {
        console.error("ERROR IN RemoveUser CONTROLLER:", error);
        return res.status(STATUS_ERROR).json({
            success: false,
            message: error.message,
        })
    }
}


module.exports = { GetUser, GetUserById, EditUser, RemoveUser };