import oauthService from '../services/oauthService.js';

const githubAuthCallback = async (req, res) => {
  try {
    const code = req.query.code;
    console.log('Received code:', code);

    const { accessToken, userId } = await oauthService.getAccessToken(code);
    console.log('Access Token:', accessToken);
    console.log('User ID:', userId);

    const redirectUrl = req.headers.origin || 'http://localhost:5173';
    console.log("Redirecting to:", redirectUrl);

    return res.redirect(`${redirectUrl}/?access_token=${accessToken}&user_id=${userId}`);

  } catch (error) {
    console.error('Error during token exchange:', error.message);
    if (!res.headersSent) {
      res.status(500).json({ error: 'GitHub OAuth failed' });
    }
  }
};

export { githubAuthCallback };
