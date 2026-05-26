# ManhwaQ V2 — API Specification

**Base URL:** `https://api.manhwaq.com/v1`
**Auth:** Bearer JWT Token (via AWS Cognito)
**Format:** JSON

---

## Auth Headers

```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

---

## 1. Authentication

### POST /auth/register
Register user baru.
```json
Request:
{
  "username": "hayqal",
  "email": "hayqal@example.com",
  "password": "SecurePass123"
}

Response 201:
{
  "message": "Account created successfully",
  "user": { "id": "uuid", "username": "hayqal", "email": "hayqal@example.com" }
}
```

### POST /auth/login
Login dengan email dan password.
```json
Request:
{ "email": "hayqal@example.com", "password": "SecurePass123" }

Response 200:
{ "token": "jwt_token", "user": { "id": "uuid", "username": "hayqal", "role": "user" } }
```

### POST /auth/logout
Logout user.
```
Response 200: { "message": "Logged out successfully" }
```

### POST /auth/google
Login dengan Google OAuth.
```json
Request: { "google_token": "google_oauth_token" }
Response 200: { "token": "jwt_token", "user": { ... } }
```

---

## 2. Users

### GET /users/:id
Tengok profile pengguna.
```json
Response 200:
{
  "id": "uuid",
  "username": "hayqal",
  "profile_picture_url": "https://...",
  "is_premium": false,
  "is_private": false,
  "created_at": "2025-01-01"
}
```

### PATCH /users/me
Update profile sendiri. (Auth required)
```json
Request:
{
  "username": "new_username",
  "email": "new@email.com",
  "profile_picture_url": "https://..."
}
Response 200: { "message": "Profile updated" }
```

### PATCH /users/me/password
Tukar password. (Auth required)
```json
Request: { "current_password": "old", "new_password": "new" }
Response 200: { "message": "Password changed" }
```

### PATCH /users/me/privacy
Tukar privacy setting. (Auth required)
```json
Request: { "is_private": true }
Response 200: { "message": "Privacy updated" }
```

### DELETE /users/me
Delete account. (Auth required)
```json
Request: { "password": "confirm_password" }
Response 200: { "message": "Account deleted" }
```

---

## 3. Manhwa

### GET /manhwa
List semua manhwa.
```
Query params: ?page=1&limit=20&genre=action&status=ongoing&search=solo
Response 200: { "data": [...], "total": 100, "page": 1 }
```

### GET /manhwa/:id
Detail satu manhwa.
```json
Response 200:
{
  "id": "uuid",
  "title": "Solo Leveling",
  "synopsis": "...",
  "genre": ["action", "fantasy"],
  "status": "completed",
  "cover_url": "https://...",
  "average_rating": 9.8,
  "chapters": [...]
}
```

### POST /manhwa
Tambah manhwa baru. (Admin only)
```json
Request:
{
  "title": "Solo Leveling",
  "synopsis": "...",
  "genre": ["action"],
  "status": "ongoing",
  "cover_url": "https://..."
}
Response 201: { "message": "Manhwa created", "id": "uuid" }
```

### POST /manhwa/:id/chapters
Tambah chapter baru. (Admin only)
```json
Request:
{
  "chapter_number": 93,
  "title": "Chapter 93",
  "source_url": "https://mangadex.org/...",
  "source_name": "MangaDex",
  "release_date": "2025-05-26"
}
Response 201: { "message": "Chapter added" }
```

---

## 4. Library

### GET /library
Tengok library sendiri. (Auth required)
```
Query params: ?status=reading&sort=recently_added
Response 200: { "data": [...] }
```

### POST /library
Tambah manhwa ke library. (Auth required)
```json
Request: { "manhwa_id": "uuid", "status": "reading" }
Response 201: { "message": "Added to library" }
```

### PATCH /library/:manhwa_id
Update progress. (Auth required)
```json
Request: { "last_chapter_read": 92, "progress_percent": 49, "status": "reading" }
Response 200: { "message": "Progress updated" }
```

### DELETE /library/:manhwa_id
Remove dari library. (Auth required)
```json
Response 200: { "message": "Removed from library" }
```

---

## 5. Reviews & Ratings

### POST /manhwa/:id/reviews
Bagi rating dan review. (Auth required)
```json
Request: { "rating": 9, "content": "Amazing manhwa!" }
Response 201: { "message": "Review submitted" }
```

### GET /manhwa/:id/reviews
Tengok semua review.
```json
Response 200: { "data": [...], "average_rating": 9.8 }
```

---

## 6. Posts (Community Feed)

### GET /posts
Tengok semua post.
```
Query params: ?page=1&limit=10
Response 200: { "data": [...] }
```

### POST /posts
Create post. (Admin only)
```json
Request: { "content": "Post content", "image_url": "https://..." }
Response 201: { "message": "Post created", "id": "uuid" }
```

### POST /posts/:id/comments
Tambah comment. (Auth required)
```json
Request: { "content": "Great post!" }
Response 201: { "message": "Comment added" }
```

### DELETE /posts/:post_id/comments/:comment_id
Delete comment. (Auth — own comment only; Admin — any)
```json
Response 200: { "message": "Comment deleted" }
```

### POST /posts/:id/reactions
React pada post. (Auth required)
```json
Request: { "reaction_type": "like" }
Response 200: { "message": "Reaction added" }
```

---

## 7. Polls

### GET /polls
Tengok semua poll.
```json
Response 200: { "data": [...] }
```

### GET /polls/:id
Detail satu poll.
```json
Response 200:
{
  "id": "uuid",
  "question": "Who is strongest?",
  "ends_at": "2025-06-01",
  "options": [
    { "id": "uuid", "label": "Shadow Monarch", "votes": 2134, "percent": 65 }
  ],
  "user_vote": "uuid or null",
  "total_votes": 3284
}
```

### POST /polls
Create poll. (Admin only)
```json
Request:
{
  "question": "Best manhwa arc?",
  "ends_at": "2025-06-01",
  "options": [
    { "label": "Monarch War", "image_url": "https://..." },
    { "label": "Catastrophe" }
  ]
}
Response 201: { "message": "Poll created", "id": "uuid" }
```

### POST /polls/:id/vote
Vote dalam poll. (Auth required)
```json
Request: { "option_id": "uuid" }
Response 200: { "message": "Vote submitted" }
```

---

## 8. Search

### GET /search
Universal search.
```
Query params: ?q=solo+leveling&type=all
type options: all, manhwa, users, posts, pages

