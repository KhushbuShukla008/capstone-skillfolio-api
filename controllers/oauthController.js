import oauthService from '../services/oauthService.js';
import db from '../config/db.js';

const findUserByGithubLogin = async (githubLogin) => {
  return await db('users').where({ github_username: githubLogin }).first();
};

const createUserWithGithubData = async (userId, githubLogin, githubAvatarUrl) => {
  return await db('users').insert({
    username: githubLogin,
    email: '',
    password: '',
    github_username: githubLogin,
    github_user_id: userId, 
    avatar_url: githubAvatarUrl || '',
  }).returning('*');
};

const githubAuthCallback = async (req, res) => {
  try {
    const code = req.query.code;
    console.log('Received code:', code);

    const { accessToken, userId, githubLogin, avatar_url} = await oauthService.getAccessToken(code);
    console.log('Access Token:', accessToken);
    console.log('User ID:', userId);
    console.log('GitHub Login (Username):', githubLogin);
    let user = await findUserByGithubLogin(githubLogin);
    if (!user) {
      console.log('User not found in the database. Creating a new user.');
      user = await createUserWithGithubData(userId, githubLogin, avatar_url); 
    }
    const redirectUrl = req.headers.origin || 'http://localhost:5173';
    console.log("Redirecting to:", redirectUrl);

    return res.redirect(`${redirectUrl}/?access_token=${accessToken}&user_id=${userId}&github_username=${githubLogin}`);

  } catch (error) {
    console.error('Error during token exchange:', error.message);
    if (!res.headersSent) {
      res.status(500).json({ error: 'GitHub OAuth failed' });
    }
  }
};

export { githubAuthCallback };
