const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');

// Route to add a schedule
router.post('/', scheduleController.addSchedule);

// Route to update a schedule
router.put('/:id', scheduleController.updateSchedule);

module.exports = router;