Response 200:
{
  "manhwa": [...],
  "users": [...],
  "posts": [...],
  "pages": [{ "label": "My Polls", "url": "/polls" }]
}
```

---

## 9. Notifications

### GET /notifications
Tengok semua notification. (Auth required)
```json
Response 200:
{
  "data": [
    { "id": "uuid", "type": "new_chapter", "title": "New chapter!", "read_at": null }
  ],
  "unread_count": 3
}
```

### PATCH /notifications/:id/read
Mark notification as read. (Auth required)
```json
Response 200: { "message": "Marked as read" }
```

### PATCH /notifications/read-all
Mark all as read. (Auth required)
```json
Response 200: { "message": "All marked as read" }
```

---

## 10. Trending

### GET /trending
Trending manhwa minggu ini.
```json
Response 200:
{
  "week": "2025-W21",
  "data": [
    { "rank": 1, "manhwa": {...}, "change": "+2" }
  ]
}
```

---

## Error Responses

| Status | Meaning |
|--------|---------|
| 400 | Bad Request — validation error |
| 401 | Unauthorized — token required |
| 403 | Forbidden — insufficient role |
| 404 | Not Found |
| 409 | Conflict — duplicate (contoh: already voted) |
| 429 | Too Many Requests — rate limit |
| 500 | Internal Server Error |

```json
Error format:
{
  "error": "ALREADY_VOTED",
  "message": "You have already voted in this poll"
}
```
