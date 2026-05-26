# ManhwaQ V2 — TODO & Task Breakdown

**Format:** `[ ]` = belum buat | `[x]` = selesai | `[~]` = sedang buat

---

## PHASE 1 — MVP (Buat Dulu)

### 1. Setup & Foundation

- [x] React frontend setup (Vite + Tailwind)
- [x] Design system (Modern Parchment)
- [x] All pages UI (Home, Library, Trending, Polls, Shell)
- [ ] Setup backend repo (`manhwaq-backend`)
- [ ] Init Node.js + Express project
- [ ] Setup folder structure (controllers, routes, middleware, models)
- [ ] Setup `.env.example`
- [ ] Connect PostgreSQL (RDS)
- [ ] Run database migrations (semua tables)
- [ ] Setup Git branching (main, dev, feature/xxx)
- [ ] Setup GitHub Actions CI/CD (basic)

---

### 2. Authentication System
**Branch:** `feature/auth-system`

- [ ] Install dependencies: `bcrypt`, `jsonwebtoken`, `express-validator`
- [ ] POST /auth/register — signup dengan email + password
- [ ] POST /auth/login — login, return JWT
- [ ] POST /auth/logout
- [ ] POST /auth/google — Google OAuth via Cognito
- [ ] Auth middleware (verify JWT)
- [ ] AdminOnly middleware (check role)
- [ ] Rate limiter middleware
- [ ] Connect frontend signup form ke API
- [ ] Connect frontend login form ke API
- [ ] Store JWT dalam localStorage/httpOnly cookie
- [ ] AuthContext dalam React (global auth state)

---

### 3. User Profile
**Branch:** `feature/user-profile`

- [ ] GET /users/:id — public profile
- [ ] GET /users/me — own profile
- [ ] PATCH /users/me — update username, email, profile picture
- [ ] PATCH /users/me/password — tukar password
- [ ] PATCH /users/me/privacy — tukar privacy setting
- [ ] DELETE /users/me — delete account
- [ ] Profile page UI connect ke API
- [ ] Reading history tab dalam profile
- [ ] Poll history tab dalam profile
- [ ] S3 upload untuk profile picture

---

### 4. Manhwa System
**Branch:** `feature/manhwa-system`

- [ ] GET /manhwa — list semua manhwa (dengan pagination)
- [ ] GET /manhwa/:id — detail manhwa
- [ ] POST /manhwa — create manhwa (admin only)
- [ ] PATCH /manhwa/:id — edit manhwa (admin only)
- [ ] POST /manhwa/:id/chapters — tambah chapter (admin only)
- [ ] Manhwa Detail page connect ke API
- [ ] Chapter list dengan embed/link
- [ ] Cover image upload ke S3

---

### 5. Library System
**Branch:** `feature/library`

- [ ] GET /library — tengok library sendiri
- [ ] POST /library — tambah ke library
- [ ] PATCH /library/:manhwa_id — update progress
- [ ] DELETE /library/:manhwa_id — remove dari library
- [ ] Library page connect ke API
- [ ] Sort dan filter functionality
- [ ] Search dalam library
- [ ] Progress bar update realtime

---

### 6. Community Feed
**Branch:** `feature/community-feed`

- [ ] GET /posts — list posts
- [ ] POST /posts — create post (admin only)
- [ ] POST /posts/:id/comments — tambah comment
- [ ] DELETE /posts/:post_id/comments/:comment_id — delete comment
- [ ] POST /posts/:id/reactions — react pada post
- [ ] Home page connect ke API
- [ ] Comment section UI
- [ ] Reaction buttons UI

---

### 7. Poll System
**Branch:** `feature/poll-system`

- [ ] GET /polls — list polls
- [ ] GET /polls/:id — detail poll dengan results
- [ ] POST /polls — create poll (admin only)
- [ ] POST /polls/:id/vote — vote
- [ ] My Polls page connect ke API
- [ ] Realtime result update (DynamoDB counters)
- [ ] Poll create form (admin)
- [ ] Vote button disable selepas voted

---

### 8. Universal Search
**Branch:** `feature/search`

- [ ] GET /search?q=xxx — universal search
- [ ] Search bar dalam Header connect ke API
- [ ] Search results page
- [ ] Kategorikan results (Manhwa, Users, Posts, Pages)
- [ ] Keyboard shortcut (Ctrl+K) untuk buka search

---

### 9. Reviews & Ratings
**Branch:** `feature/reviews`

- [ ] POST /manhwa/:id/reviews — bagi rating + review
- [ ] GET /manhwa/:id/reviews — list reviews
- [ ] Review section dalam Manhwa Detail page
- [ ] Star rating UI component
- [ ] Average rating calculation

---

## PHASE 2 — Additional Features

### 10. Trending System
**Branch:** `feature/trending`

- [ ] Setup DynamoDB view counters
- [ ] Increment counter bila user buka manhwa detail
- [ ] Weekly trending calculation (Lambda atau cron)
- [ ] GET /trending — trending manhwa
- [ ] Trending page connect ke API

---

### 11. Notifications
**Branch:** `feature/notifications`

- [ ] Setup notification triggers (new chapter, new poll, reply)
- [ ] GET /notifications
- [ ] PATCH /notifications/:id/read
- [ ] PATCH /notifications/read-all
- [ ] Bell icon dalam Header dengan unread count
- [ ] Notification dropdown UI

---

### 12. Settings
**Branch:** `feature/settings`

- [ ] Settings page UI
- [ ] Dark mode toggle (localStorage + Tailwind dark: classes)
- [ ] Tukar password form
- [ ] Tukar email form
- [ ] Tukar profile picture
- [ ] Privacy toggle
- [ ] Delete account flow (dengan confirmation)

---

### 13. Premium Badge
**Branch:** `feature/premium`

- [ ] Premium badge UI dalam profile
- [ ] Admin panel untuk assign premium
- [ ] Premium visual distinctions (border, icon)

---

## PHASE 3 — Infrastructure & DevOps

### 14. Terraform Infrastructure
**Branch:** `feature/terraform-infra`

- [ ] VPC dengan public dan private subnet
- [ ] Security Groups
- [ ] RDS PostgreSQL dalam private subnet
- [ ] DynamoDB tables
- [ ] S3 buckets
- [ ] CloudFront distribution
- [ ] ECS Fargate cluster
- [ ] ECR untuk Docker images
- [ ] Cognito User Pool
- [ ] IAM roles dan policies
- [ ] Secrets Manager untuk credentials

---

### 15. Docker & ECS
**Branch:** `feature/docker`

- [ ] Dockerfile untuk backend
- [ ] docker-compose.yml untuk local development
- [ ] Push image ke ECR
- [ ] ECS task definition
- [ ] ECS service setup

---

### 16. CI/CD
**Branch:** `feature/cicd`

- [ ] GitHub Actions workflow untuk frontend (build + deploy ke S3)
- [ ] GitHub Actions workflow untuk backend (build Docker + push ke ECR + deploy ke ECS)
- [ ] Environment variables setup dalam GitHub Secrets
- [ ] Staging environment

---

## Priority Order

| Priority | Feature |
|----------|---------|
| 🔴 P1 (Buat dulu) | Setup, Auth, Manhwa System |
| 🟠 P2 | Library, Profile, Community Feed |
| 🟡 P3 | Poll System, Reviews, Search |
| 🟢 P4 (Phase 2) | Trending, Notifications, Settings |
| 🔵 P5 (Phase 3) | Infrastructure, Docker, CI/CD |
