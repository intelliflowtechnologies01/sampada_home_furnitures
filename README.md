# Sampada Furniture — Static Website

Handcrafted luxury furniture storefront. A static, dependency-free site built
with semantic HTML, a custom CSS design system, and Alpine.js for lightweight
interactivity (cart, wishlist, tabs, mobile menu).

## Structure

```
.
├── index.html        # Home
├── products.html     # Product listing (filter by category via ?cat=)
├── product.html      # Product detail (load by ?id=)
├── about.html        # About / story
├── blog.html         # Journal
├── contact.html      # Contact + showrooms
├── assets/
│   ├── css/style.css # Design system + all component styles
│   └── js/
│       ├── data.js   # Catalog (categories, products, reviews, reels, posts)
│       └── app.js    # Cart/wishlist store, helpers, scroll reveal
└── .github/workflows/deploy.yml  # GitHub Pages deploy
```

## Run locally

No build step required — serve the folder with any static server:

```bash
npx http-server . -p 8095
# then open http://127.0.0.1:8095
```

## Deploy

Push to `main` (or `master`). The GitHub Actions workflow stages the HTML +
`assets/` into `./out/`, adds `.nojekyll`, and deploys to GitHub Pages.

## Editing content

- **Products / categories / reviews / reels / posts:** `assets/js/data.js`
- **Styles / design tokens:** `assets/css/style.css` (see `:root` variables at top)
- **Page markup:** the corresponding `*.html` file in the root
