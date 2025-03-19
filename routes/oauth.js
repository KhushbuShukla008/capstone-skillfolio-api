import express from 'express';
import { githubAuthCallback } from '../controllers/oauthController.js';

const router = express.Router();

router.get('/github/callback', githubAuthCallback);

export default router;
