const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');

router.post('/', async (req, res) => {
  const { userId, portfolioData } = req.body;
  try {
    const portfolio = new Portfolio({ userId, portfolioData });
    await portfolio.save();
    res.status(201).json({ message: 'Portfolio saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const portfolio = await Portfolio.findOne({ userId });
    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;