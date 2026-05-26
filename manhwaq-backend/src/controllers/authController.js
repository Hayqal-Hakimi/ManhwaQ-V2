import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import db from '../config/database.js';
import { sanitizeUser } from '../utils/user.js';

const signToken = (user) =>
  jwt.sign(
    { sub: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({
        error: 'VALIDATION_ERROR',
        message: 'Username, email, and password are required',
      });
      return;
    }

    if (password.length < 8) {
      res.status(400).json({
        error: 'VALIDATION_ERROR',
        message: 'Password must be at least 8 characters',
      });
      return;
    }

    const existing = db
      .prepare('SELECT id FROM users WHERE email = ? OR username = ?')
      .get(email, username);

    if (existing) {
      res.status(409).json({
        error: 'DUPLICATE',
        message: 'Email or username already exists',
      });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const id = crypto.randomUUID();

    db.prepare(
      `INSERT INTO users (id, username, email, password_hash, role)
       VALUES (?, ?, ?, ?, 'user')`
    ).run(id, username, email, passwordHash);

    const user = sanitizeUser(
      db.prepare('SELECT * FROM users WHERE id = ?').get(id)
    );

    res.status(201).json({
      data: { user },
      message: 'Account created successfully',
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        error: 'VALIDATION_ERROR',
        message: 'Email and password are required',
      });
      return;
    }

    const row = db
      .prepare('SELECT * FROM users WHERE email = ? OR username = ?')
      .get(email, email);

    if (!row) {
      res.status(401).json({
        error: 'INVALID_CREDENTIALS',
        message: 'Invalid email or password',
      });
      return;
    }

    const valid = await bcrypt.compare(password, row.password_hash);

    if (!valid) {
      res.status(401).json({
        error: 'INVALID_CREDENTIALS',
        message: 'Invalid email or password',
      });
      return;
    }

    const user = sanitizeUser(row);
    const token = signToken(user);

    res.status(200).json({
      data: { token, user },
      message: 'Logged in successfully',
    });
  } catch (err) {
    next(err);
  }
};

export const logout = (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
};
