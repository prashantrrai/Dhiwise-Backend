const { MESSAGE_FETCHED, STATUS_OK, STATUS_ERROR, MESSAGE_ERROR, STATUS_CREATED, MESSAGE_REGISTER, MESSAGE_DELETED } = require("../../Constants/message.constant");
const service = require('../../Services/Orders/orders.service');

const GetOrders = async (req, res) => {
    try {
        const OrderData = await service.GetOrders();

        res.status(STATUS_OK).json({
            success: true,
            message: MESSAGE_FETCHED,
            response: OrderData
        })
    } catch (error) {
        console.error("ERROR IN GetOrders CONTROLLER:", error);
        return res.status(STATUS_ERROR).json({
            success: false,
            message: MESSAGE_ERROR,
            error: error.message
        })
    }
}

const GetOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const OrderData = await service.GetOrderById(id);

        res.status(STATUS_OK).json({
            success: true,
            message: MESSAGE_FETCHED,
            response: OrderData
        })
    } catch (error) {
        console.error("ERROR IN GetOrderById CONTROLLER:", error);
        return res.status(STATUS_ERROR).json({
            success: false,
            message: MESSAGE_ERROR,
            error: error.message
        })
    }
}

const GetOrderByIds = async (id) => {
    try {
        const OrderData = await service.GetOrderById(id);
        return OrderData;
    } catch (error) {
        console.error("ERROR IN GetOrderByIds CONTROLLER:", error);
        return res.status(STATUS_ERROR).json({
            success: false,
            message: MESSAGE_ERROR,
            error: error.message
        })
    }
}

const GenerateOrders = async (req, res) => {
    try {
        const OrderData = await service.GenerateOrders(req.body);

        res.status(STATUS_CREATED).json({
            success: true,
            message: MESSAGE_REGISTER,
            response: OrderData
        })
    } catch (error) {
        console.error("ERROR IN GenerateOrders CONTROLLER:", error);
        return res.status(STATUS_ERROR).json({
            success: false,
            message: MESSAGE_ERROR,
            error: error.message
        })
    }
}

const RemoveOrder = async (req, res) => {
    try {
        const { id } = req.params;

        await service.RemoveOrder(id);

        res.status(STATUS_OK).json({
            success: true,
            message: MESSAGE_DELETED
        })
    } catch (error) {
        console.error("ERROR IN RemoveOrder CONTROLLER:", error);
        return res.status(STATUS_ERROR).json({
            success: false,
            message: MESSAGE_ERROR,
            error: error.message
        })
    }
}


module.exports = { GetOrders, GetOrderById, GetOrderByIds, GenerateOrders, RemoveOrder };