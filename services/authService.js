import bcrypt from 'bcryptjs';
import db from '../config/db.js';
import axios from 'axios';

const registerUser = async ({ username, email, password, githubUsername }) => {
const existingUser = await db('users').where({ email }).first();
if (existingUser) throw new Error('User already exists');

const hashedPassword = await bcrypt.hash(password, 10);
const [userId] = await db('users').insert({ username, email, password: hashedPassword, github_username: githubUsername });
const githubToken = process.env.GITHUB_TOKEN;
    if (!githubToken) {
        throw new Error('GitHub token not found in .env file');
    }
return { id: userId, username, email, githubUsername, token: githubToken  };
};

const loginUser = async ({ email, password, githubUsername }) => {
    try{
const user = await db('skillfolio.users')
.select('id', 'username', 'password', 'github_username')
.where({ email: email.trim().toLowerCase() })
.first();

console.log('User fetched from DB:', user);
if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid credentials');
}
const existingGithubUsername = user.github_username || 'No GitHub Username';

if (githubUsername && existingGithubUsername !== githubUsername) {
    console.warn('GitHub username mismatch detected. Updating GitHub username.');
    await updateGithubUsername(user.id, githubUsername);
}

const githubToken = process.env.GITHUB_TOKEN;
        if (!githubToken) {
            throw new Error('GitHub token not found in .env file');
        }
const githubRepos = await fetchGithubRepos(githubToken, githubUsername);
console.log('GitHub repositories:', githubRepos);

console.log('Login token and userId:', githubToken);
return { githubToken, userId: user.id, username: user.username, githubUsername: existingGithubUsername, githubRepos};
}catch (error) {
    console.error('Error in loginUser:', error);
    throw error;
}
};

const fetchGithubRepos = async (token, githubUsername) => {
    try {
        const response = await axios.get(`https://api.github.com/users/${githubUsername}/repos`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching GitHub repositories:', error);
        throw new Error('Failed to fetch GitHub repositories');
    }
};

const updateGithubUsername = async (userId, githubUsername) => {
    try {
        const user = await db('users').where({ id: userId }).first();
        if (!user) throw new Error('User not found');
        
        await db('users').where({ id: userId }).update({ github_username: githubUsername });
        console.log('GitHub username updated successfully');
        
    } catch (error) {
        console.error('Error updating GitHub username:', error);
        throw new Error('Error updating GitHub username');
    }
};

export default { registerUser, loginUser, updateGithubUsername };
