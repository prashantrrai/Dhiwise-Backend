const { Router } = require("express");
const { authenticateToken } = require('../../Middlewares/Authentication/auth.middleware');
const { GetOrders, GenerateOrders, GetOrderById, GetOrderByIds, RemoveOrder } = require("../../Controllers/Orders/orders.controller");

const orderRouter = Router();

// Route to get all Orders
orderRouter.get("/", authenticateToken, GetOrders);

// Route to get a Orders by ID
orderRouter.get("/:id", authenticateToken, GetOrderById);

// Route to get a Orders by multiple IDs
orderRouter.get("/", authenticateToken, GetOrderByIds);

// Route to Add a new Orderss
orderRouter.post("/generate", authenticateToken, GenerateOrders);

// Route to delete a Orders by ID, requires authentication
orderRouter.delete("/:id", authenticateToken, RemoveOrder);

module.exports = orderRouter;