import githubService from '../services/githubService.js';

const getUserData = async (req, res) => {
    
    const { login } = req.params;
    console.log(`Fetching user data for login: ${login}`);
    const { accessToken } = req.headers.authorization?.split(' ')[1];
    console.log("Using GitHub Access Token:", accessToken);
    if (!accessToken) {
        return res.status(401).json({ error: 'Access token required' });
    }
    
    try {
    const userData = await githubService.getUserData(login, accessToken);
    res.json(userData);
    } catch (error) {
    res.status(500).json({ error: 'Failed to fetch GitHub user data' });
    }
    };

const getUserRepos = async (req, res) => {
    const { login } = req.params;
    console.log(`Fetching user repositories for login: ${login}`);
    const accessToken = req.headers.authorization?.split(' ')[1];
    console.log("Using GitHub Access Token:", accessToken);
    if (!accessToken) {
        return res.status(401).json({ error: 'Access token required' });
    }
    try {
        const repos = await githubService.getUserRepos(login, accessToken);
        res.json(repos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getRepoDetails = async (req, res) => {
    const { login, repo } = req.params;
    const accessToken = req.headers.authorization?.split(' ')[1];
    console.log("Using GitHub Access Token:", accessToken);
    if (!accessToken) {
    return res.status(401).json({ error: 'Access token required' });
    }
    try {
        const repoDetails = await githubService.getRepoDetails(login, repo, accessToken);
        res.status(200).json(repoDetails);
    } catch (error) {
        console.error('Error fetching repository details:', error);
        res.status(500).json({ error: error.message });
    }
};

const getRepoCommits = async (req, res) => {
    const { login, repo } = req.params;
    const accessToken = req.headers.authorization?.split(' ')[1];
    console.log("Using GitHub Access Token:", accessToken);
    if (!accessToken) {
    return res.status(401).json({ error: 'Access token required' });
    }
    console.log(`Fetching repo commits for login: ${login}, repo: ${repo}`);
    try {
        const commits = await githubService.getRepoCommits(login, repo, accessToken);
        res.json(commits);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getRepoLanguages = async (req, res) => {
    const { login, repo } = req.params;
    const accessToken = req.headers.authorization?.split(' ')[1];
    console.log("Using GitHub Access Token:", accessToken);
    if (!accessToken) {
    return res.status(401).json({ error: 'Access token required' });
    }
    console.log(`Fetching repo languages for login: ${login}, repo: ${repo}`);
    try {
        const languages = await githubService.getRepoLanguages(login, repo, accessToken);
        res.status(200).json(languages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { getUserData, getUserRepos, getRepoDetails, getRepoCommits, getRepoLanguages };
