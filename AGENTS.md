# ManhwaQ V2 — AI Coding Rules (AGENTS.md)

Ini adalah rules untuk semua AI coding agents (Claude, Cursor, Copilot, dll.) yang bekerja dalam projek ManhwaQ V2.
Baca fail ini sebelum membuat sebarang perubahan kod.

---

## Project Context

- **Project:** ManhwaQ V2 — Community manhwa platform
- **Owner:** Hayqal-Hakimi (17 y/o, aspiring Cloud Engineer + AI Infra + CyberSec)
- **Stack:** React + Tailwind CSS (frontend) | Node.js + Express (backend) | AWS (infrastructure)
- **Design System:** Modern Parchment (lihat DESIGN.md)
- **Repo:** github.com/Hayqal-Hakimi/ManhwaQ-V2

---

## Build & Run Commands

### Frontend
```bash
cd manhwahub-frontend
npm install
npm run dev          # localhost:5173
npm run build        # production build
```

### Backend
```bash
cd manhwaq-backend
npm install
cp .env.example .env
npm run dev          # localhost:3000
npm start            # production
```

### Infrastructure
```bash
cd infrastructure
terraform init
terraform plan
terraform apply
```

---

## WAJIB IKUT (Always Do)

### General
- Sentiasa guna **functional components** dalam React — jangan guna class components
- Sentiasa guna **async/await** — jangan guna .then() dan .catch() berantai
- Sentiasa guna **Tailwind CSS** untuk styling — jangan tulis CSS biasa atau inline styles
- Sentiasa ikut **Modern Parchment design system** (warna, typography, shadow, border)
- Sentiasa guna **environment variables** untuk semua credentials dan config
- Sentiasa guna **parameterized queries** untuk semua database operations — elak SQL injection
- Sentiasa guna **const** dan **let** — jangan guna var
- Sentiasa guna **named exports** untuk components, **default export** untuk pages
- Sentiasa tulis **nama variable yang jelas** — jangan guna x, y, a, b
- Sentiasa guna **REST conventions** untuk API endpoints

### Security (Wajib — CyberSec focus)
- Sentiasa **validate input** di server-side — jangan percaya client input
- Sentiasa guna **JWT verification** untuk protected routes
- Sentiasa guna **role checking** — user vs admin
- Sentiasa guna **rate limiting** pada semua API endpoints
- Sentiasa guna **HTTPS** — jangan HTTP
- Jangan **log sensitive data** (password, token, credit card)
- Sentiasa **sanitize** output untuk elak XSS

### AWS & Cloud (Wajib — Cloud Engineer focus)
- Sentiasa guna **AWS SDK v3** (bukan v2)
- Sentiasa guna **Secrets Manager** untuk production secrets — jangan hardcode
- Sentiasa guna **IAM least privilege** — jangan guna AdministratorAccess untuk app
- Sentiasa ikut **Terraform** untuk semua infrastructure changes

### Code Style
- Indentation: **2 spaces**
- Quotes: **single quotes** dalam JavaScript
- Commit message format: `feat: add poll voting`, `fix: resolve login bug`, `chore: update deps`
- Branch format: `feature/poll-system`, `fix/login-bug`

---

## JANGAN BUAT (Never Do)

### Frontend
- ❌ Jangan guna inline styles (`style={{ color: 'red' }}`) — guna Tailwind class
- ❌ Jangan guna CSS modules atau styled-components — Tailwind sahaja
- ❌ Jangan guna class components — functional sahaja
- ❌ Jangan guna warna lain selain dari Modern Parchment palette
- ❌ Jangan guna `var` — guna `const` dan `let`
- ❌ Jangan tambah library baru tanpa sebab yang jelas
- ❌ Jangan hardcode API URL — guna environment variable

### Backend
- ❌ Jangan simpan password dalam plaintext — guna bcrypt
- ❌ Jangan guna string interpolation dalam SQL queries — guna parameterized queries
- ❌ Jangan expose stack trace dalam production error response
- ❌ Jangan guna `console.log` dalam production — guna proper logger
- ❌ Jangan simpan JWT secret dalam kod — guna environment variable
- ❌ Jangan guna `SELECT *` — specify columns yang diperlukan

### AWS
- ❌ Jangan commit `.env` file ke Git
- ❌ Jangan hardcode AWS credentials dalam kod
- ❌ Jangan buat changes infrastructure secara manual di console — guna Terraform
- ❌ Jangan letak RDS dalam public subnet

---

## Design System Rules (Modern Parchment)

### Warna yang dibenarkan
```
Primary:    #455859  (Slate Teal)
Secondary:  #8b5e3c  (Warm Brown)
Background: #fcf9f8  (Parchment)
Surface:    #ffffff  (White)
Text:       #1b1c1c  (Carbon Black)
Border:     #000000  (Black)
```

### Component Rules
- Semua button mesti ada: `border-2 border-black shadow-[4px_4px_0px_0px_#000]`
- Semua card mesti ada: `bg-white border-2 border-black shadow-[8px_8px_0px_0px_#000]`
- Hover state button: `hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000]`
- Font headlines: Hanken Grotesk (font-display)
- Font body: Inter (font-sans)
- Jangan guna rounded corners yang besar — max `rounded` (1rem)

---

## File Structure Rules

- Semua pages dalam `/pages/`
- Semua reusable components dalam `/components/`
- Semua API calls dalam `/services/`
- Semua custom hooks dalam `/hooks/`
- Semua context dalam `/context/`

---

## API Rules

- Semua endpoints bermula dengan `/api/v1/`
- Semua protected routes mesti ada `auth` middleware
- Semua admin routes mesti ada `adminOnly` middleware
- Response format sentiasa: `{ data: ..., message: ... }` untuk success
- Error format sentiasa: `{ error: "ERROR_CODE", message: "..." }`

---

## Testing Approach

- Manual testing dulu untuk MVP
- Unit tests ditambah kemudian untuk critical functions (auth, poll voting, library)
- Jangan buat tests yang terlalu complex untuk sekarang
