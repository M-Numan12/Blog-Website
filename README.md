# CelebScope

Celebrity Biography & Entertainment Editorial Website built with **Next.js (App Router) + Tailwind CSS** (`client/`) and **Node.js + Express + MongoDB** (`server/`).

## Implemented Features

### Frontend (`client/`)
- **Editorial Design System**: Black (`#151515`), White (`#FFFFFF`), Gold (`#C9A44C`), Light Gray (`#F5F5F5`), Charcoal (`#252525`), Red (`#B83232`) with **Playfair Display** + **Inter** typography.
- **Public Pages**:
  - `/` — Editorial Homepage (Hero Story, Latest Stories, Popular Categories, Trending Stories, Featured Biographies, Recently Updated, Consent Newsletter)
  - `/celebrities`, `/actors`, `/singers`, `/influencers`, `/trending`, `/category/[slug]` — Paginated archive pages
  - `/celebrity/[slug]` — Full biography layout (Breadcrumbs, Hero figure + credit, Table of Contents, Quick Facts box, structured prose, FAQs, Sources & Corrections, Share links, Author review box, Moderated Comments, Related Profiles sidebar, JSON-LD schema)
  - `/author/[slug]` — Author archive & bio
  - `/search?q=...` — Full search page with empty state
  - `/about`, `/contact` (spam-protected form), `/privacy-policy`, `/terms`, `/disclaimer`, `/editorial-policy`, and custom 404
  - `/robots.txt` & `/sitemap.xml` — Dynamic SEO routes
- **Protected Admin CMS (`/admin`)**:
  - `/admin/login` — Cookie-based JWT sign-in
  - `/admin` — Editorial stats overview & Analytics/Search Console links
  - `/admin/articles`, `/admin/articles/new`, `/admin/articles/[id]/edit` — Workflow editor (`draft` → `review` → `scheduled` / `published` → `archived`), HTML preview & SEO fields
  - `/admin/categories`, `/admin/media`, `/admin/comments`, `/admin/audit-logs`

### Backend (`server/`)
- **REST API**: Public endpoints (`/api/articles`, `/api/articles/:slug`, `/api/authors/:slug`, `/api/categories`, `/api/search`, `/api/contact`, `/api/articles/:slug/comments`) and RBAC-protected Admin endpoints (`/api/admin/...`).
- **Security**: `bcryptjs` password hashing, HTTP-only JWT cookies, role checks (`admin`, `editor`, `author`), `helmet`, CORS, `express-rate-limit`, `zod` validation, `sanitize-html`, revision snapshots & audit logging.

## How to Run Locally

### 1. Backend (`server/`)
```bash
cd server
copy .env.example .env
npm install
npm run seed
npm run dev
```
Default seeded Admin credentials:
- **Email**: `admin@celebscope.com`
- **Password**: `ChangeMe123!` *(change before production)*

### 2. Frontend (`client/`)
```bash
cd client
copy .env.example .env.local
npm install
npm run dev
```

Open `http://localhost:3000` for the public website and `http://localhost:3000/admin/login` for the Admin CMS.
*(Note: The public frontend includes built-in fallback editorial profiles so it renders cleanly even before MongoDB is connected, and automatically switches to live MongoDB data once `server/` is running and seeded.)*
