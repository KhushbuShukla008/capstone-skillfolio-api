import axios from 'axios';
import dotenv from 'dotenv';
import db from '../config/db.js';

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
        const { id: githubUserId, login: githubLogin, email: githubEmail, name, avatar_url } = userResponse.data;
        let user = await db('users').where({ github_username: githubLogin }).first();
        if (!user && githubEmail) {
            user = await db('users').where({ email: githubEmail }).first();
            if (user) {
                await db('users').where({ id: user.id }).update({ github_username: githubLogin });
            } else {
                await db('users').insert({
                    username: name || githubLogin, 
                    email: githubEmail || '', 
                    password: '', 
                    github_username: githubLogin,
                    // avatar_url: avatar_url || '', 
                    github_user_id: githubUserId
                }).returning('*');
                user = newUser;
            }
        }
        if (!user) {
            user [newUser]= await db('users').insert({
                username: name || githubLogin, 
                email: githubEmail || '', 
                password: '', 
                github_username: githubLogin,
                // avatar_url: avatar_url || '', 
                github_user_id: githubUserId 
            }).returning('*');  
            user = newUser;  
        }


    return { accessToken, userId: user.id, githubLogin, githubUserId };
    }   catch (error) {
    console.error('Error getting access token:', error.response ? error.response.data : error.message);
    throw error;
}
};

export default { getAccessToken };