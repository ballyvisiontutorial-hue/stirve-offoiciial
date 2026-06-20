# STRYDE — Premium Performance Footwear

A fully animated, 3D, billion-dollar brand website built with React + Vite + TypeScript + Tailwind CSS + Framer Motion.

## 🚀 Deploy to Vercel (Easiest Way)

### Option A: Deploy directly from Vercel CLI

```bash
npm install -g vercel
vercel
```

### Option B: Deploy via GitHub

1. Go to [github.com/new](https://github.com/new) and create a new repository
2. **DO NOT upload a ZIP file** — GitHub doesn't accept ZIPs
3. Instead, use one of these methods:

#### Method 1: GitHub Desktop (Easiest — No coding)
1. Download [GitHub Desktop](https://desktop.github.com/)
2. Clone your empty repo
3. Copy ALL files from this project (except `node_modules`, `.env`, `.vercel`, `dist`) into the cloned folder
4. Click "Commit" → write a message like "Initial commit"
5. Click "Push origin"
6. Go to [vercel.com/new](https://vercel.com/new) → Import your GitHub repo
7. Vercel will auto-detect Vite and deploy

#### Method 2: Git Command Line
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
# Copy all project files here (except node_modules, .env, .vercel, dist)
git add .
git commit -m "Initial commit"
git push origin main
```
Then go to [vercel.com/new](https://vercel.com/new) → Import repo → Deploy

#### Method 3: GitHub Web Upload (File by File)
1. Go to your GitHub repo
2. Click "Add file" → "Upload files"
3. Drag files ONE BY ONE (not as a ZIP)
4. You need these files/folders at minimum:
   - `package.json`
   - `package-lock.json`
   - `vercel.json`
   - `vite.config.ts`
   - `tsconfig.json`
   - `tsconfig.app.json`
   - `tsconfig.node.json`
   - `eslint.config.js`
   - `index.html`
   - `src/` (entire folder)
   - `api/` (entire folder)
   - `public/` (entire folder)
5. Commit changes
6. Go to [vercel.com/new](https://vercel.com/new) → Import repo → Deploy

## ⚙️ Environment Variables

The following are already set in `vercel.json`:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 🛠️ Local Development

```bash
npm install
npm run dev
```

## 📦 Build

```bash
npm run build
```

## 🗂️ Project Structure

```
├── api/                    # Vercel serverless API routes
│   ├── db-client.js        # Supabase client (pre-configured)
│   ├── products.js         # Product CRUD
│   ├── orders.js           # Order creation
│   └── reviews.js          # Reviews CRUD
├── public/                 # Static assets (images, videos, favicon)
├── src/
│   ├── components/         # Reusable UI components
│   ├── context/            # React context (Cart)
│   ├── pages/              # Page components
│   ├── App.tsx             # Main app with routing
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── vercel.json             # Vercel config + env vars + SPA rewrites
├── package.json
└── vite.config.ts
```

## ✨ Features

- 🎬 Cinematic video hero with parallax
- 🛒 Full shopping cart with checkout
- 👟 Product detail pages with specs, reviews, technology
- 📱 Fully responsive mobile experience
- 🎨 3D tilt cards, magnetic buttons, cursor glow
- ⚡ Code-split bundles for performance
- 🔍 SEO optimized with structured data
