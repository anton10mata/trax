require('dotenv').config();
const express = require('express');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Import routes
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const taskRoutes = require('./routes/taskRoutes');
const clockRoutes = require('./routes/clockRoutes');

// Root route to handle GET requests to '/'
app.get('/', (req, res) => {
  res.send('Welcome to the Trax API!');
});

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/clock', clockRoutes);

// Export the app (not listening yet)
module.exports = app;

// If the file is run directly, start the server
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}
