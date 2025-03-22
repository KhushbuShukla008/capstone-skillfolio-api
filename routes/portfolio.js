import express from 'express';
import githubService from '../services/githubService.js';

const router = express.Router();

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
      const userRepos = await githubService.getUserRepos(userId);
    res.json(userRepos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', createPortfolio);

export default router;