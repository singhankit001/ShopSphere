# ShopSphere

A production-grade quick-commerce platform focused on sub-100ms interactions, user intent, and high-fidelity product discovery. Built with a product-first approach to handle modern ecommerce demands.

---

## Architecture Overview

ShopSphere uses a modular, feature-first structure designed for maintainability and scale.

- Frontend: React 19, Vite, Tailwind CSS, Redux Toolkit, React Router 7.
- Backend: Node.js, Express, MongoDB.
- Infrastructure: Docker, Amazon ECR, Amazon ECS (Fargate).
- CI/CD: Fully automated GitHub Actions deployment pipeline.

## Core Capabilities

- Instant Interactions: Optimized transitions and asset loading for zero-jank browsing.
- Intent-Driven UX: Category-first navigation designed for high-speed discovery.
- Resilient State: Robust cart management with local fallbacks to ensure uninterrupted checkout flows.
- Automated Infrastructure: Zero-touch deployments to AWS ECS.

---

## Development Setup

### Local Environment

The stack is containerized for seamless onboarding. 

\`\`\`bash
# Start the full stack
docker compose up --build

# Run in detached mode
docker compose up -d --build

# Tear down
docker compose down
\`\`\`

Services:
- Frontend: http://localhost:8080
- Backend Health Check: http://localhost:8080/health

### Manual Build

If you prefer running services directly:

\`\`\`bash
# Frontend
cd client
npm install
npm run dev

# Backend
cd server
npm install
npm run dev
\`\`\`

---

## Infrastructure and Deployment

ShopSphere is designed to run on AWS ECS Fargate, orchestrated by a GitHub Actions pipeline.

### Provisioning

Bootstrap the AWS environment:

\`\`\`bash
chmod +x scripts/aws-setup.sh
AWS_REGION=ap-south-1 ./scripts/aws-setup.sh
\`\`\`

### CI/CD Pipeline

The pipeline triggers automatically on commits to the \`main\` branch.

Flow:
1. Validates and builds the Docker image.
2. Tags the image with both \`latest\` and the commit SHA.
3. Pushes the image to Amazon ECR.
4. Renders the updated ECS task definition.
5. Deploys to ECS Fargate via a rolling update.

Required GitHub Secrets:
- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
- AWS_REGION
- ECR_REPOSITORY
- ECS_CLUSTER
- ECS_SERVICE
- ECS_TASK_DEFINITION
- CONTAINER_NAME

### Observability

- Logging: Container logs are streamed directly to AWS CloudWatch (\`/ecs/shopsphere\`).
- Health Checks: Enforced at both the Docker daemon level and ECS level to ensure instant replacement of failing instances.

---

## License

MIT License.
