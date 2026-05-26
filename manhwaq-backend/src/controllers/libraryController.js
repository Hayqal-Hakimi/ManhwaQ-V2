import crypto from 'crypto';
import db from '../config/database.js';
import { parseGenre } from '../utils/manhwa.js';

const findManhwaByIdOrSlug = (idOrSlug) =>
  db.prepare('SELECT * FROM manhwa WHERE id = ? OR slug = ?').get(idOrSlug, idOrSlug);

const formatLibraryRow = (row) => ({
  id: row.id,
  manhwa_id: row.manhwa_id,
  status: row.status,
  last_chapter_read: row.last_chapter_read,
  progress_percent: row.progress_percent,
  added_at: row.added_at,
  updated_at: row.updated_at,
  title: row.title,
  slug: row.slug,
  synopsis: row.synopsis,
  genre: parseGenre(row.genre),
  manhwa_status: row.manhwa_status,
});

export const getLibrary = (req, res, next) => {
  try {
    const { status, sort = 'recently_added', search } = req.query;

    let where = 'WHERE l.user_id = ?';
    const params = [req.user.id];

    if (status) {
      where += ' AND l.status = ?';
      params.push(status);
    }

    if (search) {
      where += ' AND m.title LIKE ?';
      params.push(`%${search}%`);
    }

    let orderBy = 'l.added_at DESC';
    if (sort === 'title') orderBy = 'm.title ASC';
    if (sort === 'progress') orderBy = 'l.progress_percent DESC';

    const rows = db
      .prepare(
        `SELECT l.*, m.title, m.slug, m.synopsis, m.genre, m.status AS manhwa_status
         FROM library l
         INNER JOIN manhwa m ON l.manhwa_id = m.id
         ${where}
         ORDER BY ${orderBy}`
      )
      .all(...params);

    res.status(200).json({
      data: rows.map(formatLibraryRow),
      message: 'Library loaded',
    });
  } catch (err) {
    next(err);
  }
};

export const addToLibrary = (req, res, next) => {
  try {
    const { manhwa_id, status = 'reading' } = req.body;

    if (!manhwa_id) {
      res.status(400).json({
        error: 'VALIDATION_ERROR',
        message: 'manhwa_id is required',
      });
      return;
    }

    const manhwa = findManhwaByIdOrSlug(manhwa_id);
    if (!manhwa) {
      res.status(404).json({
        error: 'NOT_FOUND',
        message: 'Manhwa not found',
      });
      return;
    }

    const existing = db
      .prepare('SELECT id FROM library WHERE user_id = ? AND manhwa_id = ?')
      .get(req.user.id, manhwa.id);

    if (existing) {
      res.status(409).json({
        error: 'ALREADY_IN_LIBRARY',
        message: 'Manhwa already in library',
      });
      return;
    }

    const id = crypto.randomUUID();
    db.prepare(
      `INSERT INTO library (id, user_id, manhwa_id, status)
       VALUES (?, ?, ?, ?)`
    ).run(id, req.user.id, manhwa.id, status);

    const row = db
      .prepare(
        `SELECT l.*, m.title, m.slug, m.synopsis, m.genre, m.status AS manhwa_status
         FROM library l
         INNER JOIN manhwa m ON l.manhwa_id = m.id
         WHERE l.id = ?`
      )
      .get(id);

    res.status(201).json({
      data: formatLibraryRow(row),
      message: 'Added to library',
    });
  } catch (err) {
    next(err);
  }
};

export const updateLibrary = (req, res, next) => {
  try {
    const manhwa = findManhwaByIdOrSlug(req.params.manhwa_id);
    if (!manhwa) {
      res.status(404).json({ error: 'NOT_FOUND', message: 'Manhwa not found' });
      return;
    }

    const entry = db
      .prepare('SELECT * FROM library WHERE user_id = ? AND manhwa_id = ?')
      .get(req.user.id, manhwa.id);

    if (!entry) {
      res.status(404).json({ error: 'NOT_FOUND', message: 'Not in library' });
      return;
    }

    const { status, last_chapter_read, progress_percent } = req.body;
    const progress = progress_percent !== undefined
      ? Math.min(100, Math.max(0, parseInt(progress_percent, 10) || 0))
      : entry.progress_percent;

    db.prepare(
      `UPDATE library SET
        status = COALESCE(?, status),
        last_chapter_read = COALESCE(?, last_chapter_read),
        progress_percent = ?,
        updated_at = datetime('now')
       WHERE id = ?`
    ).run(
      status ?? entry.status,
      last_chapter_read ?? entry.last_chapter_read,
      progress,
      entry.id
    );

    const row = db
      .prepare(
        `SELECT l.*, m.title, m.slug, m.synopsis, m.genre, m.status AS manhwa_status
         FROM library l INNER JOIN manhwa m ON l.manhwa_id = m.id WHERE l.id = ?`
      )
      .get(entry.id);

    res.status(200).json({
      data: formatLibraryRow(row),
      message: 'Library updated',
    });
  } catch (err) {
    next(err);
  }
};

export const removeFromLibrary = (req, res, next) => {
  try {
    const manhwa = findManhwaByIdOrSlug(req.params.manhwa_id);
    if (!manhwa) {
      res.status(404).json({ error: 'NOT_FOUND', message: 'Manhwa not found' });
      return;
    }

    const result = db
      .prepare('DELETE FROM library WHERE user_id = ? AND manhwa_id = ?')
      .run(req.user.id, manhwa.id);

    if (result.changes === 0) {
      res.status(404).json({ error: 'NOT_FOUND', message: 'Not in library' });
      return;
    }

    res.status(200).json({ message: 'Removed from library' });
  } catch (err) {
    next(err);
  }
};
