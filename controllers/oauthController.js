import oauthService from '../services/oauthService.js';

const githubAuthCallback = async (req, res) => {
  try {
    const accessToken = await oauthService.exchangeCodeForToken(req.query.code);
    res.redirect(`http://localhost:3000/dashboard?access_token=${accessToken}`);
  } catch (error) {
    res.status(500).json({ error: 'GitHub OAuth failed' });
  }
};

export { githubAuthCallback };
