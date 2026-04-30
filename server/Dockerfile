# ─────────────────────────────────────────────────────────────
# Stage 1: Dependencies — separate layer for better caching
# ─────────────────────────────────────────────────────────────
FROM node:20-alpine AS deps

# Add dumb-init for proper signal handling (PID 1)
RUN apk add --no-cache dumb-init

WORKDIR /app

# Copy only manifests for layer cache efficiency
COPY package.json package-lock.json ./

# Install production deps only
RUN npm ci --omit=dev --frozen-lockfile

# ─────────────────────────────────────────────────────────────
# Stage 2: Runtime — minimal production image
# ─────────────────────────────────────────────────────────────
FROM node:20-alpine AS runner

# Security: run as non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 appuser

WORKDIR /app

# Copy dumb-init from deps stage
COPY --from=deps /usr/bin/dumb-init /usr/bin/dumb-init

# Copy installed node_modules (prod only)
COPY --from=deps /app/node_modules ./node_modules

# Copy application source
COPY --chown=appuser:nodejs . .

# Switch to non-root user
USER appuser

# Expose API port
EXPOSE 5001

# Health check — polls the /api/health endpoint every 30s
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD wget -qO- http://localhost:5001/api/health || exit 1

# Use dumb-init to handle signals properly in containers
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server.js"]
