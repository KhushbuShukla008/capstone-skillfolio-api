import express from 'express';
import githubService from '../services/githubService.js';
import { createPortfolio, viewPortfolio } from '../controllers/portfolioController.js';

const router = express.Router();

router.get('/:userId/repos', async (req, res) => {
  const { userId } = req.params;
  try {
      const userRepos = await githubService.getUserRepos(userId);
    res.json(userRepos);
  } catch (error) {
    console.error('Error fetching user repositories:', error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/', createPortfolio);
router.get('/:id', viewPortfolio);

export default router;