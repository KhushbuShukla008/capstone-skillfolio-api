import db from '../config/db.js';
import githubService from '../services/githubService.js';

const createPortfolio = async (req, res) => {
const { repo, title, description } = req.body;
const { username } = req.user;
const accessToken = req.headers.authorization?.split(' ')[1];

if (!accessToken) {
    return res.status(401).json({ error: 'Access token required' });
}

try {
    
    const repoDetails = await githubService.getRepoDetails(username, repo, accessToken);

    const [portfolioId] = await db('portfolios').insert({ repo, title, description, username });
    res.status(201).json({ id: portfolioId, repo, title, description, repoDetails });
} catch (error) {
    console.error('Error creating portfolio:', error);
    res.status(500).json({ error: 'Failed to create portfolio' });
}
};

export { createPortfolio };