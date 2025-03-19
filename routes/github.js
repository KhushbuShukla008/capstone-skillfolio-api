import express from 'express';
import { getUserData, getUserRepos, getRepoDetails, getRepoCommits, getRepoLanguages } from '../controllers/githubController.js';

const router = express.Router();
router.get('/user/:username', getUserData);
router.get('/user/:username/repos', getUserRepos);
router.get('/repos/:username/:repo', getRepoDetails);
router.get('/repos/:username/:repo/commits', getRepoCommits);
router.get('/repos/:username/:repo/languages', getRepoLanguages);

export default router;
