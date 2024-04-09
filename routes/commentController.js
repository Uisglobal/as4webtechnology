// routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const Comment = require('../Models/Comments');

// GET all comments
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find().populate('product user');
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST comment
router.post('/', async (req, res) => {
    const { product, user, rating, images, text } = req.body;

    if (!product || !user || !rating || !text) {
        return res.status(400).json({ message: "Insert required fields" });
    }

    try {
        const comment = new Comment({
            product: product,
            user: user,
            rating: rating,
            images: images,
            text: text
        });

        const newComment = await comment.save();
        res.status(201).json(newComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update comment
router.put('/:id', async (req, res) => {
    try {
        const updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete comment
router.delete('/:id', async (req, res) => {
    try {
        const deletedComment = await Comment.findByIdAndDelete(req.params.id);
        if (!deletedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.json({ message: 'Comment deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
