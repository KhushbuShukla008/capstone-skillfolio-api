import githubService from '../services/githubService.js';

const getAccessToken = (req) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        throw new Error('Authorization header missing');
    }

    const tokenParts = authorizationHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        throw new Error('Invalid authorization header format');
    }

    return tokenParts[1];
};

const getUserData = async (req, res) => {
    
    const { login } = req.params;
    console.log(`Fetching user data for login: ${login}`);
    try {
    const { accessToken } = getAccessToken(req);
    console.log("Using GitHub Access Token:", accessToken);
    if (!accessToken) {
        return res.status(401).json({ error: 'Access token required' });
    }
    
    const userData = await githubService.getUserData(login, accessToken);
    res.json(userData);
    } catch (error) {
    res.status(500).json({ error: 'Failed to fetch GitHub user data' });
    }
    };

const getUserRepos = async (req, res) => {
    const { login } = req.params;
    console.log(`Fetching user repositories for login: ${login}`);
    try {
    const accessToken = getAccessToken(req);
    console.log("Using GitHub Access Token:", accessToken);
    if (!accessToken) {
        return res.status(401).json({ error: 'Access token required' });
    }    
        const repos = await githubService.getUserRepos(login, accessToken);
        res.json(repos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getRepoDetails = async (req, res) => {
    const { login, repo } = req.params;
    console.log(`Fetching repository details for login: ${login}, repo: ${repo}`);
    try {
    const accessToken = getAccessToken(req);
    console.log("Using GitHub Access Token:", accessToken);
    if (!accessToken) {
    return res.status(401).json({ error: 'Access token required' });
    }
    
        const repoDetails = await githubService.getRepoDetails(login, repo, accessToken);
        res.status(200).json(repoDetails);
    } catch (error) {
        console.error('Error fetching repository details:', error);
        res.status(500).json({ error: error.message });
    }
};

const getRepoCommits = async (req, res) => {
    const { login, repo } = req.params;
    console.log(`Fetching repository commits for login: ${login}, repo: ${repo}`);
    try {
    const accessToken = getAccessToken(req);
    console.log("Using GitHub Access Token:", accessToken);
    if (!accessToken) {
    return res.status(401).json({ error: 'Access token required' });
    }    
        const commits = await githubService.getRepoCommits(login, repo, accessToken);
        res.json(commits);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getRepoLanguages = async (req, res) => {
    const { login, repo } = req.params;
    console.log(`Fetching repository commits for login: ${login}, repo: ${repo}`);
    try {
    const accessToken = getAccessToken(req);
    console.log("Using GitHub Access Token:", accessToken);
    if (!accessToken) {
    return res.status(401).json({ error: 'Access token required' });
    }    
        const languages = await githubService.getRepoLanguages(login, repo, accessToken);
        res.status(200).json(languages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { getUserData, getUserRepos, getRepoDetails, getRepoCommits, getRepoLanguages };
