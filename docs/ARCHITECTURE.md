# ManhwaQ V2 — Architecture Document

## 1. High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      USERS / BROWSER                     │
└───────────────────────────┬─────────────────────────────┘
                            │ HTTPS
┌───────────────────────────▼─────────────────────────────┐
│              AWS CloudFront (CDN)                        │
│         manhwaq.com → CF Distribution                    │
└──────────┬────────────────────────────┬─────────────────┘
           │                            │
┌──────────▼──────────┐    ┌────────────▼────────────────┐
│   AWS S3             │    │   API Gateway               │
│   React Frontend     │    │   (REST API Entry Point)    │
│   Static Files       │    └────────────┬────────────────┘
└─────────────────────┘                 │
                            ┌───────────▼────────────────┐
                            │   AWS ECS Fargate           │
                            │   Node.js + Express API     │
                            └───┬───────────┬────────────┘
                                │           │
               ┌────────────────▼──┐   ┌───▼──────────────┐
               │  AWS RDS           │   │  AWS DynamoDB     │
               │  PostgreSQL        │   │  (Realtime Data)  │
               │  (Main Database)   │   └──────────────────┘
               └───────────────────┘
                                │
                    ┌───────────▼──────────┐
                    │  AWS S3 (Media)       │
                    │  Profile pictures     │
                    │  Post images          │
                    └──────────────────────┘
```

---

## 2. Data Flow

### Mana guna PostgreSQL (RDS)?
Data yang structured dan relational:
- Users (id, username, email, role, created_at)
- Manhwa (id, title, synopsis, genre, status, cover_url)
- Chapters (id, manhwa_id, chapter_number, title, source_url)
- Library (user_id, manhwa_id, status, last_chapter, progress)
- Polls (id, question, created_by, ends_at)
- Poll Options (id, poll_id, label, image_url)
- Poll Votes (user_id, poll_option_id)
- Posts (id, content, image_url, created_by)
- Comments (id, post_id, user_id, content)
- Reactions (id, target_type, target_id, user_id, reaction_type)
- Reviews (id, manhwa_id, user_id, rating, content)
- Notifications (id, user_id, type, content, read_at)

### Mana guna DynamoDB?
Data yang realtime dan high-write:
- Activity counters (view counts, read counts)
- Session data
- Trending scores (dikira setiap minggu)
- Real-time reaction counts

---

## 3. Folder Structure

### Frontend (React)
```
manhwahub-frontend/
├── public/
│   └── assets/
│       └── images/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── MobileNav.jsx
│   │   │   └── Shell.jsx
│   │   └── common/
│   │       ├── Button.jsx
│   │       ├── Card.jsx
│   │       └── PollCard.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Library.jsx
│   │   ├── Trending.jsx
│   │   ├── MyPolls.jsx
│   │   ├── ManhwaDetail.jsx
│   │   ├── Profile.jsx
│   │   ├── Search.jsx
│   │   └── Settings.jsx
│   ├── hooks/
│   │   ├── useAuth.js
│   │   └── useLibrary.js
│   ├── services/
│   │   ├── api.js
│   │   └── auth.js
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── App.jsx
│   └── main.jsx
├── tailwind.config.js
└── package.json
```

### Backend (Node.js)
```
manhwaq-backend/
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── manhwaController.js
│   │   ├── libraryController.js
│   │   ├── pollController.js
│   │   ├── postController.js
│   │   ├── commentController.js
│   │   ├── searchController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── adminOnly.js
│   │   ├── rateLimiter.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Manhwa.js
│   │   ├── Poll.js
│   │   └── Post.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── manhwa.js
│   │   ├── library.js
│   │   ├── polls.js
│   │   ├── posts.js
│   │   ├── search.js
│   │   └── users.js
│   ├── config/
│   │   ├── database.js
│   │   └── aws.js
│   └── app.js
├── .env.example
└── package.json
```

### Infrastructure (Terraform)
```
infrastructure/
├── main.tf
├── variables.tf
├── outputs.tf
├── vpc.tf
├── ec2.tf (replaced by ECS)
├── ecs.tf
├── rds.tf
├── dynamodb.tf
├── s3.tf
├── cloudfront.tf
├── cognito.tf
├── iam.tf
└── security_groups.tf
```

---

## 4. Tech Decisions & Justification

| Keputusan | Pilihan | Sebab |
|-----------|---------|-------|
| Frontend framework | React | Dah ada, ekosistem besar, sesuai untuk SPA |
| Styling | Tailwind CSS | Utility-first, consistent dengan design system |
| Backend | Node.js + Express | JavaScript full-stack, mudah, sesuai untuk REST API |
| Main DB | PostgreSQL (RDS) | Relational data, ACID compliance, AWS managed |
| Realtime DB | DynamoDB | High-write, serverless, AWS native |
| Auth | AWS Cognito | AWS native, Google login built-in, JWT ready |
| Container | ECS Fargate | Serverless containers, auto-scale, no EC2 management |
| CDN | CloudFront | Global edge, integrate dengan S3 dan API Gateway |
| IaC | Terraform | Industry standard, sesuai untuk portfolio Cloud Engineer |
| CI/CD | GitHub Actions | Free, integrate dengan GitHub repo, mudah setup |
| API Style | REST | Simple, documented, mudah debug |

---

## 5. Security Architecture

- **Authentication:** JWT via AWS Cognito
- **Authorization:** Role-based (Guest, User, Admin)
- **HTTPS:** SSL via ACM + CloudFront
- **Database:** RDS dalam private subnet
- **Secrets:** AWS Secrets Manager (bukan .env dalam production)
- **Rate Limiting:** Express rate-limiter middleware
- **Input Validation:** Server-side validation semua input
- **SQL Injection:** Parameterized queries sahaja
- **CORS:** Configured untuk domain manhwaq.com sahaja

---

## 6. Git Workflow

```
main          ← Production (protected, deploy automatically)
│
dev           ← Development (merge point)
│
feature/xxx   ← Feature branches (contoh: feature/poll-system)
fix/xxx       ← Bug fix branches
```

**Rules:**
- Jangan commit terus ke main
- PR ke dev dulu, review, kemudian merge ke main
- Branch name format: `feature/nama-feature` atau `fix/nama-bug`
- Commit message format: `feat: add poll voting system`
