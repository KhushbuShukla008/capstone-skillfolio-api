import githubService from '../services/githubService.js';

const getUserData = async (req, res) => {
    
    const { username } = req.params;
    const { accessToken } = req.user.authorization?.split(' ')[1];
    if (!accessToken) {
        return res.status(401).json({ error: 'Access token required' });
    }
    
    try {
    const userData = await githubService.getUserData(username, accessToken);
    res.json(userData);
    } catch (error) {
    res.status(500).json({ error: 'Failed to fetch GitHub user data' });
    }
    };

const getUserRepos = async (req, res) => {
    const { username } = req.params;
    const accessToken = req.headers.authorization?.split(' ')[1];
    if (!accessToken) {
        return res.status(401).json({ error: 'Access token required' });
      }
    try {
        const repos = await githubService.getUserRepos(username, accessToken);
        res.json(repos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getRepoDetails = async (req, res) => {
    const { username, repo } = req.params;
    const accessToken = req.headers.authorization?.split(' ')[1];

    if (!accessToken) {
    return res.status(401).json({ error: 'Access token required' });
    }
    try {
        const repoDetails = await githubService.getRepoDetails(username, repo, accessToken);
        res.json(repoDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getRepoCommits = async (req, res) => {
    const { username, repo } = req.params;
    const accessToken = req.headers.authorization?.split(' ')[1];

    if (!accessToken) {
    return res.status(401).json({ error: 'Access token required' });
    }

    try {
        const commits = await githubService.getRepoCommits(username, repo, accessToken);
        res.json(commits);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getRepoLanguages = async (req, res) => {
    const { username, repo } = req.params;
    const accessToken = req.headers.authorization?.split(' ')[1];

    if (!accessToken) {
    return res.status(401).json({ error: 'Access token required' });
    }
    try {
        const languages = await githubService.getRepoLanguages(username, repo, accessToken);
        res.json(languages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { getUserData, getUserRepos, getRepoDetails, getRepoCommits, getRepoLanguages };
