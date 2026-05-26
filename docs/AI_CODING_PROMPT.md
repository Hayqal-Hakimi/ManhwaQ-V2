# ManhwaQ V2 — AI Coding Prompt

Guna prompt ini bila minta AI (Claude, Cursor, Copilot) untuk buat code untuk ManhwaQ V2.
Copy bahagian yang berkaitan dan paste ke dalam AI.

---

## PROMPT MASTER (Guna Ni Dulu — Bagi Context)

```
Kamu adalah AI coding assistant untuk projek ManhwaQ V2.

## Tentang Projek
ManhwaQ V2 adalah platform komuniti manhwa yang dibina oleh Hayqal-Hakimi (17 tahun, aspiring Cloud Engineer + AI Infra + CyberSec, Malaysia). Ini adalah portfolio projek untuk menunjukkan kemahiran cloud-native AWS architecture.

## Tech Stack
- Frontend: React 18 + Tailwind CSS (Vite)
- Backend: Node.js + Express (REST API)
- Database: AWS RDS PostgreSQL + DynamoDB
- Auth: AWS Cognito (JWT + Google OAuth)
- Storage: AWS S3
- Infrastructure: Terraform + ECS Fargate
- CI/CD: GitHub Actions

## Design System — Modern Parchment
Warna utama:
- Primary: #455859 (Slate Teal)
- Secondary: #8b5e3c (Warm Brown)
- Background: #fcf9f8 (Parchment)
- Border: SENTIASA #000000, 2px solid
- Shadow: SENTIASA hard offset (4px 4px 0px 0px #000)

## Rules Wajib
SENTIASA:
- Guna functional components (React) — jangan class components
- Guna async/await — jangan .then()
- Guna Tailwind CSS — jangan inline styles atau CSS biasa
- Guna parameterized queries — jangan string interpolation dalam SQL
- Guna environment variables untuk semua credentials
- Guna REST conventions untuk API
- Ikut Modern Parchment design system untuk semua UI

JANGAN:
- Hardcode credentials
- Guna inline styles
- Guna class components
- Guna var (guna const/let)
- Guna SELECT * dalam SQL
- Log sensitive data

## Folder Structure
Frontend: /pages/, /components/layout/, /components/common/, /hooks/, /services/, /context/
Backend: /controllers/, /routes/, /middleware/, /models/, /config/

## API Base URL
Development: http://localhost:3000/api/v1
Production: https://api.manhwaq.com/v1

Sila baca context ini sebelum menulis sebarang code.
```

---

## PROMPT — Buat Feature Baru

```
Berdasarkan context ManhwaQ V2 di atas, saya nak kamu buat:

[NAMA FEATURE]

Requirements:
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]

Sila:
1. Buat plan dulu (jangan terus code)
2. Selepas saya approve plan, baru buat code
3. Ikut semua rules dalam AGENTS.md
4. Pastikan UI ikut Modern Parchment design system
5. Explain setiap bahagian code yang kamu buat
```

---

## PROMPT — Buat Backend Endpoint

```
Berdasarkan context ManhwaQ V2, saya nak kamu buat backend endpoint:

Endpoint: [METHOD] [PATH]
Contoh: POST /api/v1/polls/:id/vote

Dari API_SPEC.md, spec untuk endpoint ini adalah:
[PASTE SPEC DARI API_SPEC.MD]

Requirements tambahan:
- Auth: [required / admin only / public]
- Validation: [senaraikan validations]
- Error cases: [senaraikan error cases]

Buat:
1. Route dalam /routes/
2. Controller dalam /controllers/
3. Middleware yang diperlukan
4. Manual testing steps
```

---

## PROMPT — Buat React Component / Page

```
Berdasarkan context ManhwaQ V2, saya nak kamu buat React component/page:

Nama: [NAMA COMPONENT/PAGE]
Path: [/pages/xxx.jsx atau /components/xxx.jsx]

Fungsi:
[Describe apa yang component/page ini perlu buat]

Data yang diperlukan dari API:
[Describe data apa yang perlu di-fetch]

UI Requirements:
- Ikut Modern Parchment design system
- Warna primary: #455859
- Warna secondary: #8b5e3c
- Semua cards: border-2 border-black shadow-[8px_8px_0px_0px_#000]
- Semua buttons: border-2 border-black shadow-[4px_4px_0px_0px_#000]
- Background: #fcf9f8

Existing pages untuk reference:
- Home.jsx — community feed layout
- Library.jsx — grid cards layout
- Trending.jsx — list layout
- MyPolls.jsx — poll cards layout
```

---

## PROMPT — Debug / Fix Bug

```
Berdasarkan context ManhwaQ V2, saya ada bug:

Bug description:
[Describe bug]

Steps to reproduce:
1. [Step 1]
2. [Step 2]
3. [Step 3]

Expected behavior:
[Apa yang patut berlaku]

Actual behavior:
[Apa yang sebenarnya berlaku]

Relevant code:
[Paste code yang bermasalah]

Error message (jika ada):
[Paste error message]

Sila:
1. Diagnose punca bug
2. Explain kenapa bug berlaku
3. Bagi fix dengan explanation
4. Cadang cara elak bug sama di masa depan
```

---

## PROMPT — Buat Database Migration

```
Berdasarkan DATABASE_SCHEMA.md ManhwaQ V2, saya nak buat migration SQL untuk:

[NAMA TABLE / PERUBAHAN]

Schema yang dikehendaki:
[Paste schema dari DATABASE_SCHEMA.md]

Sila buat:
1. CREATE TABLE SQL statement
2. Indexes yang diperlukan untuk performance
3. Rollback SQL (DROP TABLE jika perlu)

Rules:
- Guna UUID untuk primary keys
- Guna TIMESTAMP DEFAULT NOW() untuk created_at
- Guna ON DELETE CASCADE untuk foreign keys yang sesuai
- Tambah CHECK constraints untuk enum-like fields
```

---

## PROMPT — Buat Terraform Resource

```
Berdasarkan ARCHITECTURE.md dan DEPLOYMENT.md ManhwaQ V2, saya nak buat Terraform untuk:

[NAMA AWS RESOURCE]
Contoh: RDS PostgreSQL instance

Requirements:
- Region: us-east-1
- Environment: production
- [Requirements lain dari DEPLOYMENT.md]

Rules:
- Guna variables untuk semua values yang mungkin berubah
- Letak dalam private subnet (untuk database)
- Ikut least privilege untuk IAM
- Guna Secrets Manager untuk sensitive values
- Tag semua resources dengan: Project = "manhwaq", Environment = "prod"

Output yang diperlukan:
[Apa yang perlu di-output (endpoint, ARN, dll.)]
```

---

## PROMPT — Code Review

```
Sila review code ini untuk ManhwaQ V2:

[PASTE CODE]

Sila check:
1. Adakah ia ikut rules dalam AGENTS.md?
2. Adakah ada security issues (SQL injection, XSS, exposed secrets)?
3. Adakah ada performance issues?
4. Adakah naming conventions betul?
5. Adakah error handling cukup?
6. Adakah ia consistent dengan Modern Parchment design? (untuk frontend)

Beri feedback dalam format:
✅ Good: [apa yang bagus]
⚠️ Warning: [apa yang perlu improve]
❌ Issue: [apa yang perlu fix segera]
```
