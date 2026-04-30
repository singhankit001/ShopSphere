# 🛍️ ShopSphere

### Instant grocery delivery for the modern consumer.
A production-grade quick-commerce platform focused on speed, user intent, and high-fidelity product discovery.

> Built with product thinking, not just code.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)

---

## ⚡ Highlights

*   **Sub-100ms Interactions:** Optimised transitions and asset loading for zero-jank browsing.
*   **Structured Catalog:** A high-fidelity, slug-based product mapping system.
*   **Intent-Driven UX:** Category-first navigation designed for high-speed discovery.
*   **Conversion-Ready:** Robust cart management and a seamless checkout flow.
*   **Resilient Design:** Mobile-first, glassmorphic UI with local data fallbacks for maximum uptime.

---

## 🖼️ Preview

| Homepage | Products | Cart | Categories |
| :---: | :---: | :---: | :---: |
| [Home](./assets/screens/home.png) | [Catalog](./assets/screens/products.png) | [Checkout](./assets/screens/cart.png) | [Browse](./assets/screens/categories.png) |

---

## 🏗️ Architecture

ShopSphere uses a modular, feature-first structure to ensure maintainability as the project scales.

*   **Features:** Encapsulated domain logic (e.g., Cart, Search, Auth).
*   **Components:** Reusable UI primitives following a strict design system.
*   **Services/Hooks:** Clean API abstraction and shared state management.
*   **Utils:** Pure functions for data formatting and performance tweaks.

---

## ⚙️ Tech Stack

*   **Frontend:** React 19 + Vite (HMR focus)
*   **Styling:** Tailwind CSS (Custom Design Tokens)
*   **Navigation:** React Router 7
*   **State:** Redux Toolkit + Custom Hooks

---

## 📁 Folder Structure

```text
src/
├── assets/      # Optimized branding and icons
├── components/  # Atomic design: /ui, /common, /features
├── data/        # Static catalog and fallback datasets
├── store/       # Redux Toolkit state management
├── hooks/       # Custom React lifecycle logic
├── utils/       # Formatting and validation helpers
└── constants/   # Global configurations and constants
```

---

## 🚀 Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/singhankit001/ShopSphere.git

# 2. Enter project directory
cd shopsphere/client

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev
```

---

## 🧠 Key Features

*   **Dynamic Filtering:** Instant UI updates using URL-synced state management.
*   **Category System:** Logical SKU clustering to mimic real-world shelf browsing.
*   **Cart Logic:** Real-time quantity sync and persistent state across sessions.
*   **UI Consistency:** Meticulously crafted using a bespoke 8px grid system.

---

## 📈 Roadmap

*   **Payments:** Integration with Stripe and UPI gateways.
*   **Live Tracking:** Socket-based delivery partner monitoring.
*   **Advanced Auth:** Complete JWT-based secure session handling.
*   **Backend:** High-scale Node.js/MongoDB microservices.

---

**Built with attention to usability, performance, and real-world scalability.**

---

## 🐳 Docker — Build & Run

```bash
# Build the production image (from project root)
docker build -t shopsphere:latest .

# Run locally
docker run -p 8080:80 shopsphere:latest
# Visit: http://localhost:8080
# Health: http://localhost:8080/health

# Full stack (with backend) via Docker Compose
docker compose up --build
docker compose down
```

---

## ☁️ AWS Infrastructure Setup

**Prerequisites:** AWS CLI v2 installed + configured (`aws configure`)

```bash
# Edit subnet and security group IDs inside the script first
chmod +x scripts/aws-setup.sh
./scripts/aws-setup.sh
```

This creates:
- ECR repository: `shopsphere`
- CloudWatch log group: `/ecs/shopsphere` (30-day retention)
- ECS Fargate cluster: `shopsphere-cluster` (Container Insights on)
- IAM task execution role: `ecsTaskExecutionRole`
- ECS task definition: `shopsphere-task`
- ECS service: `shopsphere-service`

---

## 🔐 GitHub Actions Secrets

`Settings → Secrets and variables → Actions → New repository secret`

| Secret | Value |
|---|---|
| `AWS_ACCESS_KEY_ID` | IAM access key |
| `AWS_SECRET_ACCESS_KEY` | IAM secret key |
| `AWS_REGION` | e.g. `ap-south-1` |
| `ECR_REPOSITORY` | `shopsphere` |
| `ECS_CLUSTER` | `shopsphere-cluster` |
| `ECS_SERVICE` | `shopsphere-service` |
| `ECS_TASK_DEFINITION` | `.aws/task-definition.json` |
| `CONTAINER_NAME` | `shopsphere` |

---

## 🚀 CI/CD Pipeline — Deployment Flow

```
git push origin main
        │
        ▼
 GitHub Actions triggered (.github/workflows/deploy.yml)
        │
        ├── [1] Checkout code
        ├── [2] Configure AWS credentials (from Secrets)
        ├── [3] Login to Amazon ECR
        ├── [4] Generate tags: latest + <7-char commit SHA>
        ├── [5] docker build . -t <ECR>:latest -t <ECR>:<sha>
        ├── [6] docker push (both tags)
        ├── [7] Verify image exists in ECR
        ├── [8] Render task definition with new image URI
        ├── [9] Deploy to ECS Fargate (waits for stability)
        └── [10] Verify rollout state + print CloudWatch URL
