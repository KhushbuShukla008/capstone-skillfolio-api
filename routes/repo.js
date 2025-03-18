import express from 'express';
import githubService from '../services/githubService.js';

const router = express.Router();

router.get('/:username/:repo', async (req, res) => {
  const { username, repo } = req.params;

  try {
    const repoDetails = await githubService.getRepoDetails(username, repo);
    res.json(repoDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;