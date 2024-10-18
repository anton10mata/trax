const { ClockRecord } = require('../models');

// Clock in
exports.clockIn = async (req, res) => {
  const { employeeId, clockInTime } = req.body;
  try {
    const clockRecord = await ClockRecord.create({ employeeId, clockInTime, clockOutTime: null });
    res.status(201).json(clockRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Clock out
exports.clockOut = async (req, res) => {
  const { id } = req.params;
  const { clockOutTime } = req.body;
  try {
    const clockRecord = await ClockRecord.findByPk(id);
    if (!clockRecord) return res.status(404).json({ error: 'Clock record not found' });
    await clockRecord.update({ clockOutTime });
    res.json(clockRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};