import { generateResume, saveResumeToDB, generatePDF } from '../services/resumeService.js';

const generateResumeController = async (req, res) => {
    try {
        const { userId, templateType, userProjects } = req.body;
        if (!userId || !templateType) {
            return res.status(400).send('Missing required fields: userId or templateType');
        }

        if (!userProjects || !Array.isArray(userProjects) || userProjects.length === 0) {
            return res.status(400).send('Invalid or empty userProjects array');
        }

        const resumeData = await generateResume({userId, templateType, userProjects});
        res.json({ success: true, resumeData });
    } catch (error) {
        console.error("Error generating resume:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const saveResumeController = async (req, res) => {
    const { userId, resumeData } = req.body;
    try {
        if (!resumeData || Object.keys(resumeData).length === 0) {
            return res.status(400).send('Resume data is required');
        }

        const savedResume = await saveResumeToDB(userId, resumeData);
        res.json({ success: true, savedResume });
    } catch (error) {
        console.error("Error saving resume:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const downloadPDFController = async (req, res) => {
    const { resumeData } = req.body;
    try {
        const pdf = generatePDF(resumeData);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="resume.pdf"');
        res.download(pdf);
    } catch (error) {
        console.error("Error generating PDF:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { generateResumeController, saveResumeController, downloadPDFController };
