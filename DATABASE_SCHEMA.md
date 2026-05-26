# ManhwaQ V2 — Database Schema

## 1. PostgreSQL (AWS RDS) — Relational Data

### Users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  profile_picture_url TEXT,
  role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  is_premium BOOLEAN DEFAULT false,
  is_private BOOLEAN DEFAULT false,
  google_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Manhwa
```sql
CREATE TABLE manhwa (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  synopsis TEXT,
  cover_url TEXT,
  genre VARCHAR(100)[],
  status VARCHAR(20) CHECK (status IN ('ongoing', 'completed', 'hiatus')),
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Chapters
```sql
CREATE TABLE chapters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  manhwa_id UUID REFERENCES manhwa(id) ON DELETE CASCADE,
  chapter_number DECIMAL(10,1) NOT NULL,
  title VARCHAR(255),
  source_url TEXT NOT NULL,
  source_name VARCHAR(100),
  release_date DATE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Library
```sql
CREATE TABLE library (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  manhwa_id UUID REFERENCES manhwa(id) ON DELETE CASCADE,
  status VARCHAR(20) CHECK (status IN ('reading', 'plan_to_read', 'completed', 'dropped')),
  last_chapter_read DECIMAL(10,1) DEFAULT 0,
  progress_percent INTEGER DEFAULT 0 CHECK (progress_percent BETWEEN 0 AND 100),
  added_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, manhwa_id)
);
```

### Posts
```sql
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  image_url TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Comments
```sql
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Reactions
```sql
CREATE TABLE reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  target_type VARCHAR(20) CHECK (target_type IN ('post', 'comment')),
  target_id UUID NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  reaction_type VARCHAR(20) CHECK (reaction_type IN ('like', 'love', 'haha', 'wow', 'sad', 'angry')),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(target_type, target_id, user_id)
);
```

### Reviews
```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  manhwa_id UUID REFERENCES manhwa(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating BETWEEN 1 AND 10),
  content TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(manhwa_id, user_id)
);
```

### Polls
```sql
CREATE TABLE polls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  created_by UUID REFERENCES users(id),
  ends_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Poll Options
```sql
CREATE TABLE poll_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  poll_id UUID REFERENCES polls(id) ON DELETE CASCADE,
  label VARCHAR(255) NOT NULL,
  image_url TEXT,
  display_order INTEGER DEFAULT 0
);
```

### Poll Votes
```sql
CREATE TABLE poll_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  poll_id UUID REFERENCES polls(id) ON DELETE CASCADE,
  poll_option_id UUID REFERENCES poll_options(id),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  voted_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(poll_id, user_id)
);
```

### Notifications
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) CHECK (type IN ('new_chapter', 'new_poll', 'comment_reply')),
  title VARCHAR(255),
  content TEXT,
  link TEXT,
  read_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 2. DynamoDB — Realtime & High-Write Data

### Table: manhwaq-view-counters
```
Partition Key: manhwa_id (String)
Sort Key: week_year (String) — contoh: "2025-W21"

Attributes:
- view_count (Number)
- library_add_count (Number)
- trending_score (Number)
```

### Table: manhwaq-sessions
```
Partition Key: session_id (String)
TTL: expires_at

Attributes:
- user_id (String)
- created_at (String)
```

### Table: manhwaq-reaction-counts
```
Partition Key: target_type#target_id (String)

Attributes:
- like (Number)
- love (Number)
- haha (Number)
- wow (Number)
- sad (Number)
- angry (Number)
```

---

## 3. AWS S3 — File Storage

```
manhwaq-bucket/
├── profiles/          ← Profile pictures
│   └── {user_id}/avatar.jpg
├── posts/             ← Post images
│   └── {post_id}/image.jpg
└── manhwa/            ← Manhwa cover images
    └── {manhwa_id}/cover.jpg
```
