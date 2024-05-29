const Order = require("../../Models/Order/order.model");

const GetOrders = async () => {
    try {
        // const OrderData = await Order.find();
        const OrderData = await Order.aggregate([
            {
                $unwind: "$products"
            },
            {
                $lookup: {
                    from: "products",
                    localField: "products.product",
                    foreignField: "_id",
                    as: "productDetails"
                }
            },
            {
                $unwind: "$productDetails"
            },
            {
                $group: {
                    _id: "$_id",
                    customer: { $first: "$customer" },
                    products: {
                        $push: {
                            product: "$products.product",
                            quantity: "$products.quantity",
                            productDetails: "$productDetails"
                        }
                    },
                    totalAmount: { $first: "$totalAmount" },
                    Transaction: { $first: "$Transaction" },
                    status: { $first: "$status" },
                    createdAt: { $first: "$createdAt" },
                    updatedAt: { $first: "$updatedAt" },
                    __v: { $first: "$__v" }
                }
            }
        ]);
        return OrderData;
    } catch (error) {
        console.error("ERROR IN GetOrders SERVICE:", error);
        throw error;
    }
}

const GetOrderById = async (Id) => {
    try {
        const OrderData = await Order.findById(Id);
        return OrderData;
    } catch (error) {
        console.error("ERROR IN GetOrderById SERVICE:", error);
        throw error;
    }
}

const GetOrderByIds = async (Id) => {
    try {
        const OrderData = await Order.findById(Id);
        return OrderData;
    } catch (error) {
        console.error("ERROR IN GetOrderById SERVICE:", error);
        throw error;
    }
}

const GenerateOrders = async (OrderData) => {
    try {
        const { customer, products, totalAmount, Transaction, status } = OrderData;

        // Create and save the Order in a single step
        const result = await Order.create({
            customer: customer,
            products: products,
            totalAmount: totalAmount,
            Transaction: Transaction,
            status: status
        });

        return result;
    } catch (error) {
        console.error('ERROR IN GenerateOrders SERVICE:', error);
        throw error;
    }
};

const RemoveOrder = async (id) => {
    try {
        const Order = await Order.findById(id);

        if (!Order) {
            throw new Error('Sorry, Order not found');
        }

        // Order exists, proceed with deletion
        return await Order.findByIdAndDelete(id);

    } catch (error) {
        console.error('ERROR IN RemoveOrder SERVICE:', error);
        throw error;
    }
}

module.exports = { GetOrders, GetOrderById, GetOrderByIds, GenerateOrders, RemoveOrder };