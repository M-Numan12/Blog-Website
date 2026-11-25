# Deploying CelebScope on Hostinger Business / Cloud Hosting (Node.js Web App)

Hostinger Business & Cloud plans support **Node.js Web Apps** directly from GitHub via **hPanel**, and use **MongoDB Atlas** (free tier) for MongoDB databases.

---

## Step 1: Create Free MongoDB Atlas Database
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas) and create a free **M0 Cluster**.
2. Under **Database Access**, create a database user (save username & password).
3. Under **Network Access**, add `0.0.0.0/0` (Allow Access from Anywhere — required for Hostinger Cloud/Business dynamic outbound IPs).
4. Click **Connect → Drivers** and copy your `MONGODB_URI`:
   ```text
   mongodb+srv://<user>:<password>@<cluster>.mongodb.net/celebscope?retryWrites=true&w=majority
   ```

---

## Step 2: Deploy Backend (`server/`) on `api.yourdomain.com`
1. In **Hostinger hPanel**, go to **Websites → Add Website → Node.js Web App**.
2. Connect your GitHub repository: `M-Numan12/Blog-Website` (branch: `main`).
3. Assign subdomain: **`api.yourdomain.com`** (make sure SSL/HTTPS is enabled).
4. Configure Build & App settings:
   - **Node.js Version**: `20.x` (or `22.x`)
   - **Root Directory**: `server`
   - **Install Command**: `npm install`
   - **Build Command**: *(leave blank)*
   - **Start Command / Entry File**: `npm start` (or `src/index.js`)
5. Add **Environment Variables** in hPanel:
   - `NODE_ENV` = `production`
   - `MONGODB_URI` = `<your MongoDB Atlas URI>`
   - `JWT_SECRET` = `<strong random 64-char secret>`
   - `JWT_EXPIRES_IN` = `7d`
   - `CLIENT_URL` = `https://yourdomain.com,https://www.yourdomain.com`
   - `COOKIE_SAME_SITE` = `none`
6. Click **Deploy** and test `https://api.yourdomain.com/api/health` — it should return `{"status":"ok","service":"celebscope-server"}`.
7. Seed initial categories, admin user, and 10 blogs once (via Hostinger SSH or locally pointing `.env` `MONGODB_URI` to Atlas):
   ```bash
   cd server
   npm run seed
   ```

---

## Step 3: Deploy Frontend (`client/`) on `yourdomain.com`
1. In **Hostinger hPanel**, go to **Websites → Add Website → Node.js Web App**.
2. Connect the same GitHub repository: `M-Numan12/Blog-Website` (branch: `main`).
3. Assign your main domain: **`yourdomain.com`**.
4. Configure Build & App settings:
   - **Framework Preset**: `Next.js`
   - **Node.js Version**: `20.x` (or `22.x`)
   - **Root Directory**: `client`
   - **Install Command**: `npm install`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
5. Add **Environment Variables** in hPanel:
   - `NEXT_PUBLIC_API_URL` = `https://api.yourdomain.com/api`
   - `NEXT_PUBLIC_SITE_URL` = `https://yourdomain.com`
6. Click **Deploy**!

---

## Step 4: Verify Live Deployment
- Public Website: `https://yourdomain.com`
- Sitemap: `https://yourdomain.com/sitemap.xml`
- Robots: `https://yourdomain.com/robots.txt`
- Admin Dashboard: `https://yourdomain.com/admin/login`
  - Default seeded login: `admin@celebscope.com` / `ChangeMe123!` *(change immediately in production)*
