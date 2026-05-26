import bcrypt from 'bcrypt';
import db from '../config/database.js';
import { sanitizeUser } from '../utils/user.js';

export const getMe = (req, res, next) => {
  try {
    const row = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);

    if (!row) {
      res.status(404).json({
        error: 'NOT_FOUND',
        message: 'User not found',
      });
      return;
    }

    res.status(200).json({
      data: sanitizeUser(row),
      message: 'Profile loaded',
    });
  } catch (err) {
    next(err);
  }
};

export const getUserById = (req, res, next) => {
  try {
    const row = db.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id);

    if (!row) {
      res.status(404).json({
        error: 'NOT_FOUND',
        message: 'User not found',
      });
      return;
    }

    if (row.is_private && req.user?.id !== row.id) {
      res.status(403).json({
        error: 'PRIVATE_PROFILE',
        message: 'This profile is private',
      });
      return;
    }

    res.status(200).json({
      data: sanitizeUser(row),
      message: 'User loaded',
    });
  } catch (err) {
    next(err);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { current_password, new_password } = req.body;

    if (!current_password || !new_password) {
      res.status(400).json({
        error: 'VALIDATION_ERROR',
        message: 'current_password and new_password are required',
      });
      return;
    }

    if (new_password.length < 8) {
      res.status(400).json({
        error: 'VALIDATION_ERROR',
        message: 'New password must be at least 8 characters',
      });
      return;
    }

    const row = db.prepare('SELECT password_hash FROM users WHERE id = ?').get(req.user.id);
    const valid = await bcrypt.compare(current_password, row.password_hash);

    if (!valid) {
      res.status(401).json({
        error: 'INVALID_CREDENTIALS',
        message: 'Current password is incorrect',
      });
      return;
    }

    const passwordHash = await bcrypt.hash(new_password, 12);
    db.prepare(
      `UPDATE users SET password_hash = ?, updated_at = datetime('now') WHERE id = ?`
    ).run(passwordHash, req.user.id);

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (err) {
    next(err);
  }
};
