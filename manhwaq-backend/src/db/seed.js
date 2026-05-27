import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import dotenv from 'dotenv';
import db from '../config/database.js';

dotenv.config();

const ADMIN_EMAIL = 'admin';
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

const seedAdmin = async () => {
  const existing = db
    .prepare('SELECT id FROM users WHERE email = ? OR username = ?')
    .get(ADMIN_EMAIL, ADMIN_USERNAME);

  if (existing) {
    console.log('Admin account already exists — skip seed.');
    return;
  }

  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
  const id = crypto.randomUUID();

  db.prepare(
    `INSERT INTO users (id, username, email, password_hash, role)
     VALUES (?, ?, ?, ?, 'admin')`
  ).run(id, ADMIN_USERNAME, ADMIN_EMAIL, passwordHash);

  console.log('Admin account created:');
  console.log(`  email:    ${ADMIN_EMAIL}`);
  console.log(`  password: ${ADMIN_PASSWORD}`);
  console.log(`  role:     admin`);
};

seedAdmin().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
