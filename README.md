# Promised Land Initiative — Website

A React + Vite site for Promised Land Initiative, built to deploy on
GitHub Pages behind a custom domain, with Cloudinary for media and
Firebase reserved for the upcoming admin app.

## Stack

- **React 19 + Vite** — no server required, builds to static files
- **React Router** — client-side routing (Home, About, Programs, program
  detail pages, Get Involved, Gallery, Contact)
- **Tailwind CSS v4** — custom theme tokens in `src/index.css` (colors,
  fonts) drawn from the organisation's logo
- **Cloudinary** — image/video delivery (`src/lib/cloudinary.js`)
- **Firebase** — reserved for the admin app / dynamic content
  (`src/lib/firebase.js`, currently commented out)

## Project structure

```
src/
  data/content.js      ← all site copy lives here (edit this, not the components)
  lib/cloudinary.js     ← Cloudinary URL helper
  lib/firebase.js       ← Firebase init (commented out until the project exists)
  components/           ← Nav, Footer, Swoosh (brand motif), shared UI bits
  pages/                ← one file per route
```

## Local development

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # outputs static site to dist/
npm run preview   # serve the production build locally
```

## Editing content

Open `src/data/content.js`. It holds the organisation's name, tagline,
vision/mission, core values, the eight programs (with activities), and
the "get involved" options. This is plain data — no code changes needed
to update copy.

Contact details fall back to `org.email` / `org.phone` / `org.location`
in this file, but once Firebase is connected (see below), the live
values entered in the admin app's Settings page take priority
automatically — no code change needed.

## Connecting Cloudinary (Gallery)

1. Create a Cloudinary account and note the **cloud name**.
2. Copy `.env.example` to `.env` and set `VITE_CLOUDINARY_CLOUD_NAME`.
3. Media uploaded from the admin app appears automatically — no manual
   step needed, as long as Firebase (below) is also connected, since
   that's where the admin app stores each upload's Cloudinary
   `public_id`.

## Connecting Firebase (live gallery + contact details)

The site works out of the box using the static content in
`src/data/content.js`. Once a Firebase project exists (the same one
the admin app, `pli-admin`, uses):

1. Copy `.env.example` to `.env` and fill in the Firebase Web App
   config values (Firebase console → Project settings → General →
   Your apps).
2. That's it — `src/lib/firebase.js` detects the config automatically
   and `src/lib/liveContent.js` switches the Gallery and Contact pages
   (and the footer) from the static fallback to live Firestore data:
   - **Gallery** reads the `gallery` collection the admin app writes to
     on every upload/delete, in real time.
   - **Contact / Footer** read the `settings/site` document the admin
     app's Settings page writes to.
3. If `.env` is left empty, or a Firestore read fails for any reason,
   the site falls back to `src/data/content.js` automatically — it
   never shows a broken page.

## Deploying to GitHub Pages with a custom domain

**One-time setup:**

1. Push this project to a GitHub repository.
2. In the repo, go to **Settings → Pages** and set **Source** to
   "GitHub Actions."
3. Add your Cloudinary/Firebase values as **Settings → Secrets and
   variables → Actions** secrets (same names as in `.env.example`) — the
   included workflow (`.github/workflows/deploy.yml`) reads them at
   build time so real keys never live in the repo.
4. Buy/point your domain: add a `CNAME` record (or `A` records, per
   GitHub's Pages docs) at your domain registrar pointing to
   `<your-username>.github.io`.
5. Create `public/CNAME` in this project containing just your domain,
   e.g.:
   ```
   www.promisedlandinitiative.org
   ```
   Commit it — Vite copies everything in `public/` into the build as-is,
   so GitHub Pages will pick it up automatically.

**From then on:** every push to `main` runs the GitHub Actions workflow,
builds the site, and deploys it automatically — no manual `gh-pages`
step needed.

If you deploy to `https://<username>.github.io/<repo>/` **without** a
custom domain, change `base: '/'` to `base: '/<repo>/'` in
`vite.config.js` first (see the comment there).

## SEO

The site ships with a full standard SEO setup:

- **Meta tags** — title, description, keywords, canonical URL, and
  `robots` in `index.html`, applied per-page automatically via
  `src/lib/useSEO.js` (each page calls `usePageSEO(title, description,
  path)` — see `src/pages/About.jsx` for an example). The 404 page sets
  `noindex` so it never gets indexed.
- **Open Graph + Twitter Card** tags, so links shared on WhatsApp,
  Facebook, or X show a proper title, description, and image
  (`public/og-image.jpg`, generated from the logo).
- **Structured data** — a `schema.org/NGO` JSON-LD block in
  `index.html` (name, founder, logo, area served) that helps Google
  show a richer search result.
- **`public/sitemap.xml`** — lists every route, including each of the
  8 program pages. **`public/robots.txt`** points crawlers to it.
- **Icons** — proper favicon (16/32px), `apple-touch-icon.png`, and
  `site.webmanifest` for browser tab / bookmark / home-screen icons.

### Before going live

1. **Replace the placeholder domain.** `https://www.promisedlandinitiative.org`
   appears in `index.html`, `src/lib/useSEO.js`, `public/sitemap.xml`,
   and `public/robots.txt` — swap in the real domain once it's live (a
   project-wide find-and-replace is enough, they all use the same
   string).
2. **Submit the sitemap** to
   [Google Search Console](https://search.google.com/search-console)
   and [Bing Webmaster Tools](https://www.bing.com/webmasters) after
   launch, so the site gets crawled quickly instead of waiting to be
   discovered.
3. **Note on client-side rendering:** this is a standard Vite/React SPA
   (no server-side rendering), so the very first HTML response only
   has the default homepage meta tags — per-page tags are applied by
   JavaScript right after. Google's crawler executes JavaScript and
   handles this fine today, but if search ranking becomes a priority
   later, pre-rendering (e.g. `vite-plugin-ssg` or moving to Next.js)
   would guarantee every crawler sees the final tags immediately. Not
   necessary to start.

