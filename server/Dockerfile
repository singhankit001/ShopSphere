FROM node:20-alpine AS deps
RUN apk add --no-cache dumb-init
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --frozen-lockfile

FROM node:20-alpine AS runner
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 appuser
WORKDIR /app

COPY --from=deps /usr/bin/dumb-init /usr/bin/dumb-init
COPY --from=deps /app/node_modules ./node_modules
COPY --chown=appuser:nodejs . .

USER appuser
EXPOSE 5001

HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD wget -qO- http://localhost:5001/api/health || exit 1

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server.js"]
