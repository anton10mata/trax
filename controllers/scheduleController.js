const { Schedule } = require('../models');

// Add a new schedule
exports.addSchedule = async (req, res) => {
  const { employeeId, shiftStart, shiftEnd } = req.body;
  try {
    const schedule = await Schedule.create({ employeeId, shiftStart, shiftEnd });
    res.status(201).json(schedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing schedule
exports.updateSchedule = async (req, res) => {
  const { id } = req.params;
  const { shiftStart, shiftEnd } = req.body;
  try {
    const schedule = await Schedule.findByPk(id);
    if (!schedule) return res.status(404).json({ error: 'Schedule not found' });
    await schedule.update({ shiftStart, shiftEnd });
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};