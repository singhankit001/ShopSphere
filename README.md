# ShopSphere

A quick-commerce platform focused on speed, simple user experience, and product discovery.

## Highlights
- Optimized transitions and asset loading
- Structured catalog with slug-based mapping
- Category-first navigation
- Robust cart management and checkout flow
- Mobile-first UI

## Architecture
- **Features:** Encapsulated domain logic
- **Components:** Reusable UI primitives
- **Services/Hooks:** Clean API abstraction and state management
- **Utils:** Pure functions for formatting

## Tech Stack
- Frontend: React 19 + Vite
- Styling: Tailwind CSS
- Navigation: React Router 7
- State: Redux Toolkit + Custom Hooks

## Getting Started

```bash
# Clone the repository
git clone https://github.com/singhankit001/ShopSphere.git

# Enter project directory
cd ShopSphere/client

# Install dependencies
npm install

# Start development server
npm run dev
```

## Docker Build & Run

```bash
# Build the production image
docker build -t shopsphere:latest .

# Run locally
docker run -p 8080:80 shopsphere:latest
```

## AWS Infrastructure Setup

Prerequisites: AWS CLI v2 installed and configured.

```bash
chmod +x scripts/aws-setup.sh
./scripts/aws-setup.sh
```

This sets up:
- ECR repository: shopsphere
- CloudWatch log group: /ecs/shopsphere
- ECS Fargate cluster: shopsphere-cluster
- IAM task execution role: ecsTaskExecutionRole
- ECS task definition: shopsphere-task
- ECS service: shopsphere-service

## GitHub Actions Secrets

Add the following secrets to the repository:
- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
- AWS_REGION
- ECR_REPOSITORY
- ECS_CLUSTER
- ECS_SERVICE
- ECS_TASK_DEFINITION
- CONTAINER_NAME

## CI/CD Pipeline Flow

1. Checkout code
2. Configure AWS credentials
3. Login to Amazon ECR
4. Generate tags (latest + commit SHA)
5. Build Docker image
6. Push image to Amazon ECR
7. Render updated ECS task definition
8. Deploy to Amazon ECS

## Logs and Health Checks

- Container logs stream to CloudWatch (/ecs/shopsphere).
- Health checks run every 30s via `GET /health`. Unhealthy tasks are replaced automatically.
