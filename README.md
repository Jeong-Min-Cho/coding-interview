# Blog Posts Application

A full-stack TypeScript blog posts application built for coding interviews.

## Features

- View all blog posts on the home page
- Create new posts with title, content, and author
- Like/unlike posts (tracked per browser session)
- Client-side routing with separate pages for viewing and creating posts
- Input validation on both frontend and backend
- Optimistic UI updates for likes

## Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| **Frontend** | React + Vite | React 19, Vite 7 |
| **Styling** | Tailwind CSS | 4.x |
| **Routing** | React Router | 7.x |
| **Backend** | Express | Express 5 |
| **Language** | TypeScript | 5.9 |
| **Testing** | Vitest | 4.x |
| **Frontend Testing** | React Testing Library | 16.x |
| **Backend Testing** | Supertest | 7.x |
| **Linting** | ESLint | 9.x |
| **Data** | In-memory | - |

## Project Structure

```
├── frontend/                    # React + Vite + TypeScript
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── PostCard.tsx     # Individual post display
│   │   │   ├── PostForm.tsx     # Create post form
│   │   │   └── PostList.tsx     # List of posts
│   │   ├── pages/               # Route pages
│   │   │   ├── HomePage.tsx     # Post list page
│   │   │   └── CreatePostPage.tsx # Create post page
│   │   ├── utils/
│   │   │   └── browserId.ts     # Browser session ID utility
│   │   ├── api.ts               # API client functions
│   │   ├── types.ts             # TypeScript types
│   │   ├── App.tsx              # Main app with routing
│   │   └── main.tsx             # Entry point
│   ├── tailwind.config.js       # Tailwind CSS config
│   └── vite.config.ts           # Vite config with API proxy
│
├── backend/                     # Express + TypeScript
│   ├── src/
│   │   ├── routes/
│   │   │   └── posts.ts         # Posts API routes
│   │   ├── app.ts               # Express app setup
│   │   ├── index.ts             # Server entry point
│   │   ├── store.ts             # In-memory data store
│   │   └── types.ts             # TypeScript types
│   └── vitest.config.ts         # Test config
│
└── CLAUDE.md                    # AI assistant instructions
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install all dependencies
cd frontend && npm install
cd ../backend && npm install
```

### Running the App

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:3001 |

### Running Tests

```bash
# Frontend tests
cd frontend && npm test         # Watch mode
cd frontend && npm run test:run # Single run

# Backend tests
cd backend && npm test          # Watch mode
cd backend && npm run test:run  # Single run
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/posts` | Get all posts |
| POST | `/api/posts` | Create a new post |
| PATCH | `/api/posts/:id/like` | Toggle like on a post |

### Request/Response Examples

**Create Post:**
```json
POST /api/posts
{
  "title": "My Post Title",
  "content": "Post content here...",
  "author": "John Doe"
}
```

**Toggle Like:**
```json
PATCH /api/posts/1/like
{
  "browserId": "unique-browser-id"
}
```

## Interview Requirements

### Task Requirements

- Build a simple full-stack application
- Use any framework within the **TypeScript ecosystem**
- Acceptable frameworks: React, Next.js, Vue, NestJS, Express, Node.js
- AI tools are allowed (Cursor, Claude, etc.)
- This simulates a real-life development scenario

### Deliverables

- Commit the project to a Git repository
- Share the repository with the interviewer

### What This Application Includes

- [x] TypeScript configured for both frontend and backend
- [x] React frontend with Vite and Tailwind CSS
- [x] Client-side routing with React Router
- [x] Express backend with hot reload (nodemon)
- [x] RESTful API for blog posts (CRUD operations)
- [x] Input sanitization and validation
- [x] Global error handling
- [x] API proxy configured (frontend → backend)
- [x] Testing framework ready (Vitest)
- [x] Tests for both frontend and backend
- [x] ESLint configured for both frontend and backend

## Tech Stack Rationale

### Why React + Vite?

- **React**: Industry standard, widely used, great ecosystem
- **Vite**: 10-100x faster than CRA, instant HMR, modern ESM-native

### Why Express?

- Minimal and unopinionated
- Everyone knows it
- Shows your code, not framework magic

### Why TypeScript?

- Catch bugs at compile time
- Better autocomplete and refactoring
- Industry expectation

### Why Vitest?

- Vite-native, extremely fast
- Jest-compatible API
- Works for both frontend and backend

### Why In-Memory Data?

- Zero configuration
- Interview-friendly (focus on logic)
- Easy to test
- Same CRUD patterns as a real database

## Scripts Reference

### Frontend

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm test` | Run tests in watch mode |
| `npm run test:run` | Run tests once |
| `npm run lint` | Lint code |

### Backend

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Compile TypeScript |
| `npm start` | Run compiled code |
| `npm test` | Run tests in watch mode |
| `npm run test:run` | Run tests once |
| `npm run lint` | Lint code |

## Notes

- The Vite dev server proxies `/api/*` requests to the backend
- Backend uses `app.ts` + `index.ts` split for testability
- CORS is enabled on the backend for flexibility
