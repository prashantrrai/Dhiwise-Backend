const { MESSAGE_FETCHED, STATUS_OK, STATUS_ERROR, MESSAGE_ERROR, STATUS_CREATED, MESSAGE_REGISTER, MESSAGE_UPDATED, MESSAGE_DELETED } = require("../../Constants/message.constant");
const service = require('../../Services/Product/product.service');

const GetProducts = async (req, res) => {
    try {
        const productData = await service.GetProducts();

        res.status(STATUS_OK).json({
            success: true,
            message: MESSAGE_FETCHED,
            response: productData
        })
    } catch (error) {
        console.error("ERROR IN GetProducts CONTROLLER:", error);
        return res.status(STATUS_ERROR).json({
            success: false,
            message: MESSAGE_ERROR,
            error: error.message
        })
    }
}

const GetProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const productData = await service.GetProductById(id);

        res.status(STATUS_OK).json({
            success: true,
            message: MESSAGE_FETCHED,
            response: productData
        })
    } catch (error) {
        console.error("ERROR IN GetProductById CONTROLLER:", error);
        return res.status(STATUS_ERROR).json({
            success: false,
            message: MESSAGE_ERROR,
            error: error.message
        })
    }
}

const CreateProducts = async (req, res) => {
    try {
        const productData = await service.CreateProducts(req.body);

        res.status(STATUS_CREATED).json({
            success: true,
            message: MESSAGE_REGISTER,
            response: productData
        })
    } catch (error) {
        console.error("ERROR IN CreateProducts CONTROLLER:", error);
        return res.status(STATUS_ERROR).json({
            success: false,
            message: MESSAGE_ERROR,
            error: error.message
        })
    }
}

const EditProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const productData = req.body;

        const updatedProduct = await service.EditProduct(id, productData);

        res.status(STATUS_OK).json({
            success: true,
            message: MESSAGE_UPDATED,
            response: updatedProduct
        })
    } catch (error) {
        console.error("ERROR IN EditProduct CONTROLLER:", error);
        return res.status(STATUS_ERROR).json({
            success: false,
            message: MESSAGE_ERROR,
            error: error.message
        })
    }
}

const RemoveProduct = async (req, res) => {
    try {
        const { id } = req.params;

        await service.RemoveProduct(id);

        res.status(STATUS_OK).json({
            success: true,
            message: MESSAGE_DELETED
        })
    } catch (error) {
        console.error("ERROR IN RemoveProduct CONTROLLER:", error);
        return res.status(STATUS_ERROR).json({
            success: false,
            message: MESSAGE_ERROR,
            error: error.message
        })
    }
}


module.exports = { GetProducts, GetProductById, CreateProducts, EditProduct, RemoveProduct };