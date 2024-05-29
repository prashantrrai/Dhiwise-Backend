const { Router } = require("express");
const { GetProducts, GetProductById, EditProduct, RemoveProduct, CreateProducts, GetProductByIds } = require("../../Controllers/Product/product.controller");
const { authenticateToken } = require('../../Middlewares/Authentication/auth.middleware');

const productRouter = Router();

// Route to get all Product
productRouter.get("/", GetProducts);

// Route to get a Product by ID
productRouter.get("/:id", GetProductById);

// Route to get a Product by multiple IDs
productRouter.get("/", GetProductByIds);

// Route to Add a new Products
productRouter.post("/create", authenticateToken, CreateProducts);

// Route to edit a Product by ID, requires authentication
productRouter.put("/:id", authenticateToken, EditProduct);

// Route to delete a Product by ID, requires authentication
productRouter.delete("/:id", authenticateToken, RemoveProduct);

module.exports = productRouter;