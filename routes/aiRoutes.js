import express from 'express';
const router = express.Router();
import { generateDescription } from '../controllers/aiController.js';

router.post('/description', generateDescription);

export { router as aiRoutes };
