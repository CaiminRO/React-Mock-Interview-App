require('dotenv').config();

const express = require('express');
const cors = require('cors');

// Setup
const app = express();
const PORT = process.env.PORT || 5000;

// Mount Global Middleware
app.use(express.json());
app.use(cors());

// Mount Routes

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
