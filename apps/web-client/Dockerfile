# syntax=docker.io/docker/dockerfile:1

FROM node:22-alpine

WORKDIR /app

# Copy only package files first (for caching)
COPY package.json package-lock.json ./
COPY apps/web-client/package*.json ./

# Install dependencies
RUN npm ci

# Copy rest of app files (optional for dev, will be overwritten by volume)
COPY apps/web-client ./

# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED 1

# Start Next.js in development mode
# NOTE: Don't expose ports here, Compose will handle that for us

# Start dev server
CMD ["npm", "run", "dev"]
