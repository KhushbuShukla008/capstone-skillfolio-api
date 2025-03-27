import db from '../config/db.js'; 
import { generateResumeDescription } from './aiService.js'; 
import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const generateResume = async (requestData) => {
    console.log(requestData);
    
    try {
        const { userId, templateType, userProjects } = requestData;

        if (!userId) {
            throw new Error('User ID is missing.');
        }
        const user = await db('users').where('id', userId).first();

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const { github_username } = user;

        if (!Array.isArray(userProjects) || userProjects.length === 0) {
            throw new Error('User projects data is invalid.');
        }

        const resumeDescription = await generateResumeDescription({ body: { userProjects } });
        const resumeData = templateType === 'github'
            ? {
                user: { name: github_username, github: `https://github.com/${github_username}` },
                description: resumeDescription.description,
                projects: userProjects.map(project => ({
                    title: project.project_title,
                    description: project.description,
                    tech_stack: project.tech_stack,
                    github_link: project.github_link,
                })),
            }
            : {
                user: { name: github_username, skills: 'JavaScript, HTML, CSS' },
                description: resumeDescription.description,
                experience: userProjects,
            };

        return resumeData;

    } catch (error) {
        console.error('Error generating resume:', error);
        throw new Error('Failed to generate resume');
    }
};


const saveResumeToDB = async (userId, resumeData) => {
    try {
        const [resumeId] = await db('resumes').insert({
            user_id: userId,
            resume_data: resumeData,
            version: 1,
        }).returning('id');
        return resumeId;
    } catch (error) {
        console.error('Error saving resume:', error);
        throw new Error('Failed to save resume');
    }
};

const generatePDF = (resumeData) => {
    try{
    console.log("Received resumeData:", resumeData);
    if (!resumeData || !resumeData.projects) {
        throw new Error("Invalid resume data. Projects not found.");
    }
    const outputDir = path.join(__dirname, '..');
    const filePath = path.join(outputDir, 'output_resume.pdf');
    
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
        console.log(`Directory created at: ${outputDir}`);
    }
    const doc = new PDFDocument();
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    doc.fontSize(25).text('My Portfolio', { align: 'center' });
    doc.moveDown();

    doc.fontSize(14).text(resumeData.description|| 'No description available.');
    doc.moveDown();

    doc.fontSize(18).text('Projects', { align: 'left' });
    doc.moveDown();
    if (resumeData.projects.length > 0) {
    resumeData.projects.map(project => {
        doc.fontSize(14).text(`Project: ${project.title || 'N/A'}`);
        doc.moveDown();
        doc.fontSize(12).text(`Description: ${project.description|| 'N/A'}`);
        doc.fontSize(12).text(`Tech Stack: ${project.tech_stack|| 'N/A'}`);
        doc.fontSize(12).text(`GitHub Link: ${project.github_link|| 'N/A'}`);
        doc.moveDown();
    });
    } else {
        doc.fontSize(14).text('No projects available.');
    }

    doc.end();
    writeStream.on('finish', () => {
        console.log(`PDF generated successfully at: ${filePath}`);
    });

    writeStream.on('error', (error) => {
        console.error("Error writing PDF:", error);
    });
    return filePath;
} catch (error) {
    console.error("Error generating PDF:", error.message);
    throw new Error("Failed to generate PDF.");
}
};

export { generateResume, saveResumeToDB, generatePDF };
