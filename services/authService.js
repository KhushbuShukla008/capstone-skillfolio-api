import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';

const registerUser = async ({ username, email, password, githubUsername }) => {
const existingUser = await db('users').where({ email }).first();
if (existingUser) throw new Error('User already exists');

const hashedPassword = await bcrypt.hash(password, 10);
const [userId] = await db('users').insert({ username, email, password: hashedPassword, github_username: githubUsername });
const token = jwt.sign({ id: userId, username }, process.env.JWT_SECRET, { expiresIn: '5m' });
return { id: userId, username, email, githubUsername, token };
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

const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '5m' });
console.log('Login token and userId:', token, user.id, user.username, user.github_username);
return { token, userId: user.id, username: user.username, githubUsername: existingGithubUsername};
}catch (error) {
    console.error('Error in loginUser:', error);
    throw error;
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
