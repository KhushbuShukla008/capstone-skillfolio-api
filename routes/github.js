import express from 'express';
import githubService from '../services/githubService.js';

const router = express.Router();


router.get('/user/:username/repos', async (req, res) => {
const { username } = req.params;
try {
    const repos = await githubService.getUserRepos(username);
    res.json(repos);
} catch (error) {
    res.status(500).json({ error: error.message });
}
});


router.get('/repos/:username/:repo', async (req, res) => {
const { username, repo } = req.params;
try {
    const repoDetails = await githubService.getRepoDetails(username, repo);
    res.json(repoDetails);
} catch (error) {
    res.status(500).json({ error: error.message });
}
});


router.get('/repos/:username/:repo/commits', async (req, res) => {
const { username, repo } = req.params;
try {
    const commits = await githubService.getRepoCommits(username, repo);
    res.json(commits);
} catch (error) {
    res.status(500).json({ error: error.message });
}
});


router.get('/repos/:username/:repo/languages', async (req, res) => {
const { username, repo } = req.params;
try {
    const languages = await githubService.getRepoLanguages(username, repo);
    res.json(languages);
} catch (error) {
    res.status(500).json({ error: error.message });
}
});

export default router;