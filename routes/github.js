import express from 'express';
import { getUserData, getUserRepos, getRepoDetails, getRepoCommits, getRepoLanguages } from '../controllers/githubController.js';

const router = express.Router();
router.get('/user/:login', getUserData);
router.get('/user/:login/repos', getUserRepos);
router.get('/repos/:login/:repo', getRepoDetails);
router.get('/repos/:login/:repo/commits', getRepoCommits);
router.get('/repos/:login/:repo/languages', getRepoLanguages);

export default router;
