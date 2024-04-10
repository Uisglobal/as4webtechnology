const express = require('express');
const router = express.Router();
const Order = require('../Models/Orders');

// GET orders by user ID
router.get('/:userId', async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId }).populate('products.productId');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new order
router.post('/', async (req, res) => {
    const { userId, products, totalAmount } = req.body;

    try {
        const order = new Order({
            userId: userId,
            products: products,
            totalAmount: totalAmount
        });

        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update an order
router.put('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const updatedOrder = await Order.findOneAndUpdate({ userId: userId }, req.body, { new: true });
        res.json(updatedOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an order
// Delete an order
router.delete('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const deletedOrder = await Order.findOneAndDelete({ userId: userId });
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json({ message: 'Order deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
