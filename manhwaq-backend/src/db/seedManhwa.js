import crypto from 'crypto';
import db from '../config/database.js';

/**
 * Seed manhwa — idempotent (skip jika slug sudah wujud).
 * Bila migrate ke RDS PostgreSQL: data sama, hanya tukar connection string.
 */
const MANHWA_SEED = [
  {
    slug: 'solo-leveling',
    title: 'Solo Leveling',
    genre: ['action', 'fantasy'],
    status: 'completed',
    synopsis:
      'Sung Jin-Woo, hunter paling lemah, hampir mati lalu mendapat sistem "level up" seperti game. Dari weakest, dia bangkit jadi Shadow Monarch yang paling kuat.',
  },
  {
    slug: 'killer-peter',
    title: 'Killer Peter',
    genre: ['action', 'revenge'],
    status: 'ongoing',
    synopsis:
      'Peter, pembunuh legenda yang sudah bersara, dikhianati dan dibunuh. Badannya kembali ke zaman muda. Kini dia balas dendam dengan kejam terhadap bekas organisasinya.',
  },
  {
    slug: 'omniscient-readers-viewpoint',
    title: "Omniscient Reader's Viewpoint",
    genre: ['action', 'fantasy', 'meta'],
    status: 'completed',
    synopsis:
      'Kim Dokja, pembaca setia sebuah web novel, terperangkap dalam dunia novel itu yang menjadi realiti. Dia gunakan pengetahuan plot untuk bertahan dalam apocalypse.',
  },
  {
    slug: 'windbreaker',
    title: 'Windbreaker',
    genre: ['sports', 'action', 'drama'],
    status: 'ongoing',
    synopsis:
      'Jo Ja-Hyun, pelajar genius, sebenarnya jaguh berbasikal. Dia menyertai krew basikal Hummingbird dan terlibat dalam dunia balap jalanan yang penuh persaingan.',
  },
];

export const seedManhwa = (adminUserId = null) => {
  const insertManhwa = db.prepare(
    `INSERT INTO manhwa (id, slug, title, synopsis, cover_url, genre, status, created_by)
     VALUES (?, ?, ?, ?, NULL, ?, ?, ?)`
  );

  const insertChapter = db.prepare(
    `INSERT INTO chapters (id, manhwa_id, chapter_number, title, source_url, source_name)
     VALUES (?, ?, ?, ?, NULL, NULL)`
  );

  let created = 0;

  for (const item of MANHWA_SEED) {
    const exists = db.prepare('SELECT id FROM manhwa WHERE slug = ?').get(item.slug);
    if (exists) continue;

    const manhwaId = crypto.randomUUID();
    insertManhwa.run(
      manhwaId,
      item.slug,
      item.title,
      item.synopsis,
      JSON.stringify(item.genre),
      item.status,
      adminUserId
    );

    for (let chapterNum = 1; chapterNum <= 3; chapterNum += 1) {
      insertChapter.run(
        crypto.randomUUID(),
        manhwaId,
        chapterNum,
        `Chapter ${chapterNum}`
      );
    }

    created += 1;
  }

  if (created > 0) {
    console.log(`Seeded ${created} manhwa titles (chapters placeholder — add URLs via Admin).`);
  }
};
