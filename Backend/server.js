const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const LeadRoutes = require('./routes/LeadRoutes');
const Restaurant = require('./routes/RestaurantRoutes');
const User = require('./routes/UserRoutes');

const app = express();

// Middleware
app.use(express.json()); 
app.use(cors());

// MongoDB connection
const uri = 'mongodb+srv://vedavyas14042003:AuA9KdQYwzwqO5uG@cluster0.g2q5f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose
  .connect(uri)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('Error connecting to MongoDB Atlas:', err));

// Routes
app.use('/api', LeadRoutes);
app.use('/api', Restaurant);
app.use('/api',User);

// Start server
app.listen(3001, () => console.log('Server running on http://localhost:3001'));