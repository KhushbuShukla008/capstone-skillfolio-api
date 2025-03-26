import { generateResume, saveResumeToDB, generatePDF } from '../services/resumeService';

const generateResumeController = async (req, res) => {
    const { userId, templateType } = req.body;
    try {
        const resumeData = await generateResume(userId, templateType);
        res.json({ success: true, resumeData });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const saveResumeController = async (req, res) => {
    const { userId, resumeData } = req.body;
    try {
        const savedResume = await saveResumeToDB(userId, resumeData);
        res.json({ success: true, savedResume });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const downloadPDFController = async (req, res) => {
    const { resumeData } = req.body;
    try {
        const pdf = generatePDF(resumeData);
        res.setHeader('Content-Type', 'application/pdf');
        res.send(pdf);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export { generateResumeController, saveResumeController, downloadPDFController };
