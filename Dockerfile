# ═══════════════════════════════════════════════════════════════
# ShopSphere — Production Dockerfile
# Strategy: Multi-stage build
#   Stage 1 (builder) : Node 20 Alpine — installs deps & builds React
#   Stage 2 (runner)  : Nginx 1.27 Alpine — serves static build ~25MB
# ═══════════════════════════════════════════════════════════════

# ── Stage 1: Build ──────────────────────────────────────────────
FROM node:20-alpine AS builder

LABEL stage="builder"

WORKDIR /app/client

# Copy dependency manifests first — maximises Docker layer caching
COPY client/package.json client/package-lock.json ./

# Install all dependencies (devDeps needed for Vite build)
RUN npm ci --frozen-lockfile --legacy-peer-deps

# Copy the rest of the client source
COPY client/ ./

# Build the production bundle (outputs to /app/client/dist)
RUN npm run build

# ── Stage 2: Serve ──────────────────────────────────────────────
FROM nginx:1.27-alpine AS runner

LABEL maintainer="ShopSphere <dev@shopsphere.in>"
LABEL org.opencontainers.image.title="ShopSphere"
LABEL org.opencontainers.image.description="Quick-commerce grocery delivery platform"

# Remove default Nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/app.conf

# Copy compiled React app from builder
COPY --from=builder /app/client/dist /usr/share/nginx/html

# Expose HTTP
EXPOSE 80

# ECS / Docker health check on the /health endpoint
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget -qO- http://localhost/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
