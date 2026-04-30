#!/bin/bash
# ShopSphere AWS Infrastructure Bootstrap
# Usage: ./scripts/aws-setup.sh

set -euo pipefail

AWS_REGION="${AWS_REGION:-ap-south-1}"
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
REPO_NAME="shopsphere"
CLUSTER_NAME="shopsphere-cluster"
SERVICE_NAME="shopsphere-service"
TASK_FAMILY="shopsphere-task"
CONTAINER_NAME="shopsphere"
LOG_GROUP="/ecs/shopsphere"

SUBNET_ID_1="${SUBNET_ID_1:-subnet-REPLACE_ME}"
SUBNET_ID_2="${SUBNET_ID_2:-subnet-REPLACE_ME}"
SECURITY_GROUP_ID="${SECURITY_GROUP_ID:-sg-REPLACE_ME}"
ECR_URI="${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${REPO_NAME}"

echo "Starting AWS Infrastructure Setup for ShopSphere"
echo "Account: ${ACCOUNT_ID} | Region: ${AWS_REGION}"

echo "[1/6] Creating ECR repository: ${REPO_NAME}"
aws ecr create-repository \
  --repository-name "${REPO_NAME}" \
  --region "${AWS_REGION}" \
  --image-scanning-configuration scanOnPush=true \
  --image-tag-mutability MUTABLE 2>/dev/null || true

aws ecr put-lifecycle-policy \
  --repository-name "${REPO_NAME}" \
  --region "${AWS_REGION}" \
  --lifecycle-policy-text '{
    "rules": [
      {
        "rulePriority": 1,
        "description": "Expire untagged images after 1 day",
        "selection": {
          "tagStatus": "untagged",
          "countType": "sinceImagePushed",
          "countUnit": "days",
          "countNumber": 1
        },
        "action": { "type": "expire" }
      },
      {
        "rulePriority": 2,
        "description": "Keep last 10 tagged images",
        "selection": {
          "tagStatus": "tagged",
          "tagPrefixList": [""],
          "countType": "imageCountMoreThan",
          "countNumber": 10
        },
        "action": { "type": "expire" }
      }
    ]
  }' > /dev/null

echo "[2/6] Creating CloudWatch log group: ${LOG_GROUP}"
aws logs create-log-group \
  --log-group-name "${LOG_GROUP}" \
  --region "${AWS_REGION}" 2>/dev/null || true

aws logs put-retention-policy \
  --log-group-name "${LOG_GROUP}" \
  --retention-in-days 30 \
  --region "${AWS_REGION}"

echo "[3/6] Creating IAM task execution role: ecsTaskExecutionRole"
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
  --assume-role-policy-document "${TRUST_POLICY}" 2>/dev/null || true

aws iam attach-role-policy \
  --role-name ecsTaskExecutionRole \
  --policy-arn arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy \
  2>/dev/null || true

aws iam attach-role-policy \
  --role-name ecsTaskExecutionRole \
  --policy-arn arn:aws:iam::aws:policy/CloudWatchLogsFullAccess \
  2>/dev/null || true

echo "[4/6] Creating ECS cluster: ${CLUSTER_NAME}"
aws ecs create-cluster \
  --cluster-name "${CLUSTER_NAME}" \
  --capacity-providers FARGATE FARGATE_SPOT \
  --default-capacity-provider-strategy capacityProvider=FARGATE,weight=1 \
  --settings name=containerInsights,value=enabled \
  --region "${AWS_REGION}" 2>/dev/null || true

echo "[5/6] Registering ECS task definition: ${TASK_FAMILY}"
TASK_DEFINITION=$(cat <<EOF
{
  "family": "${TASK_FAMILY}",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "executionRoleArn": "arn:aws:iam::${ACCOUNT_ID}:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "${CONTAINER_NAME}",
      "image": "${ECR_URI}:latest",
      "essential": true,
      "portMappings": [
        {
          "containerPort": 80,
          "hostPort": 80,
          "protocol": "tcp"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "${LOG_GROUP}",
          "awslogs-region": "${AWS_REGION}",
          "awslogs-stream-prefix": "ecs",
          "awslogs-create-group": "true"
        }
      },
      "healthCheck": {
        "command": ["CMD-SHELL", "wget -qO- http://localhost/health || exit 1"],
        "interval": 30,
        "timeout": 5,
        "retries": 3,
        "startPeriod": 15
      },
      "environment": [
        { "name": "NODE_ENV", "value": "production" }
      ],
      "stopTimeout": 30
    }
  ]
}
EOF
)

aws ecs register-task-definition \
  --cli-input-json "${TASK_DEFINITION}" \
  --region "${AWS_REGION}" \
  --query 'taskDefinition.taskDefinitionArn' \
  --output text > /dev/null

echo "[6/6] Creating ECS service: ${SERVICE_NAME}"
if [[ "${SUBNET_ID_1}" == "subnet-REPLACE_ME" ]]; then
  echo "Skipping service creation — subnet IDs not configured."
else
  aws ecs create-service \
    --cluster "${CLUSTER_NAME}" \
    --service-name "${SERVICE_NAME}" \
    --task-definition "${TASK_FAMILY}" \
    --desired-count 1 \
    --launch-type FARGATE \
    --network-configuration "awsvpcConfiguration={subnets=[${SUBNET_ID_1},${SUBNET_ID_2}],securityGroups=[${SECURITY_GROUP_ID}],assignPublicIp=ENABLED}" \
    --deployment-configuration "maximumPercent=200,minimumHealthyPercent=100" \
    --health-check-grace-period-seconds 30 \
    --region "${AWS_REGION}" 2>/dev/null || true
fi

echo ""
echo "Setup complete. Configure these GitHub Secrets:"
echo "AWS_ACCESS_KEY_ID"
echo "AWS_SECRET_ACCESS_KEY"
echo "AWS_REGION             ${AWS_REGION}"
echo "ECR_REPOSITORY         ${REPO_NAME}"
echo "ECS_CLUSTER            ${CLUSTER_NAME}"
echo "ECS_SERVICE            ${SERVICE_NAME}"
echo "ECS_TASK_DEFINITION    .aws/task-definition.json"
echo "CONTAINER_NAME         ${CONTAINER_NAME}"
