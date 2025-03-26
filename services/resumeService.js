import db from '../config/db.js'; 
import { generateDescription } from './aiService.js'; 
import fs from fs;
import PDFDocument from 'pdfkit';

const generateResume = async (userId, templateType) => {
    try {
        const userProjects = await db('projects').where({ user_id: userId });

        if (!userProjects.length) {
            throw new Error('No projects found for this user.');
        }
        let resumeData;
        if (templateType === 'github') {
            const projectsWithDescription = [];
            for (const project of userProjects) {
                const description = await generateDescription(project.repo_name);
                projectsWithDescription.push({
                    title: project.project_title,
                    description: description, 
                    tech_stack: project.tech_stack,
                    github_link: project.github_link,
                });
            }
            resumeData = {
                user: { name: 'User Name', github: 'https://github.com/username' },
                projects: projectsWithDescription,
            };
        } else {
            resumeData = {
            user: { name: 'User Name', skills: 'JavaScript, HTML, CSS' },
                experience: userProjects,
        };
        }
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
    const filePath = 'resume.pdf'; 
    const doc = new PDFDocument();

    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(25).text('My Resume', { align: 'center' });

    doc.fontSize(18).text('Projects', { align: 'left' });
    resumeData.content.projects.forEach(project => {
        doc.fontSize(14).text(`Project: ${project.project_title}`);
        doc.fontSize(12).text(`Description: ${project.description}`);
        doc.fontSize(12).text(`Tech Stack: ${project.tech_stack}`);
        doc.fontSize(12).text(`GitHub Link: ${project.github_link}`);
        doc.moveDown();
    });

    doc.end();

    return filePath;
};

export { generateResume, saveResumeToDB, generatePDF };
