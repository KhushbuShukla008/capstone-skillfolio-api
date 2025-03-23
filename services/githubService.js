import axios from 'axios';

const GITHUB_API_BASE_URL = 'https://api.github.com';

const getAuthHeaders = (accessToken) => {
  const token = accessToken || process.env.GITHUB_TOKEN;
  if (!token) {
    console.warn("Access token is missing. Ensure you provide one.");
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3+json',
    },
  };
};

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

      if (response.headers['x-ratelimit-remaining'] === '0') {
        const resetTime = response.headers['x-ratelimit-reset'];
        console.warn('Rate limit exceeded. Try again later.');
        await waitForRateLimitReset(resetTime);
        continue;
      }
      const linkHeader = response.headers['link'];
      hasNextPage = linkHeader && linkHeader.includes('rel="next"');

      results = [...results, ...response.data];
      page++;
    } catch (error) {
      console.error('Error fetching paginated data:', error.response ? error.response.data : error.message);
      throw error;
    }
  }

  return results;
};

const githubService = {
  getUserData: async (login, accessToken) => {
    try {
      const response = await axios.get(`${GITHUB_API_BASE_URL}/users/${login}`, getAuthHeaders(accessToken));
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error.response ? error.response.data : error.message);
      throw error;
    }
  },

  getUserRepos: async (login, accessToken) => {
    try {
      return await fetchAllPages(`${GITHUB_API_BASE_URL}/users/${login}/repos`, accessToken);
    } catch (error) {
      console.error('Error fetching user repositories:', error.response ? error.response.data : error.message);
      throw error;
    }
  },

  getRepoDetails: async (login, repo, accessToken) => {
    try {
      const response = await axios.get(`${GITHUB_API_BASE_URL}/repos/${login}/${repo}`, getAuthHeaders(accessToken));
      console.log('Access Token:', accessToken);
      return response.data;
    } catch (error) {
      console.error('Error fetching repository details:', error.response ? error.response.data : error.message);
      throw error;
    }
  },

  getRepoCommits: async (login, repo, accessToken) => {
    try {
      return await fetchAllPages(`${GITHUB_API_BASE_URL}/repos/${login}/${repo}/commits`, accessToken);
    } catch (error) {
      console.error('Error fetching repository commits:', error.response ? error.response.data : error.message);
      throw error;
    }
  },

  getRepoLanguages: async (login, repo, accessToken) => {
    try {
      const response = await axios.get(`${GITHUB_API_BASE_URL}/repos/${login}/${repo}/languages`, getAuthHeaders(accessToken));
      return response.data;
    } catch (error) {
      console.error('Error fetching repository languages:', error.response ? error.response.data : error.message);
      throw error;
    }
  },
};

export default githubService;
