export const parseGenre = (genreJson) => {
  try {
    const parsed = JSON.parse(genreJson);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const formatManhwa = (row, { includeChapters = false, chapters = [] } = {}) => {
  if (!row) return null;

  const base = {
    id: row.id,
    slug: row.slug,
    title: row.title,
    synopsis: row.synopsis,
    cover_url: row.cover_url,
    genre: parseGenre(row.genre),
    status: row.status,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };

  if (includeChapters) {
    return {
      ...base,
      chapters: chapters.map(formatChapter),
    };
  }

  return base;
};

export const formatChapter = (row) => ({
  id: row.id,
  chapter_number: row.chapter_number,
  title: row.title,
  source_url: row.source_url,
  source_name: row.source_name,
  release_date: row.release_date,
});

export const slugify = (title) =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
