#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
# ShopSphere — AWS Infrastructure Bootstrap Script
# Run this ONCE to create all required AWS resources before the first deploy.
#
# Prerequisites:
#   - AWS CLI v2 installed and configured (aws configure)
#   - IAM user with ECR, ECS, IAM, Secrets Manager permissions
#
# Usage:
#   chmod +x scripts/aws-setup.sh
#   ./scripts/aws-setup.sh
# ─────────────────────────────────────────────────────────────────────────────

set -euo pipefail

# ── Config (edit these before running) ───────────────────────────────────────
AWS_REGION="${AWS_REGION:-ap-south-1}"
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
CLUSTER_NAME="shopsphere-cluster"
FRONTEND_REPO="shopsphere-frontend"
BACKEND_REPO="shopsphere-backend"
FRONTEND_SERVICE="shopsphere-frontend-service"
BACKEND_SERVICE="shopsphere-backend-service"
LOG_GROUP_FRONTEND="/ecs/shopsphere-frontend"
LOG_GROUP_BACKEND="/ecs/shopsphere-backend"

echo "════════════════════════════════════════════════════"
echo " ShopSphere AWS Infrastructure Bootstrap"
echo " Account : $ACCOUNT_ID"
echo " Region  : $AWS_REGION"
echo "════════════════════════════════════════════════════"

# ── Step 1: Create ECR Repositories ──────────────────────────────────────────
echo ""
echo "→ [1/7] Creating ECR repositories..."

aws ecr create-repository \
  --repository-name $FRONTEND_REPO \
  --region $AWS_REGION \
  --image-scanning-configuration scanOnPush=true \
  --image-tag-mutability MUTABLE 2>/dev/null || echo "   ECR repo '$FRONTEND_REPO' already exists."

aws ecr create-repository \
  --repository-name $BACKEND_REPO \
  --region $AWS_REGION \
  --image-scanning-configuration scanOnPush=true \
  --image-tag-mutability MUTABLE 2>/dev/null || echo "   ECR repo '$BACKEND_REPO' already exists."

# Set lifecycle policy: keep last 10 images, delete untagged after 1 day
LIFECYCLE_POLICY='{
  "rules": [
    {
      "rulePriority": 1,
      "description": "Remove untagged images after 1 day",
      "selection": { "tagStatus": "untagged", "countType": "sinceImagePushed", "countUnit": "days", "countNumber": 1 },
      "action": { "type": "expire" }
    },
    {
      "rulePriority": 2,
      "description": "Keep last 10 tagged images",
      "selection": { "tagStatus": "tagged", "tagPrefixList": [""], "countType": "imageCountMoreThan", "countNumber": 10 },
      "action": { "type": "expire" }
    }
  ]
}'

aws ecr put-lifecycle-policy \
  --repository-name $FRONTEND_REPO \
  --lifecycle-policy-text "$LIFECYCLE_POLICY" \
  --region $AWS_REGION > /dev/null

aws ecr put-lifecycle-policy \
  --repository-name $BACKEND_REPO \
  --lifecycle-policy-text "$LIFECYCLE_POLICY" \
  --region $AWS_REGION > /dev/null

echo "   ✅ ECR repositories ready."

# ── Step 2: Create CloudWatch Log Groups ─────────────────────────────────────
echo ""
echo "→ [2/7] Creating CloudWatch log groups..."

aws logs create-log-group \
  --log-group-name $LOG_GROUP_FRONTEND \
  --region $AWS_REGION 2>/dev/null || echo "   Log group '$LOG_GROUP_FRONTEND' already exists."

aws logs put-retention-policy \
  --log-group-name $LOG_GROUP_FRONTEND \
  --retention-in-days 30 \
  --region $AWS_REGION

aws logs create-log-group \
  --log-group-name $LOG_GROUP_BACKEND \
  --region $AWS_REGION 2>/dev/null || echo "   Log group '$LOG_GROUP_BACKEND' already exists."

aws logs put-retention-policy \
  --log-group-name $LOG_GROUP_BACKEND \
  --retention-in-days 30 \
  --region $AWS_REGION

echo "   ✅ CloudWatch log groups ready (30-day retention)."

# ── Step 3: Create ECS Task Execution Role ────────────────────────────────────
echo ""
echo "→ [3/7] Creating ECS IAM roles..."

TRUST_POLICY='{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": { "Service": "ecs-tasks.amazonaws.com" },
    "Action": "sts:AssumeRole"
  }]
}'

aws iam create-role \
  --role-name ecsTaskExecutionRole \
  --assume-role-policy-document "$TRUST_POLICY" 2>/dev/null || echo "   Role 'ecsTaskExecutionRole' already exists."

aws iam attach-role-policy \
  --role-name ecsTaskExecutionRole \
  --policy-arn arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy

# Allow task execution role to read Secrets Manager
aws iam attach-role-policy \
  --role-name ecsTaskExecutionRole \
  --policy-arn arn:aws:iam::aws:policy/SecretsManagerReadWrite 2>/dev/null || true

