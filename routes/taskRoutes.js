const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Route to create a task
router.post('/', taskController.createTask);

// Route to update a task
router.put('/:id', taskController.updateTask);

module.exports = router;