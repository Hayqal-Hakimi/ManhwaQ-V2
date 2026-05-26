# ManhwaQ V2 — Deployment Plan (DEPLOYMENT.md)

**Target Domain:** manhwaq.com (planned)
**Cloud Provider:** AWS (us-east-1)
**Status:** Planning phase — belum deploy lagi

---

## Architecture Overview

```
manhwaq.com
    │
    ├── CloudFront (CDN)
    │       ├── /          → S3 (React Frontend)
    │       └── /api/*     → API Gateway → ECS Fargate (Node.js)
    │
    ├── RDS PostgreSQL (private subnet)
    ├── DynamoDB (serverless)
    ├── S3 (media storage)
    └── Cognito (auth)
```

---

## AWS Services & Configuration

### 1. S3 — Frontend Hosting
```
Bucket name: manhwaq-frontend-prod
Region: us-east-1
Static website hosting: enabled
Public access: via CloudFront only (not direct)
```

### 2. CloudFront — CDN
```
Origin 1: S3 bucket (frontend)
Origin 2: API Gateway (backend)
SSL: ACM certificate (manhwaq.com + *.manhwaq.com)
Price class: PriceClass_100 (US, Canada, Europe)
```

### 3. ECS Fargate — Backend
```
Cluster: manhwaq-cluster
Service: manhwaq-api
Task: 0.5 vCPU, 1GB RAM (minimum)
Auto scaling: min 1, max 3 tasks
Port: 3000
```

### 4. RDS PostgreSQL — Database
```
Instance: db.t4g.micro
Engine: PostgreSQL 18.3
Storage: 20GB gp2
Backup: 7 days retention
Subnet: private subnet ONLY
Multi-AZ: false (cost saving, single AZ ok for now)
```

### 5. DynamoDB — Realtime Data
```
Tables:
- manhwaq-view-counters (On-demand billing)
- manhwaq-sessions (On-demand + TTL)
- manhwaq-reaction-counts (On-demand)
```

### 6. Cognito — Authentication
```
User Pool: manhwaq-users
App client: manhwaq-web
Identity providers: Email/password + Google
JWT expiry: 1 hour (access token), 30 days (refresh token)
```

### 7. Route 53 — DNS
```
Domain: manhwaq.com
Records:
- A record → CloudFront distribution
- CNAME www → manhwaq.com
```

---

## Deployment Steps (When Ready)

### Step 1 — Infrastructure (Terraform)
```bash
cd infrastructure
terraform init
terraform workspace new prod
terraform plan -out=tfplan
terraform apply tfplan
```

### Step 2 — Database Migration
```bash
# Connect ke RDS melalui bastion host atau VPN
psql -h [RDS_ENDPOINT] -U AdminQ -d manhwaq
# Run migrations
\i migrations/001_initial_schema.sql
```

### Step 3 — Backend (Docker + ECR + ECS)
```bash
# Build Docker image
docker build -t manhwaq-api .

# Tag dan push ke ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin [ECR_URI]
docker tag manhwaq-api:latest [ECR_URI]/manhwaq-api:latest
docker push [ECR_URI]/manhwaq-api:latest

# Update ECS service
aws ecs update-service --cluster manhwaq-cluster --service manhwaq-api --force-new-deployment
```

### Step 4 — Frontend (S3 + CloudFront)
```bash
# Build React app
cd manhwahub-frontend
npm run build

# Deploy ke S3
aws s3 sync dist/ s3://manhwaq-frontend-prod --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id [CF_ID] --paths "/*"
```

---

## Environment Variables (Production)

Semua secrets disimpan dalam **AWS Secrets Manager**, bukan dalam environment files.

```
/manhwaq/prod/database_url
/manhwaq/prod/jwt_secret
/manhwaq/prod/cognito_user_pool_id
/manhwaq/prod/cognito_client_id
/manhwaq/prod/s3_bucket
```

---

## CI/CD Pipeline (GitHub Actions)

### Frontend Pipeline
```
Trigger: Push ke main branch
Steps:
1. npm install
2. npm run build
3. aws s3 sync dist/ ke S3
4. CloudFront invalidation
```

### Backend Pipeline
```
Trigger: Push ke main branch
Steps:
1. npm install
2. Run tests
3. Docker build
4. Push ke ECR
5. ECS update-service
```

---

## Monitoring & Logging

| Service | Tool |
|---------|------|
| Application logs | CloudWatch Logs |
| Infrastructure metrics | CloudWatch Metrics |
| API tracing | AWS X-Ray |
| Error tracking | CloudWatch Alarms |
| Database monitoring | RDS Performance Insights |

---

## Cost Estimate (Monthly, Production)

| Service | Estimated Cost |
|---------|---------------|
| ECS Fargate (1 task) | ~$15-20 |
| RDS db.t4g.micro | ~$15 |
| S3 (storage + transfer) | ~$5 |
| CloudFront | ~$5 |
| DynamoDB (on-demand) | ~$3 |
| Route 53 | ~$1 |
| **Total** | **~$44-50/bulan** |

> Note: Ini estimate minimum. Cost boleh lebih rendah dalam early stage bila traffic rendah.

---

## Rollback Plan

```bash
# Rollback backend ke image lama
aws ecs update-service --cluster manhwaq-cluster \
  --service manhwaq-api \
  --task-definition manhwaq-api:[PREVIOUS_VERSION]

# Rollback frontend ke S3 version lama
aws s3 sync s3://manhwaq-frontend-backup/ s3://manhwaq-frontend-prod/ --delete
aws cloudfront create-invalidation --distribution-id [CF_ID] --paths "/*"
```
