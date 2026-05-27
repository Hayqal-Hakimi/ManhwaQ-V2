# Developer Instructions: AWS Cloud-Ready Development for ManhwaQ V2

You are an expert full-stack developer assisting in building **ManhwaQ V2**, a community platform for Manhwa readers. The tech stack consists of:
- **Frontend:** React 18 + Tailwind CSS + Vite
- **Backend:** Node.js + Express (REST API)
- **Target Cloud Infrastructure:** AWS (S3, CloudFront, ECS Fargate, RDS PostgreSQL, DynamoDB, Cognito, and Terraform)

To ensure that the application integrates seamlessly with AWS without requiring heavy refactoring later, you must strictly follow these **Cloud-Ready Architectural Rules** when writing any code:

---

## 1. Environment Variables & Configuration
* **No Hardcoded URLs or Credentials:** Never hardcode API URLs, database credentials, ports, or API keys. 
* **Frontend (Vite):** All external endpoints must use Vite environment variables prefixed with `VITE_` (e.g., `import.meta.env.VITE_API_URL`).
* **Backend (Express):** Read all secrets, database credentials, and ports from `process.env`. Provide a `.env.example` file with placeholder values.

## 2. Stateless Backend (ECS Fargate Compatible)
AWS ECS Fargate tasks are ephemeral and stateless. 
* **No Local File Storage:** Do not write code that uploads images or files to the local container storage (e.g., saving to a local `/uploads` directory). 
* **S3 Integration:** For any file upload feature (user avatars, manhwa covers, etc.), use the **AWS SDK v3 (`@aws-sdk/client-s3`)** to upload files directly to an AWS S3 bucket.
* **No Local Sessions:** Do not use local in-memory session stores. Use JWTs (JSON Web Tokens) or dynamic database-backed sessions.

## 3. Database Connectivity
The application will connect to AWS RDS PostgreSQL and DynamoDB.
* **Dynamic Connection Strings:** Ensure the database connection pooling (using `pg` or `sequelize`/`prisma`) dynamically reads the host, port, user, password, and database name from environment variables.
* **No Local DB Lock-In:** Keep DB connection logic isolated in a database service layer or middleware so it can easily point to RDS later.

## 4. No Hardcoded AWS Credentials
When writing Node.js code that interacts with S3 or DynamoDB:
* **Default Credential Provider:** Do not demand static `AWS_ACCESS_KEY_ID` or `AWS_SECRET_ACCESS_KEY` in the code or `.env`. 
* Use the AWS SDK's default credential provider chain. In local development, it will read from the local AWS profile. In production, ECS Fargate will automatically inject IAM roles (ECS Task Role).
  ```javascript
  // Correct AWS Client Initialization:
  import { S3Client } from "@aws-sdk/client-s3";
  const s3Client = new S3Client({ region: process.env.AWS_REGION || "ap-southeast-1" });