import express from 'express';
import { generateResumeController, saveResumeController, downloadPDFController } from '../controllers/resumeController.js';

const router = express.Router();

router.post('/generate', generateResumeController);  
router.post('/save', saveResumeController);          
router.post('/download', downloadPDFController); 

export default router;
