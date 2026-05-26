# ManhwaQ V2 — Product Requirements Document (PRD)

## 1. Executive Summary

ManhwaQ V2 adalah platform komuniti manhwa dengan 10 core features. Dokumen ini menyenaraikan semua functional requirements, user stories, dan priority untuk setiap feature.

---

## 2. User Roles

| Role | Keupayaan |
|------|-----------|
| **Guest** | Tengok manhwa list, tengok trending, baca preview |
| **User (Registered)** | Semua guest + library, comment, react, vote poll, profile |
| **Admin** | Semua user + create post, create poll, manage manhwa, manage users |

---

## 3. Features — MVP vs Phase 2

### MVP (Buat Dulu)
1. Account System (Signup, Login, Profile)
2. Library
3. Manhwa Detail Page
4. Community Feed
5. Poll System
6. Universal Search

### Phase 2 (Kemudian)
7. Trending (AI-powered)
8. Notifications (In-app)
9. Settings
10. Premium Badge

---

## 4. Functional Requirements & User Stories

---

### Feature 1 — Account System

**Requirements:**
- User boleh signup dengan email dan password
- User boleh login dengan email/password atau Google
- User boleh logout
- User boleh tukar username
- User boleh tukar email
- User boleh tukar password
- User boleh tukar profile picture
- User boleh set profile sebagai public atau private
- User boleh delete account
- Admin account mempunyai keupayaan tambahan

**User Stories:**
```
As a new user, I want to create an account so that I can access community features.
As a user, I want to login with Google so that I don't need to remember a password.
As a user, I want to change my username so that I can update my identity.
As a user, I want to delete my account so that my data is removed from the platform.
As an admin, I want to manage user accounts so that I can moderate the community.
```

**Edge Cases:**
- Email sudah digunakan → tunjuk error message
- Password terlalu pendek (< 8 characters) → validation error
- Google login gagal → fallback ke email login

---

### Feature 2 — Library

**Requirements:**
- User boleh tambah manhwa ke "Currently Reading"
- User boleh tambah manhwa ke "Plan to Read"
- System simpan last chapter read dan progress percentage
- User boleh sort library (A-Z, Recently Added, Progress)
- User boleh filter library (by status, by genre)
- User boleh search manhwa dalam library mereka

**User Stories:**
```
As a user, I want to add manhwa to my library so that I can track my reading.
As a user, I want to see my reading progress so that I know where I stopped.
As a user, I want to sort my library so that I can find manhwa easily.
As a user, I want to filter by genre so that I can browse my collection by type.
```

**Edge Cases:**
- Manhwa yang sama tidak boleh ada dua kali dalam library
- Progress tidak boleh melebihi 100%

---

### Feature 3 — Manhwa Detail Page

**Requirements:**
- Tunjuk synopsis, genre, status (ongoing/completed)
- Tunjuk chapter list dengan link/embed dari sumber luar
- Admin boleh tambah link dari mana-mana sumber
- User boleh beri rating (1-10)
- User boleh tulis review
- User boleh comment
- Tunjuk related manhwa
- Button "Add to Library"

**User Stories:**
```
As a user, I want to see manhwa details so that I can decide if I want to read it.
As a user, I want to read chapters via embedded links so that I can read without leaving the site.
As a user, I want to rate and review manhwa so that I can share my opinion.
As an admin, I want to add chapter links from any source so that I have flexibility.
```

**Edge Cases:**
- Link luar tidak boleh diakses → tunjuk error dengan option untuk report
- User cuba rate dua kali → update rating lama, bukan tambah baru

---

### Feature 4 — Community Feed

**Requirements:**
- Hanya admin boleh create post
- Post boleh mengandungi teks dan gambar
- User boleh comment pada post
- User boleh react pada post (like, love, haha, wow, sad, angry)
- User boleh react pada comment
- Tunjuk weekly poll card dalam feed
- Tunjuk new chapter highlight dalam feed
- Tunjuk trending section dalam feed

**User Stories:**
```
As an admin, I want to create posts so that I can share updates with the community.
As a user, I want to comment on posts so that I can join the discussion.
As a user, I want to react to posts so that I can express my feelings quickly.
As a user, I want to see the weekly poll in the feed so that I can vote easily.
```

**Edge Cases:**
- Comment kosong tidak boleh disubmit
- User boleh delete comment sendiri sahaja
- Admin boleh delete mana-mana comment

---

### Feature 5 — Poll System

**Requirements:**
- Hanya admin boleh create poll
- Poll mempunyai soalan, options, dan tarikh tamat
- User boleh vote satu option sahaja
- User tidak boleh tukar vote selepas submit
- Tunjuk result secara realtime (percentage bar)
- Poll boleh ada gambar karakter manhwa

**User Stories:**
```
As an admin, I want to create polls so that I can engage the community.
As a user, I want to vote in polls so that I can participate in community decisions.
As a user, I want to see poll results so that I know what the community thinks.
```

**Edge Cases:**
- User cuba vote dua kali → tunjuk "You have already voted"
- Poll tamat → tunjuk final result, button vote disabled

---

### Feature 6 — Universal Search

**Requirements:**
- Search bar accessible dari semua pages (header)
- Boleh search manhwa by title
- Boleh search users by username
- Boleh search community posts by keyword
- Boleh search features/pages dalam website (contoh: "polls" → redirect ke /polls)
- Hasil search dikategorikan (Manhwa, Users, Posts, Pages)
- Tidak masuk ke dalam comment-comment

**User Stories:**
```
As a user, I want to search for manhwa so that I can find titles quickly.
As a user, I want to search for features so that I can navigate the site easily.
As a user, I want to search for other users so that I can find their profiles.
```

**Edge Cases:**
- Search kosong → tidak buat apa-apa
- Tiada hasil → tunjuk "No results found" dengan suggestion

---

### Feature 7 — Trending (Phase 2)

**Requirements:**
- Tunjuk manhwa paling banyak dibaca minggu ini
- Update setiap minggu
- Ranking berdasarkan: views, library adds, ratings
- Tunjuk rank change (naik/turun)

---

### Feature 8 — Notifications (Phase 2)

**Requirements:**
- Bell icon dalam header
- Notify bila: chapter baru untuk manhwa dalam library, poll baru, reply pada comment
- Mark as read
- Clear all notifications

---

### Feature 9 — Settings (Phase 2)

**Requirements:**
- Dark mode toggle
- Tukar password
- Tukar email
- Tukar profile picture
- Privacy setting (public/private profile)
- Linked accounts (Google)
- Delete account

---

### Feature 10 — Premium Badge (Phase 2)

**Requirements:**
- Premium badge pada profile
- UI ada, tiada payment gateway
- Admin assign premium manually

---

## 5. Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| Performance | Page load < 3 saat |
| Security | HTTPS, JWT auth, parameterized queries, rate limiting |
| Scalability | ECS Fargate auto-scaling |
| Availability | 99% uptime |
| Mobile | Responsive — mobile first |
| Browser | Chrome, Firefox, Safari, Edge |

---

## 6. Out of Scope (Untuk Sekarang)

- Payment gateway
- Push notifications (mobile)
- SEO optimization
- Multi-language support
- Upload chapter sendiri (embed/link sahaja)
- Comment search
