# ManhwaQ V2 — Testing Strategy (TESTING_STRATEGY.md)

---

## Approach

ManhwaQ V2 menggunakan **Manual Testing dulu untuk MVP**, kemudian Unit Tests ditambah secara gradually untuk critical functions.

Ini sesuai untuk solo developer yang fokus kepada cloud infrastructure.

---

## Phase 1 — Manual Testing (MVP)

### Cara Manual Testing

Untuk setiap feature yang siap, test semua scenario ini secara manual dalam browser:

#### Auth System
| Test Case | Expected Result |
|-----------|----------------|
| Register dengan email valid | Account dicipta, redirect ke home |
| Register dengan email yang dah ada | Error: "Email already exists" |
| Register dengan password < 8 char | Validation error |
| Login dengan credentials betul | JWT disimpan, redirect ke home |
| Login dengan password salah | Error: "Invalid credentials" |
| Akses protected page tanpa login | Redirect ke login |
| Akses admin page sebagai user biasa | 403 Forbidden |

#### Library
| Test Case | Expected Result |
|-----------|----------------|
| Tambah manhwa ke library | Manhwa muncul dalam "Currently Reading" |
| Tambah manhwa yang dah ada | Error: "Already in library" |
| Update progress | Progress bar update |
| Remove dari library | Manhwa hilang dari list |
| Sort by A-Z | List tersusun alphabetically |
| Filter by genre | Hanya manhwa genre tersebut yang muncul |

#### Poll System
| Test Case | Expected Result |
|-----------|----------------|
| Vote dalam poll | Vote recorded, result update |
| Cuba vote dua kali | Error: "Already voted" |
| Vote dalam poll yang tamat | Button disabled |
| Admin create poll | Poll muncul dalam list |
| User cuba create poll | 403 Forbidden |

#### Search
| Test Case | Expected Result |
|-----------|----------------|
| Search manhwa title | Results tunjuk matching manhwa |
| Search username | Results tunjuk matching users |
| Search feature ("polls") | Redirect ke /polls |
| Search kosong | Tiada action |
| Search tanpa results | "No results found" |

---

## Phase 2 — Unit Tests (Selepas MVP)

Focus pada **critical business logic** sahaja.

### Backend Tests (Jest + Supertest)

#### Auth Controller Tests
```javascript
// auth.test.js
describe('POST /auth/register', () => {
  test('should create user with valid data', async () => { ... })
  test('should reject duplicate email', async () => { ... })
  test('should reject weak password', async () => { ... })
})

describe('POST /auth/login', () => {
  test('should return JWT for valid credentials', async () => { ... })
  test('should reject wrong password', async () => { ... })
})
```

#### Poll Controller Tests
```javascript
// poll.test.js
describe('POST /polls/:id/vote', () => {
  test('should record vote for authenticated user', async () => { ... })
  test('should reject duplicate vote', async () => { ... })
  test('should reject vote for expired poll', async () => { ... })
  test('should reject unauthenticated vote', async () => { ... })
})
```

#### Middleware Tests
```javascript
// auth.middleware.test.js
describe('Auth Middleware', () => {
  test('should allow request with valid JWT', async () => { ... })
  test('should reject request without JWT', async () => { ... })
  test('should reject expired JWT', async () => { ... })
})

// adminOnly.middleware.test.js
describe('AdminOnly Middleware', () => {
  test('should allow admin user', async () => { ... })
  test('should reject regular user', async () => { ... })
})
```

### Install Testing Dependencies (Backend)
```bash
npm install --save-dev jest supertest @types/jest
```

### Run Tests
```bash
npm test              # run all tests
npm test -- --watch   # watch mode
npm test -- --coverage # coverage report
```

---

## Phase 3 — Integration Tests (Optional, Later)

Selepas infrastructure ready:
- Test full flow: Register → Login → Add Library → Vote Poll
- Test AWS Cognito integration
- Test S3 upload
- Test DynamoDB operations

---

## Bug Reporting

Bila jumpa bug semasa manual testing, log dalam TODO.md format:
```
- [ ] fix: [BUG] Description of bug — Steps to reproduce
```

Contoh:
```
- [ ] fix: [BUG] User can vote twice in same poll when using incognito mode
```

---

## Testing Environment

| Environment | URL | Database |
|-------------|-----|----------|
| Local | localhost:5173 (frontend), localhost:3000 (backend) | Local PostgreSQL |
| Staging | staging.manhwaq.com (planned) | RDS (staging) |
| Production | manhwaq.com (planned) | RDS (production) |

---

## Security Testing Checklist

Ini wajib check sebelum deploy ke production:

- [ ] SQL injection tidak berfungsi pada semua input fields
- [ ] XSS tidak berfungsi pada comment dan post fields
- [ ] JWT tidak boleh di-forge atau di-tamper
- [ ] Admin endpoints tidak boleh diakses oleh user biasa
- [ ] Rate limiting berfungsi (test dengan 100+ requests dalam masa singkat)
- [ ] CORS hanya allow manhwaq.com domain
- [ ] Credentials tidak exposed dalam response atau logs
- [ ] `.env` file tidak dalam Git repository
- [ ] Database tidak accessible dari public internet
