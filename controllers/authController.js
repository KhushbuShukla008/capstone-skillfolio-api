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
    const { email, password, githubUsername } = req.body;
    const { token, userId, username, githubUsername: existingGithubUsername} = await authService.loginUser({email, password, githubUsername });

    if (githubUsername && existingGithubUsername !== githubUsername) {
        console.warn('GitHub username mismatch detected. Updating GitHub username.');
        await authService.updateGithubUsername(userId, githubUsername);
    }
    
    res.status(200).json({ token, 
        user: { 
            id: userId, 
            username, 
            githubUsername: existingGithubUsername || 'No GitHub Username',
            loginMethod: githubUsername ? 'GitHub OAuth' : 'Email & Password' }});
} catch (error) {
    res.status(400).json({ error: error.message });
}
};

export { registerUser, loginUser };
