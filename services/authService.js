import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';

const registerUser = async ({ username, email, password }) => {
const existingUser = await db('users').where({ email }).first();
if (existingUser) throw new Error('User already exists');

const hashedPassword = await bcrypt.hash(password, 10);
const [userId] = await db('users').insert({ username, email, password: hashedPassword });

return { id: userId, username, email };
};

const loginUser = async ({ email, password }) => {
const user = await db('users').where({ email }).first();
if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid credentials');
}

return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export default { registerUser, loginUser };
