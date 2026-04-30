# ─────────────────────────────────────────────────────────────
# Stage 1: Build — Node 20 Alpine
# ─────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests first (layer caching)
COPY package.json package-lock.json ./

# Install all dependencies (including devDeps needed for build)
RUN npm ci --frozen-lockfile

# Copy source code
COPY . .

# Production build via Vite
RUN npm run build

# ─────────────────────────────────────────────────────────────
# Stage 2: Serve — Nginx Alpine (ultra-lightweight)
# ─────────────────────────────────────────────────────────────
FROM nginx:1.27-alpine AS runner

# Remove default Nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/app.conf

# Copy built React app from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

# Health check — Nginx responds on /health
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
