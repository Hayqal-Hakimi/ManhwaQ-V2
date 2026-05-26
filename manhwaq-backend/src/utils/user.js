export const sanitizeUser = (row) => {
  if (!row) return null;

  return {
    id: row.id,
    username: row.username,
    email: row.email,
    profile_picture_url: row.profile_picture_url,
    role: row.role,
    is_premium: Boolean(row.is_premium),
    is_private: Boolean(row.is_private),
    created_at: row.created_at,
  };
};
