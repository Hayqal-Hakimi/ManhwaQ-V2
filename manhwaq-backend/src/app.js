import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import db from './config/database.js';
import { errorHandler } from './middleware/errorHandler.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import manhwaRoutes from './routes/manhwa.js';
import libraryRoutes from './routes/library.js';
import { seedManhwa } from './db/seedManhwa.js';

dotenv.config();

if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET is required. Copy .env.example to .env');
  process.exit(1);
}

const ensureAdmin = async () => {
  const existing = db
    .prepare('SELECT id FROM users WHERE email = ?')
    .get('admin');

  if (existing) return;

  const passwordHash = await bcrypt.hash('admin123', 12);
  const id = crypto.randomUUID();

  db.prepare(
    `INSERT INTO users (id, username, email, password_hash, role)
     VALUES (?, 'admin', 'admin', ?, 'admin')`
  ).run(id, passwordHash);

  console.log('Default admin created — email: admin | password: admin123');
};

await ensureAdmin();

const adminRow = db.prepare('SELECT id FROM users WHERE email = ?').get('admin');
seedManhwa(adminRow?.id || null);

const app = express();
const port = process.env.PORT || 3000;
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';

app.use(cors({ origin: corsOrigin, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(apiLimiter);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'ManhwaQ API running' });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/manhwa', manhwaRoutes);
app.use('/api/v1/library', libraryRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: 'NOT_FOUND',
    message: 'Endpoint not found',
  });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`ManhwaQ API listening on http://localhost:${port}`);
});
