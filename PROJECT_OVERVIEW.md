# ManhwaQ V2 — Project Overview

## Vision Statement

ManhwaQ V2 adalah platform komuniti manhwa yang menggabungkan pengalaman membaca, perbincangan komuniti, dan sistem voting dalam satu platform yang bersih dan moden. Ia bukan sekadar website manhwa biasa — ia adalah **cloud-native platform** yang direka untuk menunjukkan kemahiran Cloud Engineer, AI Infrastructure, dan CyberSecurity dalam satu projek portfolio yang nyata.

---

## Tujuan Projek

### Tujuan Utama
- Membina platform komuniti manhwa yang berfungsi sepenuhnya
- Menunjukkan kemahiran cloud-native architecture kepada bakal majikan
- Menggunakan AWS services secara production-grade (bukan sekadar teori)

### Tujuan Sekunder
- Mengamalkan Terraform IaC, Docker, CI/CD dalam projek sebenar
- Membina portfolio yang boleh ditunjukkan semasa temuduga Cloud Engineer / AI Infra / CyberSec

---

## Target Users

| User Type | Deskripsi |
|-----------|-----------|
| **Manhwa Reader** | Pengguna yang membaca manhwa dan ingin berkongsi pendapat dalam komuniti |
| **Community Member** | Pengguna aktif yang comment, react, dan vote dalam poll |
| **Admin (Hayqal)** | Penguasa platform — create post, create poll, manage content |

---

## Gambaran Platform

ManhwaQ V2 adalah platform yang menggabungkan:
- **Reading tracker** — simpan progress membaca manhwa
- **Community feed** — post, comment, react dengan sesama pembaca
- **Poll system** — vote karakter atau arc terbaik
- **Trending system** — tunjuk manhwa paling popular minggu ini
- **Universal search** — cari manhwa, pengguna, post, dan features

Inspirasi: Webtoon (reading experience) + Reddit (community) + MAL (tracking) — tetapi lebih focused dan lightweight.

---

## Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Frontend | React + Tailwind CSS (Modern Parchment Design System) |
| Backend | Node.js + Express (REST API) |
| Database (Relational) | AWS RDS PostgreSQL |
| Database (NoSQL) | AWS DynamoDB |
| File Storage | AWS S3 |
| CDN | AWS CloudFront |
| Auth | AWS Cognito |
| Hosting (Frontend) | S3 + CloudFront |
| Hosting (Backend) | AWS ECS Fargate |
| Infrastructure | Terraform |
| CI/CD | GitHub Actions |
| Domain | manhwaq.com (planned) |

---

## Fasa Pembangunan

| Fasa | Fokus | Status |
|------|-------|--------|
| V1 | PHP + EC2 manual setup | ✅ Selesai |
| V2 — Frontend | React UI (semua pages) | ✅ Selesai (UI only) |
| V2 — Backend | Node.js API + Database | 🔄 Akan datang |
| V2 — Cloud | AWS Infrastructure (Terraform) | 🔄 Akan datang |
| V2 — AI | Trending algorithm, recommendation | 🔄 Fasa akhir |

---

## Repository

- **V1:** github.com/Hayqal-Hakimi/manhwaQ
- **V2:** github.com/Hayqal-Hakimi/ManhwaQ-V2

---

## Owner

**Hayqal-Hakimi**
17 tahun | Malaysia | Autodidak
Matlamat: Cloud Engineer + AI Infrastructure Engineer + CyberSecurity
