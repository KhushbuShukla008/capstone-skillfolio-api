import authService from '../services/authService.js';

const registerUser = async (req, res) => {
try {
    const user = await authService.register(req.body);
    res.status(201).json(user);
} catch (error) {
    res.status(400).json({ error: error.message });
}
};

const loginUser = async (req, res) => {
try {
    const token = await authService.login(req.body);
    res.status(200).json({ token });
} catch (error) {
    res.status(400).json({ error: error.message });
}
};

export { registerUser, loginUser };
