const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
    res.status(500).json({ error: 'Server error' });
    }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
    const user = await User.findOne({ email });
    if (!user) {
    return res.status(400).json({ error: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
    return res.status(400).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h'
    });
    res.json({ token });
    } catch (error) {
    res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;