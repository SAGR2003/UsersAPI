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

    jwt.sign({ username: newUser.username }, 'secret', { expiresIn: '1h' }, (err, token) => {
      if (err) {
        res.status(500).json({ error: 'Error al generar el token JWT' });
      } else {
        res.status(200).json({ message: 'User registered successfully', token }); 
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.post('/login', (req, res) => {
  loginAttempts++;

  if (loginAttempts % 2 === 0) {
    authenticateUser(req, res, async () => {
      if (req.user && req.user.username) {
        const username = req.user.username;

        jwt.sign({ username: username }, 'secret', { expiresIn: '1h' }, (err, token) => {
          if (err) {
            res.status(500).json({ error: 'Error al generar el token JWT' });
          } else {
            res.json({ token }); 
          }
        });
      } else {
        res.status(403).json({ error: 'Usuario no autenticado o nombre de usuario no disponible' });
      }
    });
  } else {
    res.status(403).json({ error: 'Odd login attempt, access denied' });
  }
});

module.exports = router;
