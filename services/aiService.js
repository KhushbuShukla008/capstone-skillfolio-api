import OpenAI from 'openai';

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const generateResumeDescription = async (req, res) => {
    const { userProjects } = req.body;

    if (!userProjects || userProjects.length === 0) {
        return res.status(400).json({ error: 'At least one project is required to generate a description.' });
    }

    try {
        const projectsDescription = userProjects.map(project => {
            return `Project: ${project.project_title}\nDescription: ${project.description}\nTech Stack: ${project.tech_stack}\nGitHub Link: ${project.github_link}`;
        }).join('\n\n');

        const skills = userProjects.map(project => project.tech_stack).join(', ');

        const prompt = `
        Based on the following projects and skills, create a professional resume summary that highlights the user's experience and capabilities. Include a brief introduction, mention the tech stack, and provide a summary of the user's expertise.

        Projects:
        ${projectsDescription}

        Skills:
        ${skills}
        `;

        const completion = await client.chat.completions.create({
            model: 'gpt-4',
            messages: [{
                role: 'user',
                content: prompt,
            }],
            max_tokens: 200, 
        });

        if (completion.choices && completion.choices.length > 0) {
            const resumeDescription = completion.choices[0].message.content.trim();
            res.json({ description: resumeDescription });
        } else {
            throw new Error('No valid description returned.');
        }
    } catch (err) {
        console.error('Error generating resume description:', err);
        res.status(500).json({ error: 'Failed to generate resume description', details: err.message || err });
    }
};
