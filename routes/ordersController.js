const express = require('express');
const router = express.Router();
const Order = require('../Models/Orders');

// GET orders by user ID
router.get('/:userId', async (req, res) => {
    try {
        const orders = await Order.find({ user: req.params.userId }).populate('items.product');
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
router.put('/:id', async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an order
router.delete('/:id', async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json({ message: 'Order deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
