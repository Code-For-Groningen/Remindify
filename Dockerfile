# Multi-stage Docker build for running both frontend and backend
FROM node:18-alpine AS frontend-builder

# Build frontend
WORKDIR /app/frontend
COPY remindify-frontend/ ./
RUN npm install
RUN npm run build

# Java backend stage
FROM maven:3.9.9-eclipse-temurin-17-alpine AS backend-builder

# Build backend
WORKDIR /app/backend
COPY remindify-backend/pom.xml ./
COPY remindify-backend/src ./src
RUN mvn clean package -DskipTests

# Final stage with nginx, supervisor, and both applications
FROM nginx:alpine

# Install Java Runtime, Node.js, supervisor, and curl for health checks
RUN apk add --no-cache openjdk17-jre nodejs npm supervisor curl

# Create app directories and data directory for H2 database
RUN mkdir -p /app/frontend /app/backend /app/backend/data /var/log/supervisor

# Copy built frontend
COPY --from=frontend-builder /app/frontend/.next /app/frontend/.next
COPY --from=frontend-builder /app/frontend/node_modules /app/frontend/node_modules
COPY --from=frontend-builder /app/frontend/package.json /app/frontend/
COPY --from=frontend-builder /app/frontend/next.config.ts /app/frontend/
COPY --from=frontend-builder /app/frontend/public /app/frontend/public

# Copy built backend
COPY --from=backend-builder /app/backend/target/*.jar /app/backend/app.jar

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy supervisor configuration
COPY supervisord.conf /etc/supervisord.conf

# Set proper permissions
RUN chown -R nobody:nobody /app/backend/data

# Expose port 80
EXPOSE 80

# Start supervisor which will manage nginx, backend, and frontend
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]

