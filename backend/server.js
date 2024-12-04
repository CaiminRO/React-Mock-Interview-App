require('dotenv').config();

const express = require('express');
const cors = require('cors');
const accountRoutes = require('./routes/accountRoutes');
const todoRoutes = require('./routes/todoRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Setup
const app = express();
const PORT = process.env.PORT || 5000;

// Mount Global Middleware
app.use(express.json());
app.use(cors());

// Mount Routes
app.use('/api/account', accountRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/admin', adminRoutes)

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
