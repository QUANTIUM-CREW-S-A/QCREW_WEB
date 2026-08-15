# Build stage
# Alpine puro en lugar de node:24-alpine: la capa de Node de las imágenes
# oficiales arrastra CVEs críticas que los paquetes de Alpine ya tienen
# parcheadas. Sólo se traslada /app/dist a producción.
FROM alpine:3.22 AS builder

RUN apk add --no-cache nodejs npm

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* yarn.lock* ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Vite sólo expone VITE_* al bundle. El .env usa nombres SUPABASE_*; hacemos
# el mapeo sólo en el proceso de build y nunca usamos SUPABASE_SECRET_KEY.
RUN --mount=type=secret,id=vite_env,target=/app/.env \
    set -a && . /app/.env && \
    export VITE_SUPABASE_URL="${SUPABASE_URL:-$VITE_SUPABASE_URL}" \
        VITE_SUPABASE_PUBLISHABLE_KEY="${SUPABASE_PUBLISHABLE_KEY:-$VITE_SUPABASE_PUBLISHABLE_KEY}" \
        VITE_TURNSTILE_SITE_KEY="${TURNSTILE_SITE_KEY:-$VITE_TURNSTILE_SITE_KEY}" && \
    npm run build

# Production stage
FROM nginx:alpine

# Configuración del SPA (fallback de rutas y cabeceras de seguridad)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built application from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 5173

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://127.0.0.1:5173 || exit 1
