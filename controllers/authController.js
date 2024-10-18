const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Sequelize } = require('../models');

// Register Function
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    console.log('Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed:', hashedPassword);

    console.log('Creating user...');
    const user = await User.create({ name, email, password: hashedPassword, role });
    console.log('User created:', user);

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    if (err instanceof Sequelize.UniqueConstraintError) {
      console.error('Unique constraint error:', err);
      return res.status(400).json({ error: 'Email already in use' });
    } else if (err instanceof Sequelize.ValidationError) {
      console.error('Validation error:', err.errors);
      return res.status(400).json({ error: err.errors.map(e => e.message).join(', ') });
    }
    console.error('Error during registration:', err);
    res.status(500).json({ error: err.message });
  }
};

// Login Function
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log('Finding user...');
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.error('User not found');
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('Comparing passwords...');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.error('Incorrect password');
      return res.status(401).json({ error: 'Incorrect password' });
    }

    console.log('Generating token...');
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: err.message });
  }
};
