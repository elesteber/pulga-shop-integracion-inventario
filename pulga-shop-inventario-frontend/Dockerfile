## Multi-stage Dockerfile for Pulga Shop frontend

# -------------------------------
# Build stage
# -------------------------------
FROM node:20 AS build

WORKDIR /app

# Accept build arguments for Vite environment variables
ARG VITE_API_URL
ARG VITE_SKIP_AUTH
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_SKIP_AUTH=$VITE_SKIP_AUTH

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build


# -------------------------------
# Runtime stage: Serve static build
# -------------------------------
FROM node:20-alpine

WORKDIR /app

# Install static server
RUN npm install -g serve@14.1.2

# Copy production build
COPY --from=build /app/dist ./dist

# Expose internal port
EXPOSE 3000

# Serve SPA correctly (important: --single evita redirects)
CMD ["serve", "-s", "dist", "--single", "-l", "3000"]
