# Remindify Docker Setup

This repository contains Docker configurations for both the frontend and backend applications.

## Quick Start

### Production Mode
To run both applications using Docker Compose:

```bash
# Build and start both applications
docker-compose up --build

# Or run in detached mode
docker-compose up --build -d
```

### Development Mode
To run with hot reloading and development features:

```bash
# Build and start both applications in development mode
docker-compose -f docker-compose.dev.yml up --build

# Or run in detached mode
docker-compose -f docker-compose.dev.yml up --build -d
```

## Reverse Proxy Configuration

The frontend is configured with a reverse proxy that automatically forwards all `/api/*` requests to the backend service running on port 8080. This works in both development and production modes.

- Frontend requests to `/api/users` → Backend `http://remindify-backend:8080/api/users`
- This allows seamless API integration without CORS issues

## Individual Services

### Backend (Spring Boot)
- **Port**: 8080
- **Technology**: Java 17 + Spring Boot + Maven
- **Dockerfile**: `remindify-backend/Dockerfile`

To run only the backend:
```bash
docker-compose up --build remindify-backend
```

### Frontend (Next.js)
- **Port**: 3000
- **Technology**: Next.js + React + TypeScript
- **Dockerfile**: `remindify-frontend/Dockerfile`

To run only the frontend:
```bash
docker-compose up --build remindify-frontend
```

## Useful Commands

### Production
```bash
# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# View logs
docker-compose logs

# View logs for specific service
docker-compose logs remindify-backend
docker-compose logs remindify-frontend

# Rebuild and restart a specific service
docker-compose up --build --no-deps remindify-frontend
```

### Development
```bash
# Stop all development services
docker-compose -f docker-compose.dev.yml down

# View development logs
docker-compose -f docker-compose.dev.yml logs

# Rebuild and restart frontend in development mode
docker-compose -f docker-compose.dev.yml up --build --no-deps remindify-frontend

# Execute commands in running containers
docker-compose -f docker-compose.dev.yml exec remindify-backend bash
docker-compose -f docker-compose.dev.yml exec remindify-frontend sh
```

## Environment Variables

### Frontend
- `NEXT_PUBLIC_API_URL`: URL of the backend API (default: http://localhost:8080)

### Backend
- `SPRING_PROFILES_ACTIVE`: Spring profile to use (default: prod)

## Health Checks

The backend service includes a health check that verifies the application is responding on port 8080. The frontend service will wait for the backend to be healthy before starting.

## Development

### Docker Development Mode
Use the development docker-compose file for hot reloading and development features:

```bash
docker-compose -f docker-compose.dev.yml up --build
```

This provides:
- Hot reloading for frontend changes
- Volume mounting for real-time code updates
- Development environment variables
- Reverse proxy from `/api/*` to backend

### Local Development
For development without Docker, you may want to run the applications locally:

- Backend: `cd remindify-backend && ./mvnw spring-boot:run`
- Frontend: `cd remindify-frontend && npm run dev`

Note: When running locally, you'll need to configure the API URL manually or update the Next.js proxy configuration.
