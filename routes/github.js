import express from 'express';
import authenticate from '../middleware/authenticate.js';
import { getUserData, getUserRepos, getRepoDetails, getRepoCommits, getRepoLanguages } from '../controllers/githubController.js';

const router = express.Router();
router.get('/user/:login', authenticate, getUserData);
router.get('/user/:login/repos', authenticate, getUserRepos);
router.get('/repos/:login/:repo', authenticate, getRepoDetails);
router.get('/repos/:login/:repo/commits', authenticate, getRepoCommits);
router.get('/repos/:login/:repo/languages', authenticate, getRepoLanguages);

export default router;
