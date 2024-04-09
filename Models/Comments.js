const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    commentId: { type: String, required: true },
    userId: { type: String, required: true },
    productId: { type: String, required: true },
    rating: { type: Number, required: true },
    images: { type: Array },
    text: { type: String, required: true }
});

const Comments = mongoose.model('Comment', commentSchema);

module.exports = Comments;
