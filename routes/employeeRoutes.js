const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Get all employees
router.get('/', employeeController.getEmployees);

// Create or update an employee
router.post('/', employeeController.createOrUpdateEmployee);

// Get an employee by ID
router.get('/:id', employeeController.getEmployeeById);

// Delete an employee
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;
