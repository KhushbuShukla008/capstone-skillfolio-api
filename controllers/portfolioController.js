import db from '../config/db.js';
import githubService from '../services/githubService.js';
const isValidJson = (str) => {
    try {
        JSON.parse(str);
        return true;
    } catch (error) {
        return false;
    }
};

const createPortfolio = async (req, res) => {
    const { repo, title, description, login, language } = req.body;
    console.log("Parsed language:", language);
    try {
        let [user] = await db('users').where({ github_username: login });
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
    const repoDetails = await githubService.getRepoDetails(login, repo);

    const [portfolioId] = await db('projects').insert({
        user_id: user.id,
        repo_name: repo,
        project_title: title,
        description,
        tech_stack: JSON.stringify(language),  
        github_link: repoDetails.html_url,  
    }).returning('id');  
    
    res.status(201).json({
    id: portfolioId,
    repo,
    title,
    description,
    repoDetails,
    });
} catch (error) {
    console.error('Error creating portfolio:', error);
    res.status(500).json({ error: 'Failed to create portfolio' });
}
};

const viewPortfolio = async (req, res) => {
    const { id } = req.params;
    console.log("Request params:", req.params);
    try {
        if (!id) {
            return res.status(400).json({ error: 'Invalid portfolio ID' });
        }
        const projectExists = await db('projects').first();
        if (!projectExists) {
        return res.status(404).json({ error: 'No projects found in the database' });
        }

        // const projects = await db('projects')
        // .where({ user_id: parseInt(id) }); 
        
        const projects = await db('projects').where({ user_id: parseInt(id) });
        if (!projects || projects.length === 0) {
        return res.status(404).json({ error: 'No projects found for this user' });
        }
        const formattedProjects = projects.map(project => ({
            ...project,
            tech_stack: isValidJson(project.tech_stack) 
            ? JSON.parse(project.tech_stack) 
            : project.tech_stack.split(', ').map(lang => lang.trim())
        }));
        res.status(200).json(formattedProjects);
    } catch (error) {
        console.error('Error fetching portfolio:', error);
        res.status(500).json({ error: 'Failed to retrieve portfolio' });
    }
    };

export { createPortfolio, viewPortfolio };
