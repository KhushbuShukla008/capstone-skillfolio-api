import express from 'express';
import { githubAuthCallback } from '../controllers/oauthController.js';

const router = express.Router();

router.get('/github', (req, res) => {
const clientId = process.env.GITHUB_CLIENT_ID;
const redirectUri = process.env.GITHUB_REDIRECT_URI;

const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=repo`;
res.redirect(githubAuthUrl);
});

router.get('/github/callback', githubAuthCallback);

export default router;
