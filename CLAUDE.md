# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Full-stack TypeScript coding interview boilerplate with React frontend and Express backend.

## Commands

### Development

```bash
# Backend (Terminal 1)
cd backend && npm run dev

# Frontend (Terminal 2)
cd frontend && npm run dev
```

### Testing

```bash
# Frontend tests (watch mode)
cd frontend && npm test

# Frontend tests (single run)
cd frontend && npm run test:run

# Backend tests (watch mode)
cd backend && npm test

# Backend tests (single run)
cd backend && npm run test:run
```

### Build & Lint

```bash
# Frontend
cd frontend && npm run build
cd frontend && npm run lint

# Backend
cd backend && npm run build
```

## Architecture

### Frontend (`frontend/`)
- **React 19 + Vite 7** with TypeScript
- Entry: `src/main.tsx` → `src/App.tsx`
- Dev server runs on port **5173**
- API proxy configured: `/api/*` → `http://localhost:3001`
- Testing: Vitest + React Testing Library with jsdom environment

### Backend (`backend/`)
- **Express 5** with TypeScript
- Split architecture for testability:
  - `src/app.ts` - Express app configuration (exported for testing)
  - `src/index.ts` - Server entry point
- Dev server runs on port **3001**
- Testing: Vitest + Supertest with node environment

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/hello` | Example endpoint |

## Key Patterns

- Backend uses `app.ts`/`index.ts` separation to allow importing the Express app without starting the server (enables Supertest testing)
- Frontend uses Vite proxy for API calls - no CORS issues in development
- In-memory data storage by design (no database setup required)
