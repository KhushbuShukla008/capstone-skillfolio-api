import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import knex from 'knex';
import knexConfig from './knexfile.js';
import 'dotenv/config';
import authRoutes from './routes/auth.js';
import portfolioRoutes from './routes/portfolio.js';
import resumeRoutes from './routes/resume.js';
import repoRoutes from './routes/repo.js';
import githubRoutes from './routes/github.js';

const db = knex(knexConfig.development);

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/portfolio', portfolioRoutes);
app.use('/resume', resumeRoutes);
app.use('/repo', repoRoutes);
app.use('/github', githubRoutes);

app.get('/', (req, res) => {
res.send('Welcome to Skillfolio API');
});

app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});