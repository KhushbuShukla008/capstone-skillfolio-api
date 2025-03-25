import db from '../config/db.js';
import githubService from '../services/githubService.js';

const createPortfolio = async (req, res) => {
    const { repo, title, description, login } = req.body;
    try {
        let [user] = await db('users').where({ github_username: login });
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
    const repoDetails = await githubService.getRepoDetails(login, repo);

    const [portfolioId] = await db('projects').insert({
        user_id: user.id,
        repo_name: repo,
        project_name: title,
        description,
        tech_stack: repoDetails.language,  
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

    try {
        const project = await db('projects')
        .where({ id })
        .first(); 
        if (!project) {
        return res.status(404).json({ error: 'Portfolio not found' });
        }
        res.status(200).json(project);
    } catch (error) {
        console.error('Error fetching portfolio:', error);
        res.status(500).json({ error: 'Failed to retrieve portfolio' });
    }
    };

export { createPortfolio, viewPortfolio };
