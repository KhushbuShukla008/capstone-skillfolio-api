import axios from 'axios';
import { config } from 'dotenv';

config();

const GITHUB_API_BASE_URL = process.env.GITHUB_API_URL;
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

const getAuthHeaders = () => ({
  auth: {
    username: GITHUB_CLIENT_ID,
    password: GITHUB_CLIENT_SECRET,
  },
});

const githubService = {
  getUserData: async (username) => {
    try {
      const response = await axios.get(`${GITHUB_API_BASE_URL}/users/${username}`, getAuthHeaders());
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error.response ? error.response.data : error.message);
      throw error;
    }
  },

  getUserRepos: async (username) => {
    try {
      const response = await axios.get(`${GITHUB_API_BASE_URL}/users/${username}/repos`, {
        ...getAuthHeaders(),
        params: {
          per_page: 100,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user repositories:', error.response ? error.response.data : error.message);
      throw error;
    }
  },

  getRepoDetails: async (username, repo) => {
    try {
      const response = await axios.get(`${GITHUB_API_BASE_URL}/repos/${username}/${repo}`, getAuthHeaders());
      return response.data;
    } catch (error) {
      console.error('Error fetching repository details:', error.response ? error.response.data : error.message);
      throw error;
    }
  },

  getRepoCommits: async (username, repo) => {
    try {
      const response = await axios.get(`${GITHUB_API_BASE_URL}/repos/${username}/${repo}/commits`, {
        ...getAuthHeaders(),
        params: {
          per_page: 100,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching repository commits:', error.response ? error.response.data : error.message);
      throw error;
    }
  },

  getRepoLanguages: async (username, repo) => {
    try {
      const response = await axios.get(`${GITHUB_API_BASE_URL}/repos/${username}/${repo}/languages`, getAuthHeaders());
      return response.data;
    } catch (error) {
      console.error('Error fetching repository languages:', error.response ? error.response.data : error.message);
      throw error;
    }
  },
};

export default githubService;