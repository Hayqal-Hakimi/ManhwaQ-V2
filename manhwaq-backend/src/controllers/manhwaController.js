import crypto from 'crypto';
import db from '../config/database.js';
import { formatChapter, formatManhwa, slugify } from '../utils/manhwa.js';

const findManhwaRow = (idOrSlug) =>
  db
    .prepare('SELECT * FROM manhwa WHERE id = ? OR slug = ?')
    .get(idOrSlug, idOrSlug);

const getChaptersForManhwa = (manhwaId) =>
  db
    .prepare(
      `SELECT * FROM chapters WHERE manhwa_id = ?
       ORDER BY chapter_number DESC`
    )
    .all(manhwaId);

export const listManhwa = (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 20));
    const offset = (page - 1) * limit;
    const { genre, status, search } = req.query;

    let where = 'WHERE 1=1';
    const params = [];

    if (genre) {
      where += ' AND genre LIKE ?';
      params.push(`%"${genre.toLowerCase()}"%`);
    }

    if (status) {
      where += ' AND status = ?';
      params.push(status);
    }

    if (search) {
      where += ' AND (title LIKE ? OR synopsis LIKE ?)';
      const term = `%${search}%`;
      params.push(term, term);
    }

    const total = db
      .prepare(`SELECT COUNT(*) as count FROM manhwa ${where}`)
      .get(...params).count;

    const rows = db
      .prepare(
        `SELECT * FROM manhwa ${where}
         ORDER BY title ASC
         LIMIT ? OFFSET ?`
      )
      .all(...params, limit, offset);

    res.status(200).json({
      data: rows.map((row) => formatManhwa(row)),
      total,
      page,
      message: 'Manhwa list loaded',
    });
  } catch (err) {
    next(err);
  }
};

export const getManhwa = (req, res, next) => {
  try {
    const row = findManhwaRow(req.params.id);

    if (!row) {
      res.status(404).json({
        error: 'NOT_FOUND',
        message: 'Manhwa not found',
      });
      return;
    }

    const chapters = getChaptersForManhwa(row.id);

    res.status(200).json({
      data: formatManhwa(row, { includeChapters: true, chapters }),
      message: 'Manhwa loaded',
    });
  } catch (err) {
    next(err);
  }
};

export const createManhwa = (req, res, next) => {
  try {
    const { title, synopsis, genre, status, slug, cover_url } = req.body;

    if (!title || !genre || !status) {
      res.status(400).json({
        error: 'VALIDATION_ERROR',
        message: 'title, genre, and status are required',
      });
      return;
    }

    const manhwaSlug = slug || slugify(title);
    const exists = db.prepare('SELECT id FROM manhwa WHERE slug = ?').get(manhwaSlug);

    if (exists) {
      res.status(409).json({
        error: 'DUPLICATE',
        message: 'Manhwa slug already exists',
      });
      return;
    }

    const id = crypto.randomUUID();
    const genreJson = JSON.stringify(
      Array.isArray(genre) ? genre : String(genre).split(',').map((g) => g.trim().toLowerCase())
    );

    db.prepare(
      `INSERT INTO manhwa (id, slug, title, synopsis, cover_url, genre, status, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    ).run(
      id,
      manhwaSlug,
      title,
      synopsis || '',
      cover_url || null,
      genreJson,
      status,
      req.user.id
    );

    const row = findManhwaRow(id);

    res.status(201).json({
      data: formatManhwa(row),
      message: 'Manhwa created',
    });
  } catch (err) {
    next(err);
  }
};

export const updateManhwa = (req, res, next) => {
  try {
    const row = findManhwaRow(req.params.id);

    if (!row) {
      res.status(404).json({
        error: 'NOT_FOUND',
        message: 'Manhwa not found',
      });
      return;
    }

    const { title, synopsis, genre, status, cover_url } = req.body;
    const genreJson = genre
      ? JSON.stringify(
          Array.isArray(genre)
            ? genre
            : String(genre).split(',').map((g) => g.trim().toLowerCase())
        )
      : row.genre;

    db.prepare(
      `UPDATE manhwa SET
        title = COALESCE(?, title),
        synopsis = COALESCE(?, synopsis),
        genre = ?,
        status = COALESCE(?, status),
        cover_url = COALESCE(?, cover_url),
        updated_at = datetime('now')
       WHERE id = ?`
    ).run(
      title ?? row.title,
      synopsis ?? row.synopsis,
      genreJson,
      status ?? row.status,
      cover_url !== undefined ? cover_url : row.cover_url,
      row.id
    );

    const updated = findManhwaRow(row.id);

    res.status(200).json({
      data: formatManhwa(updated),
      message: 'Manhwa updated',
    });
  } catch (err) {
    next(err);
  }
};

export const addChapter = (req, res, next) => {
  try {
    const row = findManhwaRow(req.params.id);

    if (!row) {
      res.status(404).json({
        error: 'NOT_FOUND',
        message: 'Manhwa not found',
      });
      return;
    }

    const { chapter_number, title, source_url, source_name, release_date } = req.body;

    if (!chapter_number || !source_url) {
      res.status(400).json({
        error: 'VALIDATION_ERROR',
        message: 'chapter_number and source_url are required',
      });
      return;
    }

    const id = crypto.randomUUID();

    db.prepare(
      `INSERT INTO chapters (id, manhwa_id, chapter_number, title, source_url, source_name, release_date)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    ).run(
      id,
      row.id,
      chapter_number,
      title || `Chapter ${chapter_number}`,
      source_url,
      source_name || null,
      release_date || null
    );

    const chapter = db.prepare('SELECT * FROM chapters WHERE id = ?').get(id);

    res.status(201).json({
      data: formatChapter(chapter),
      message: 'Chapter added',
    });
  } catch (err) {
    next(err);
  }
};

export const listRecentChapters = (req, res, next) => {
  try {
    const limit = Math.min(20, Math.max(1, parseInt(req.query.limit, 10) || 8));

    const rows = db
      .prepare(
        `SELECT c.*, m.title AS manhwa_title, m.slug AS manhwa_slug
         FROM chapters c
         INNER JOIN manhwa m ON c.manhwa_id = m.id
         WHERE c.source_url IS NOT NULL AND c.source_url != ''
         ORDER BY c.created_at DESC
         LIMIT ?`
      )
      .all(limit);

    res.status(200).json({
      data: rows.map((row) => ({
        ...formatChapter(row),
        manhwa_title: row.manhwa_title,
        manhwa_slug: row.manhwa_slug,
      })),
      message: 'Recent chapters loaded',
    });
  } catch (err) {
    next(err);
  }
};
