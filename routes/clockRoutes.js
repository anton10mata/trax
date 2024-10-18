const express = require('express');
const router = express.Router();
const clockController = require('../controllers/clockController');

// Route to clock in
router.post('/in', clockController.clockIn);

// Route to clock out
router.put('/out/:id', clockController.clockOut);

module.exports = router;