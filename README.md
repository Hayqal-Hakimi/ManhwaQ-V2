# ManhwaQ V2

> Platform komuniti manhwa yang menggabungkan reading tracker, community feed, dan poll system dalam satu platform cloud-native.

**Status:** 🔄 In Development
**Owner:** Hayqal-Hakimi
**Domain (planned):** manhwaq.com

---

## Overview

ManhwaQ V2 adalah platform manhwa yang dibina sebagai portfolio projek untuk menunjukkan kemahiran **Cloud Engineering**, **AI Infrastructure**, dan **CyberSecurity**. Platform ini bukan sekadar website manhwa — ia adalah demonstrasi production-grade AWS architecture.

### Key Features
- 📚 **Library** — Track reading progress manhwa
- 🏠 **Community Feed** — Post, comment, dan react
- 📊 **Poll System** — Vote karakter dan arc terbaik
- 🔥 **Trending** — Manhwa paling popular minggu ini
- 🔍 **Universal Search** — Cari manhwa, users, posts, features
- 🔔 **Notifications** — In-app notification system
- ⚙️ **Settings** — Dark mode, privacy, account management

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Tailwind CSS |
| Backend | Node.js + Express (REST API) |
| Database | AWS RDS PostgreSQL + DynamoDB |
| Auth | AWS Cognito (JWT + Google OAuth) |
| Storage | AWS S3 |
| CDN | AWS CloudFront |
| Hosting | S3 (frontend) + ECS Fargate (backend) |
| Infrastructure | Terraform |
| CI/CD | GitHub Actions |

---

## Project Structure

```
ManhwaQ-V2/
├── manhwahub-frontend/     ← React frontend
├── manhwaq-backend/        ← Node.js backend (coming soon)
├── infrastructure/         ← Terraform IaC (coming soon)
└── docs/
    ├── PROJECT_OVERVIEW.md
    ├── PRD.md
    ├── ARCHITECTURE.md
    ├── API_SPEC.md
    ├── DATABASE_SCHEMA.md
    ├── DESIGN.md
    ├── AGENTS.md
    ├── TODO.md
    ├── DEPLOYMENT.md
    └── TESTING_STRATEGY.md
```

---

## Getting Started

### Prerequisites
- Node.js >= 18
- npm >= 8
- AWS CLI configured
- Terraform >= 1.5

### Frontend (Local Development)
```bash
cd manhwahub-frontend
npm install
npm run dev
# Open http://localhost:5173
```

### Backend (Coming Soon)
```bash
cd manhwaq-backend
npm install
cp .env.example .env
# Fill in your environment variables
npm run dev
# API running on http://localhost:3000
```

---

## Environment Variables

Lihat `.env.example` dalam folder backend untuk senarai penuh variables.

```env
# Database
DATABASE_URL=postgresql://...
DYNAMODB_TABLE_PREFIX=manhwaq-

# AWS
AWS_REGION=us-east-1
AWS_S3_BUCKET=manhwaq-bucket

# Auth
JWT_SECRET=...
COGNITO_USER_POOL_ID=...
COGNITO_CLIENT_ID=...

# App
NODE_ENV=development
PORT=3000
```

---

## Git Workflow

```
main    ← Production (auto-deploy)
dev     ← Development integration
feature/xxx  ← Feature branches
fix/xxx      ← Bug fix branches
```

**Commit format:** `feat: add poll voting system`

---

## Documentation

Semua dokumentasi dalam folder `/docs`:

| Dokumen | Deskripsi |
|---------|-----------|
| PROJECT_OVERVIEW.md | Vision dan summary projek |
| PRD.md | Product requirements dan user stories |
| ARCHITECTURE.md | System design dan folder structure |
| API_SPEC.md | Semua API endpoints |
| DATABASE_SCHEMA.md | PostgreSQL dan DynamoDB schema |
| DESIGN.md | UI/UX design system |
| AGENTS.md | Rules untuk AI coding agents |
| TODO.md | Task breakdown dan priority |
| DEPLOYMENT.md | Deployment plan dan steps |
| TESTING_STRATEGY.md | Testing approach |

---

## Related Repositories

- **V1 (PHP):** github.com/Hayqal-Hakimi/manhwaQ
- **V2 (React + Node.js):** github.com/Hayqal-Hakimi/ManhwaQ-V2

---

## Author

**Hayqal-Hakimi**
Aspiring Cloud Engineer + AI Infrastructure Engineer + CyberSecurity
Malaysia | 17 years old | Autodidak
