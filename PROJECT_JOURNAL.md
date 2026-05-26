# ManhwaQ V2 — Project Journal (PROJECT_JOURNAL.md)

Log semua keputusan penting, lessons learned, dan milestone dalam projek ini.

---

## Format Entry

```
## [YYYY-MM-DD] — Tajuk Entry
**Type:** Decision | Milestone | Lesson | Issue
**Status:** Open | Resolved | Noted

Deskripsi apa yang berlaku atau keputusan yang dibuat.

**Reason:** Kenapa keputusan ini dibuat.
**Impact:** Apa kesannya kepada projek.
```

---

## Entries

---

### [2025-05-26] — Project V2 Documentation Complete
**Type:** Milestone
**Status:** Resolved

Semua dokumentasi awal ManhwaQ V2 telah disiapkan sebelum memulakan backend development. Ini termasuk PRD, Architecture, API Spec, Database Schema, Design System, AGENTS.md, TODO, README, Deployment Plan, dan Testing Strategy.

**Reason:** Mengikut amalan professional — spec-driven development. Dokumen dulu sebelum code, supaya AI coding agents dan developer sendiri ada context yang jelas.

**Impact:** Akan mengurangkan ralat dan inconsistency semasa development. AI agents boleh refer kepada AGENTS.md dan DESIGN.md untuk keputusan code style.

---

### [2025-05-26] — Keputusan: REST API (bukan GraphQL)
**Type:** Decision
**Status:** Resolved

Memilih REST API berbanding GraphQL untuk backend ManhwaQ V2.

**Reason:** REST lebih simple, dokumentasi lebih luas, lebih mudah untuk debug, dan sesuai untuk portfolio yang nak tunjuk kepada employer. GraphQL menambah complexity yang tidak diperlukan untuk sekarang.

**Impact:** API_SPEC.md menggunakan REST conventions. Semua endpoints menggunakan standard HTTP methods (GET, POST, PATCH, DELETE).

---

### [2025-05-26] — Keputusan: ECS Fargate (bukan EC2 biasa)
**Type:** Decision
**Status:** Resolved

Backend akan di-host menggunakan ECS Fargate berbanding EC2 manual seperti V1.

**Reason:** ECS Fargate adalah serverless containers — tiada perlu manage EC2 instance, ada auto-scaling, dan lebih sesuai untuk menunjukkan kemahiran Cloud Engineer moden kepada employer.

**Impact:** Perlu belajar Docker dan containerization sebelum deploy backend. DEPLOYMENT.md mengandungi steps lengkap.

---

### [2025-05-26] — Keputusan: PostgreSQL + DynamoDB (hybrid)
**Type:** Decision
**Status:** Resolved

Guna dua database — RDS PostgreSQL untuk relational data dan DynamoDB untuk realtime/high-write data.

**Reason:** PostgreSQL sesuai untuk structured data yang memerlukan ACID compliance (users, manhwa, polls, comments). DynamoDB sesuai untuk data yang ditulis kerap dan perlu response cepat (view counters, session data, reaction counts).

**Impact:** DATABASE_SCHEMA.md mengandungi schema untuk kedua-dua database. Perlu setup DynamoDB tables dalam Terraform.

---

### [2025-05-26] — Keputusan: Admin-only post creation
**Type:** Decision
**Status:** Resolved

Community Feed hanya admin yang boleh create post. User biasa boleh comment dan react sahaja.

**Reason:** Untuk maintain quality control dalam community feed. Mengelakkan spam dan content yang tidak berkaitan.

**Impact:** POST /posts endpoint dilindungi dengan adminOnly middleware. UI tidak menunjukkan "Create Post" button kepada user biasa.

---

### [2025-05-26] — Keputusan: Manual testing dulu, unit tests kemudian
**Type:** Decision
**Status:** Resolved

MVP akan menggunakan manual testing. Unit tests ditambah kemudian untuk critical functions.

**Reason:** Hayqal adalah solo developer yang fokus kepada cloud infrastructure, bukan QA engineer. Manual testing cukup untuk MVP. Unit tests akan ditambah secara gradually.

**Impact:** TESTING_STRATEGY.md mengandungi manual testing checklist yang comprehensive untuk semua features.

---

### [2025-05-26] — Keputusan: Embed/link manhwa dari sumber luar
**Type:** Decision
**Status:** Resolved

Manhwa chapters akan di-embed atau di-link dari sumber luar (MangaDex, Webtoon, dll.) — bukan upload sendiri.

**Reason:** Upload sendiri memerlukan storage yang besar, copyright issues, dan complexity yang tinggi. Embed/link adalah cara yang lebih simple dan sesuai untuk MVP.

**Impact:** Chapters table dalam database menyimpan `source_url` dan `source_name`. Admin boleh tambah link dari mana-mana sumber.

---

## Template untuk Entry Baru

```
### [YYYY-MM-DD] — Tajuk
**Type:** Decision | Milestone | Lesson | Issue
**Status:** Open | Resolved | Noted

Deskripsi.

**Reason:** 
**Impact:** 
```