echo "   ✅ IAM roles ready."

# ── Step 4: Create ECS Cluster ────────────────────────────────────────────────
echo ""
echo "→ [4/7] Creating ECS cluster..."

aws ecs create-cluster \
  --cluster-name $CLUSTER_NAME \
  --capacity-providers FARGATE FARGATE_SPOT \
  --default-capacity-provider-strategy \
    capacityProvider=FARGATE,weight=1 \
  --settings name=containerInsights,value=enabled \
  --region $AWS_REGION 2>/dev/null || echo "   ECS cluster '$CLUSTER_NAME' already exists."

echo "   ✅ ECS cluster ready (Container Insights enabled)."

# ── Step 5: Register Task Definitions ────────────────────────────────────────
echo ""
echo "→ [5/7] Registering ECS task definitions..."

# Replace placeholder values in task definition files
sed \
  -e "s/ACCOUNT_ID/$ACCOUNT_ID/g" \
  -e "s/REGION/$AWS_REGION/g" \
  .aws/task-definition-frontend.json > /tmp/td-frontend.json

sed \
  -e "s/ACCOUNT_ID/$ACCOUNT_ID/g" \
  -e "s/REGION/$AWS_REGION/g" \
  .aws/task-definition-backend.json > /tmp/td-backend.json

aws ecs register-task-definition \
  --cli-input-json file:///tmp/td-frontend.json \
  --region $AWS_REGION > /dev/null

aws ecs register-task-definition \
  --cli-input-json file:///tmp/td-backend.json \
  --region $AWS_REGION > /dev/null

echo "   ✅ Task definitions registered."

# ── Step 6: Create ECS Services ──────────────────────────────────────────────
echo ""
echo "→ [6/7] Creating ECS services..."
echo "   ⚠️  NOTE: Services require a VPC, subnets, and security group."
echo "   Update the subnet IDs and security group below before running."
echo ""

# Replace these with your actual VPC subnet IDs and security group
SUBNET_1="subnet-REPLACE_ME_1"
SUBNET_2="subnet-REPLACE_ME_2"
SECURITY_GROUP="sg-REPLACE_ME"

aws ecs create-service \
  --cluster $CLUSTER_NAME \
  --service-name $FRONTEND_SERVICE \
  --task-definition shopsphere-frontend \
  --desired-count 1 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[$SUBNET_1,$SUBNET_2],securityGroups=[$SECURITY_GROUP],assignPublicIp=ENABLED}" \
  --scheduling-strategy REPLICA \
  --deployment-configuration "maximumPercent=200,minimumHealthyPercent=100" \
  --health-check-grace-period-seconds 30 \
  --region $AWS_REGION 2>/dev/null || echo "   Service '$FRONTEND_SERVICE' already exists."

aws ecs create-service \
  --cluster $CLUSTER_NAME \
  --service-name $BACKEND_SERVICE \
  --task-definition shopsphere-backend \
  --desired-count 1 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[$SUBNET_1,$SUBNET_2],securityGroups=[$SECURITY_GROUP],assignPublicIp=ENABLED}" \
  --scheduling-strategy REPLICA \
  --deployment-configuration "maximumPercent=200,minimumHealthyPercent=100" \
  --health-check-grace-period-seconds 60 \
  --region $AWS_REGION 2>/dev/null || echo "   Service '$BACKEND_SERVICE' already exists."

echo "   ✅ ECS services ready."

# ── Step 7: Print GitHub Secrets to Configure ────────────────────────────────
echo ""
echo "→ [7/7] GitHub Secrets you must configure:"
echo ""
echo "   Go to: https://github.com/singhankit001/ShopSphere/settings/secrets/actions"
echo ""
echo "   Secret Name                  │ Value"
echo "   ─────────────────────────────┼─────────────────────────────────────────"
echo "   AWS_ACCESS_KEY_ID            │ <your IAM access key>"
echo "   AWS_SECRET_ACCESS_KEY        │ <your IAM secret key>"
echo "   AWS_REGION                   │ $AWS_REGION"
echo "   AWS_ACCOUNT_ID               │ $ACCOUNT_ID"
echo "   ECR_REPOSITORY_FRONTEND      │ $FRONTEND_REPO"
echo "   ECR_REPOSITORY_BACKEND       │ $BACKEND_REPO"
echo "   ECS_CLUSTER                  │ $CLUSTER_NAME"
echo "   ECS_SERVICE_FRONTEND         │ $FRONTEND_SERVICE"
echo "   ECS_SERVICE_BACKEND          │ $BACKEND_SERVICE"
echo "   CONTAINER_NAME_FRONTEND      │ shopsphere-frontend"
echo "   CONTAINER_NAME_BACKEND       │ shopsphere-backend"
echo ""
echo "════════════════════════════════════════════════════"
echo " ✅ AWS infrastructure bootstrap complete!"
echo " Next: Push to main branch to trigger the CI/CD pipeline."
echo "════════════════════════════════════════════════════"
