import express from "express";
import Order from "../model/order";

const router = express.Router();

// Get all orders
router.get("/", async (req, res): Promise<void> => {
    try {
        const orders = await Order.find()
            .populate('customerId')
            .populate('orderItems.itemId');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving orders" });
    }
});

// Get order by ID
router.get("/:id", async (req, res): Promise<void> => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('customerId')
            .populate('orderItems.itemId');

        if (!order) {
            res.status(404).json({ message: "Order not found" });
            return;
        }

        res.json(order);

    } catch (error) {
        res.status(500).json({ message: "Error retrieving order" });
    }
});


// Create a new order
router.post("/", async (req, res): Promise<void> => {
    try {
        const {customerId, total, orderItems} = req.body;

        if (!customerId || !total || !orderItems || orderItems.length === 0) {
            res.status(400).json({ message: "Invalid order data" });
            return;
        }

        const newOrder = new Order({
            customerId,
            total,
            orderItems
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);

    } catch (error) {
        res.status(500).json({ message: "Error creating order" });
    }
});

// delete order
router.delete("/:id", async (req, res): Promise<void> => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);

        if (!deletedOrder) {
            res.status(404).json({ message: "Order not found" });
            return;
        }
        res.status(200).json(deletedOrder);
    } catch (error) {
        res.status(500).json({ message: "Error deleting order" });
    }
});


export default router;