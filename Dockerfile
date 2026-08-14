# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* yarn.lock* ./

# Install dependencies
RUN npm install

# Copy environment variables (REQUIRED for build-time VITE_ variables)
COPY .env .env.example* ./

# Copy source code
COPY . .

# Build the application (VITE_ variables needed here)
RUN npm run build

# Production stage
FROM node:22-alpine

WORKDIR /app

# Install serve to run the production build
RUN npm install -g serve

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 5173

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:5173 || exit 1

# Run the application
CMD ["serve", "-s", "dist", "-l", "5173"]
