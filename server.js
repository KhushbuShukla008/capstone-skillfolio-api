import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import knex from 'knex';
import knexConfig from './knexfile.js';
import githubService from './githubService.js';
import 'dotenv/config';

const db = knex(knexConfig.development);

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to Skillfolio API');
});

app.get('/users', async (req, res) => {
  try {
    const users = await db('users').select('*');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/github/user/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const userData = await githubService.getUserData(username);
    res.json(userData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/github/user/:username/repos', async (req, res) => {
  const { username } = req.params;
  try {
    const userRepos = await githubService.getUserRepos(username);
    res.json(userRepos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/github/user/:username/repos/:repo', async (req, res) => {
  const { username, repo } = req.params;
  try {
    const repoDetails = await githubService.getRepoDetails(username, repo);
    res.json(repoDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});