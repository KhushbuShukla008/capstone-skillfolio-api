import express from 'express';
import githubService from '../services/githubService.js';

const router = express.Router();

// Example resume route
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  // Fetch user data from GitHub using githubService
  try {
    const userData = await githubService.getUserData(userId);
    res.json(userData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;