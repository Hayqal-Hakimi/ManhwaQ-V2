/**
 * Database — DEV: SQLite (DATABASE_PATH)
 * PROD (AWS): Ganti dengan RDS PostgreSQL via DATABASE_URL + driver pg.
 * Jangan simpan file DB dalam Docker image; guna volume atau RDS.
 */
import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const defaultDbPath = path.join(__dirname, '../../data/manhwaq.db');

const dbPath = process.env.DATABASE_PATH
  ? path.resolve(process.env.DATABASE_PATH)
  : defaultDbPath;

const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(dbPath);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

const initSchema = () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      profile_picture_url TEXT,
      role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
      is_premium INTEGER NOT NULL DEFAULT 0,
      is_private INTEGER NOT NULL DEFAULT 0,
      google_id TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);

    CREATE TABLE IF NOT EXISTS manhwa (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      synopsis TEXT,
      cover_url TEXT,
      genre TEXT NOT NULL,
      status TEXT NOT NULL CHECK (status IN ('ongoing', 'completed', 'hiatus')),
      created_by TEXT REFERENCES users(id),
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS chapters (
      id TEXT PRIMARY KEY,
      manhwa_id TEXT NOT NULL REFERENCES manhwa(id) ON DELETE CASCADE,
      chapter_number REAL NOT NULL,
      title TEXT,
      source_url TEXT,
      source_name TEXT,
      release_date TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_manhwa_slug ON manhwa(slug);
    CREATE INDEX IF NOT EXISTS idx_manhwa_status ON manhwa(status);
    CREATE INDEX IF NOT EXISTS idx_chapters_manhwa ON chapters(manhwa_id);

    CREATE TABLE IF NOT EXISTS library (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      manhwa_id TEXT NOT NULL REFERENCES manhwa(id) ON DELETE CASCADE,
      status TEXT NOT NULL DEFAULT 'reading' CHECK (status IN ('reading', 'plan_to_read', 'completed', 'dropped')),
      last_chapter_read REAL NOT NULL DEFAULT 0,
      progress_percent INTEGER NOT NULL DEFAULT 0 CHECK (progress_percent BETWEEN 0 AND 100),
      added_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      UNIQUE(user_id, manhwa_id)
    );

    CREATE INDEX IF NOT EXISTS idx_library_user ON library(user_id);
    CREATE INDEX IF NOT EXISTS idx_library_manhwa ON library(manhwa_id);
  `);
};

initSchema();

export default db;
