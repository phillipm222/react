const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./models/User');
const TimeEntry = require('./models/TimeEntry');
const { authenticateToken } = require('./middleware/auth');

const port = 3000; // Choose the desired port number

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const timeEntryRoutes = require('./routes/timeEntryRoutes');

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', authenticateToken, timeEntryRoutes);
app.use(express.json());

// Connect to your database (e.g., MongoDB) - replace the connection URL with your own
mongoose.connect('mongodb://localhost:27017/testdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