```

✅ **Zero manual steps.** Every `git push` to `main` automatically builds, pushes, and deploys.

---

## 📊 CloudWatch Logs

Container logs stream to:

| Log Group | Retention |
|---|---|
| `/ecs/shopsphere` | 30 days |

**View logs:**
```
AWS Console → CloudWatch → Log groups → /ecs/shopsphere
```

---

## 💚 Health Checks

| Check | Command | Interval | Retries |
|---|---|---|---|
| Docker | `wget -qO- http://localhost/health` | 30s | 3 |
| ECS | Same (via task definition `healthCheck`) | 30s | 3 |

ECS automatically replaces failed tasks after 3 consecutive health check failures.

---

## 🏷️ Image Tagging Strategy

| Tag | Meaning |
|---|---|
| `latest` | Most recent successful build |
| `a1b2c3d` | Immutable 7-char commit SHA |

Rollback: `aws ecs update-service --task-definition shopsphere-task:<previous-revision>`

---

**Built with attention to usability, performance, and real-world scalability.**


```bash
# Build both images and start the stack
docker compose up --build

# Frontend available at: http://localhost
# Backend API available at: http://localhost:5001/api/health

# Run in detached mode
docker compose up -d --build

# Stop the stack
docker compose down
```

**Build individual images:**

```bash
# Frontend (React → Nginx, multi-stage build)
docker build -t shopsphere-frontend:local ./client

# Backend (Node.js + Express)
docker build -t shopsphere-backend:local ./server

# Test frontend locally
docker run -p 8080:80 shopsphere-frontend:local
# Visit: http://localhost:8080
```

---

## ☁️ AWS Infrastructure Setup

**Prerequisites:**
- AWS CLI v2 installed and configured
- IAM user with ECR, ECS, CloudWatch, SecretsManager permissions

**Run the bootstrap script once:**

```bash
# Make executable and run
chmod +x scripts/aws-setup.sh
AWS_REGION=ap-south-1 ./scripts/aws-setup.sh
```

This creates:
- 2 ECR repositories (`shopsphere-frontend`, `shopsphere-backend`)
- CloudWatch log groups with 30-day retention
- ECS Fargate cluster with Container Insights
- IAM task execution role
- ECS task definitions and services

---

## 🔐 GitHub Actions Secrets

Go to `Settings → Secrets and variables → Actions` and add:

| Secret Name | Description |
|---|---|
| `AWS_ACCESS_KEY_ID` | IAM user access key |
| `AWS_SECRET_ACCESS_KEY` | IAM user secret key |
| `AWS_REGION` | e.g. `ap-south-1` |
| `AWS_ACCOUNT_ID` | Your 12-digit AWS account ID |
| `ECR_REPOSITORY_FRONTEND` | `shopsphere-frontend` |
| `ECR_REPOSITORY_BACKEND` | `shopsphere-backend` |
| `ECS_CLUSTER` | `shopsphere-cluster` |
| `ECS_SERVICE_FRONTEND` | `shopsphere-frontend-service` |
| `ECS_SERVICE_BACKEND` | `shopsphere-backend-service` |
| `CONTAINER_NAME_FRONTEND` | `shopsphere-frontend` |
| `CONTAINER_NAME_BACKEND` | `shopsphere-backend` |

---

## 🚀 CI/CD Deployment Pipeline

**Flow:**

```
git push main
     │
     ▼
GitHub Actions triggered
     │
     ├─── [Parallel] ──────────────────────────────────────┐
     │    Build frontend image                              │
     │    Tag: latest + commit SHA                         │
     │    Push to ECR (shopsphere-frontend)                 │
     │                                                      │
     │                                                      ▼
     │                                             Build backend image
     │                                             Tag: latest + commit SHA
     │                                             Push to ECR (shopsphere-backend)
     │
     ├─── [Sequential] ───────────────────────────────────
     │    Render updated frontend task definition
     │    Deploy to ECS (waits for stability)
     │
     ├─── [Sequential] ───────────────────────────────────
     │    Render updated backend task definition
     │    Deploy to ECS (waits for stability)
     │
     └─── Verify ECS rollout state
          Print CloudWatch log links
```

Every `git push` to `main` triggers a **fully automated, zero-manual** deploy.

---

## 📊 CloudWatch Logs (Bonus)

Container logs are automatically streamed to CloudWatch:

| Service | Log Group |
|---|---|
| Frontend | `/ecs/shopsphere-frontend` |
| Backend | `/ecs/shopsphere-backend` |

Both groups have 30-day retention. Stream prefix: `ecs/`.

---

## 💚 Health Checks (Bonus)

| Container | Endpoint | Interval | Retries |
|---|---|---|---|
| Frontend | `GET /health` | 30s | 3 |
| Backend | `GET /api/health` | 30s | 3 |

ECS automatically restarts unhealthy tasks after 3 consecutive failures.

---

## 🏷️ Image Tagging Strategy

Each image is pushed with two tags:

| Tag | Purpose |
|---|---|
| `latest` | Always points to the most recent build |
| `<7-char SHA>` | Immutable reference to a specific commit |

Example: `123456789.dkr.ecr.ap-south-1.amazonaws.com/shopsphere-frontend:a1b2c3d`

---

**Built with attention to usability, performance, and real-world scalability.**
