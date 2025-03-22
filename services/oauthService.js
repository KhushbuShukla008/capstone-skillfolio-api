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
    console.log('GitHub response:', response.data);
    const accessToken = response.data.access_token;
    
    const userResponse = await axios.get('https://api.github.com/user', {
        headers: { Authorization: `token ${accessToken}` },
    });
        console.log('GitHub user response:', userResponse.data);
        const userId = userResponse.data.id;

    return { accessToken, userId };
    }   catch (error) {
    console.error('Error getting access token:', error.response ? error.response.data : error.message);
    throw error;
}
};

export default { getAccessToken };