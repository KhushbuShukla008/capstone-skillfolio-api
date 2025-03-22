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

const loginUser = async ({ email, password }) => {
const user = await db('users').where({ email }).first();
if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid credentials');
}
const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '5m' });
console.log('Login token and userId:', token, user.id);
return { token, userId: user.id };
};

export default { registerUser, loginUser };
