const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authenticateUser } = require('../middleware/authJwt');

let loginAttempts = 0;

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/login', (req, res) => {
  loginAttempts++;

  if (loginAttempts % 2 === 0) {
    authenticateUser(req, res, async () => {
      try {
        const token = jwt.sign({ userId: req.user._id }, 'secret', { expiresIn: '1h' });
        res.json({ token });
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
    });
  } else {
    res.status(403).json({ error: 'Odd login attempt, access denied' });
  }
});

module.exports = router;
