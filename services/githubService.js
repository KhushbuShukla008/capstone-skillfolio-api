import axios from 'axios';

const GITHUB_API_BASE_URL = 'https://api.github.com';

const getAuthHeaders = (accessToken) => ({
  headers: {
    Authorization: `Bearer ${accessToken}`,
    Accept: 'application/vnd.github.v3+json',
  },
});

const fetchAllPages = async (url, accessToken) => {
  let page = 1;
  let results = [];
  let hasNextPage = true;

  while (hasNextPage) {
    try {
      const response = await axios.get(url, {
        ...getAuthHeaders(accessToken),
        params: { per_page: 100, page },
      });

      results = [...results, ...response.data];
      hasNextPage = response.data.length === 100;
      page++;
    } catch (error) {
      console.error('Error fetching paginated data:', error.response ? error.response.data : error.message);
      throw error;
    }
  }

  return results;
};

const githubService = {
  getUserData: async (username, accessToken) => {
    try {
      const response = await axios.get(`${GITHUB_API_BASE_URL}/users/${username}`, getAuthHeaders(accessToken));
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error.response ? error.response.data : error.message);
      throw error;
    }
  },

  getUserRepos: async (username, accessToken) => {
    try {
      return await fetchAllPages(`${GITHUB_API_BASE_URL}/users/${username}/repos`, accessToken);
    } catch (error) {
      console.error('Error fetching user repositories:', error.response ? error.response.data : error.message);
      throw error;
    }
  },

  getRepoDetails: async (username, repo, accessToken) => {
    try {
      const response = await axios.get(`${GITHUB_API_BASE_URL}/repos/${username}/${repo}`, getAuthHeaders(accessToken));
      return response.data;
    } catch (error) {
      console.error('Error fetching repository details:', error.response ? error.response.data : error.message);
      throw error;
    }
  },

  getRepoCommits: async (username, repo, accessToken) => {
    try {
      return await fetchAllPages(`${GITHUB_API_BASE_URL}/repos/${username}/${repo}/commits`, accessToken);
    } catch (error) {
      console.error('Error fetching repository commits:', error.response ? error.response.data : error.message);
      throw error;
    }
  },

  getRepoLanguages: async (username, repo, accessToken) => {
    try {
      const response = await axios.get(`${GITHUB_API_BASE_URL}/repos/${username}/${repo}/languages`, getAuthHeaders(accessToken));
      return response.data;
    } catch (error) {
      console.error('Error fetching repository languages:', error.response ? error.response.data : error.message);
      throw error;
    }
  },
};

export default githubService;
