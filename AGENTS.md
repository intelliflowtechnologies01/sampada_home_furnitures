# Sampada Furniture — Static Website

This is a static HTML/CSS/JS site (no framework, no build step).

## Conventions

- Pages are standalone `*.html` files in the repo root, linked with relative paths.
- All styles live in `assets/css/style.css` — design tokens are CSS custom
  properties in `:root`. Reuse existing classes; add new tokens there when needed.
- Catalog data (products, categories, reviews, reels, posts) lives in
  `assets/js/data.js` as the global `SF_DATA` object. Edit data there, not in markup.
- Interactivity (cart, wishlist, tabs, mobile menu, scroll reveal) is handled by
  Alpine.js + `assets/js/app.js`. Use Alpine directives (`x-data`, `x-show`,
  `@click`) consistent with the existing pages.
- No package manager, no Node runtime required to run or build. Serve the folder
  with any static file server for local dev.
- Deploy is via `.github/workflows/deploy.yml` → GitHub Pages (static files
  staged into `./out/` with a `.nojekyll` marker).
