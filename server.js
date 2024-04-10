// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// MongoDB conn
mongoose.connect('mongodb+srv://dpatel4419:IRIij0zroeErfcNm@clusterdp0.viezzur.mongodb.net/?retryWrites=true&w=majority&appName=ClusterDP0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("connection success"))
    .catch(err => console.error("connection error:", err));

// Import API routes
const productRoutes = require('./routes/productsController');
const userRoutes = require('./routes/usersController');
const commentRoutes = require('./routes/commentController');
const cartRoutes = require('./routes/cartController');
const orderRoutes = require('./routes/ordersController');

// End Point
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/orders', orderRoutes);

// Starting the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
