const { Task } = require('../models');

// Create a new task
exports.createTask = async (req, res) => {
  const { name, assignedTo, status } = req.body;
  try {
    const task = await Task.create({ name, assignedTo, status });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing task
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    await task.update({ status });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};