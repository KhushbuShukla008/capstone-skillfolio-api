import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GITHUB_REDIRECT_URI = process.env.GITHUB_REDIRECT_URI;

const getAccessToken = async (code) => {
try {
    const response = await axios.post('https://github.com/login/oauth/access_token', {
    client_id: GITHUB_CLIENT_ID,
    client_secret: GITHUB_CLIENT_SECRET,
    code,
    redirect_uri: GITHUB_REDIRECT_URI,
    }, {
    headers: { Accept: 'application/json' },
    });

    return response.data.access_token;
} catch (error) {
    console.error('Error getting access token:', error.response ? error.response.data : error.message);
    throw error;
}
};

export default getAccessToken;