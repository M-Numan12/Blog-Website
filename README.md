# CelebScope

Celebrity Biography & Entertainment Editorial Website built with **Next.js (React) + Tailwind CSS** (`client/`) and **Node.js + Express + MongoDB** (`server/`).

## Project Structure

```text
Blog-Website/
├── client/                  # Frontend (Next.js App Router + Tailwind CSS)
│   ├── public/
│   └── src/
│       ├── app/             # Public pages, SEO routes & Admin Dashboard
│       ├── components/      # Reusable UI, layout, homepage, article & admin components
│       └── lib/             # API client, constants, SEO helpers & seed/mock data
├── server/                  # Backend (Node.js + Express + MongoDB)
│   ├── uploads/             # Local media upload directory (dev)
│   └── src/
│       ├── config/          # Database & environment configuration
│       ├── controllers/     # Business logic & request handlers
│       ├── middleware/      # Auth, RBAC, rate limiting, validation & errors
│       ├── models/          # Mongoose schemas (User, Article, Category, Media, etc.)
│       ├── routes/          # Public & protected Admin API routes
│       ├── seed/            # Initial database seed scripts
│       └── utils/           # Sanitization & slug helpers
├── .gitignore
└── README.md
```

## Getting Started

### 1. Backend (`server/`)
```bash
cd server
cp .env.example .env
npm install
npm run dev
```

### 2. Frontend (`client/`)
```bash
cd client
cp .env.example .env.local
npm install
npm run dev
```
