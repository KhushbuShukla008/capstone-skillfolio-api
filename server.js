import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import knex from 'knex';
import knexConfig from './knexfile.js';
import 'dotenv/config';
import authRoutes from './routes/auth.js';
import oauthRoutes from './routes/oauth.js';
import portfolioRoutes from './routes/portfolio.js';
import resumeRoutes from './routes/resume.js';
import repoRoutes from './routes/repo.js';
import githubRoutes from './routes/github.js';
import { aiRoutes } from './routes/aiRoutes.js';
const db = knex(knexConfig.development);

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/oauth', oauthRoutes);
app.use('/portfolio', portfolioRoutes);
app.use('/resume', resumeRoutes);
app.use('/repo', repoRoutes);
app.use('/github', githubRoutes);
app.use('/ai', aiRoutes);

app.get('/', (req, res) => {
res.send('Welcome to Skillfolio API');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});