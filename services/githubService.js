import axios from 'axios';

const GITHUB_API_BASE_URL = 'https://api.github.com';

const githubService = {
  getUserData: async (username) => {
    const response = await axios.get(`${GITHUB_API_BASE_URL}/users/${username}`);
    return response.data;
  },

  getUserRepos: async (username) => {
    const response = await axios.get(`${GITHUB_API_BASE_URL}/users/${username}/repos`);
    return response.data;
  },

  getRepoDetails: async (username, repo) => {
    const response = await axios.get(`${GITHUB_API_BASE_URL}/repos/${username}/${repo}`);
    return response.data;
  },
};

export default githubService;