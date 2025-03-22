import authService from '../services/authService.js';
import { validationResult } from 'express-validator';

const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }
    
try {
    console.log('Register Request Body:', req.body); 
    const { username, email, password, githubUsername } = req.body;
    if (!username || !email || !password || !githubUsername) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const user = await authService.registerUser({ username, email, password, githubUsername });
    res.status(201).json({ user, token: user.token });
} catch (error) {
    res.status(400).json({ error: error.message });
}
};

const loginUser = async (req, res) => {
try {
    const { token, userId } = await authService.loginUser(req.body);
    res.status(200).json({ token, userId});
} catch (error) {
    res.status(400).json({ error: error.message });
}
};

export { registerUser, loginUser };
