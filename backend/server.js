const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const shoppingListsRouter = require('./routes/shoppingLists');
const itemsRouter = require('./routes/items');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const notifications = require('./routes/notifications');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  // origin: 'http://localhost:3000', // Replace with your frontend URL
};

// Middleware
app.use(cors(corsOptions)); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse incoming JSON requests

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
  });

// Test Route
app.get('/', (req, res) => {
  res.status(200).send('API is running...');
});

// API Routes
app.use('/api/shoppingLists', shoppingListsRouter);
app.use('/api/items', itemsRouter);
app.use('/api/users', usersRouter);
app.use('/api/notifications', notifications);
app.use('/api/auth', authRouter);

// Error Handling Middleware
app.use(errorHandler);

module.exports = app;
