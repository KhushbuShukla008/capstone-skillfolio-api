import express from 'express';
import githubService from '../services/githubService.js';

const router = express.Router();

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const savedRepos = await knex('projects').where({ user_id: userId });
    if (savedRepos.length > 0) {
      return res.json(savedRepos);
    } else {
      const githubRepos = await githubService.getUserRepos(userId);
    res.json(githubRepos);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;