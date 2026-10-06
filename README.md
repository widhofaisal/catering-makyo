# Catering Mak Yo

Premium static marketing site for Catering Mak Yo, a family catering business in Semarang running since 1970. Built with Astro + Tailwind CSS v4, no CMS/backend/database — everything is edited through code.

## Stack

- [Astro](https://astro.build) (static output, zero client JS framework)
- TypeScript (strict)
- Tailwind CSS v4 (`@tailwindcss/vite`, CSS-based theme in `src/styles/global.css`)
- `@astrojs/sitemap` for automatic sitemap generation

## Getting started

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # type-checks then builds to dist/
npm run preview   # serve the production build locally
```

## Editing content

All editable business content lives in `src/data/` — no code changes needed elsewhere:

- `company.ts` — business info, address, phone/WhatsApp, hours, timeline, "why choose us" cards
- `menu.ts` — the 9 menu/package categories
- `testimonials.ts` — verified customer reviews, when available
- `gallery.ts` — documented business photos shown in the gallery

To swap a placeholder image for a real photo, replace the file at the same path under `public/images/` (menu/gallery/hero) and update the `image`/`src` field in the relevant data file if the filename changes.

### Photo and review notes

- **Reviews**: `src/data/testimonials.ts` intentionally contains no quotes until review text can be verified. The page links customers to the Google Maps listing for current ratings and reviews.
- **Photos**: the gallery uses documented business photos from Google Maps. Menu cards use business photos, permissively licensed stock photos, and generated food photography. Replace stock and generated images with business photography when available.
- **Mak Yo portrait**: `GrandmaPortrait.astro` is an original hand-drawn silhouette used as a brand mark. The hero uses a generated food image.
- **Social links**: `company.social` is intentionally empty — no official Instagram/Facebook was found. Add URLs there once accounts exist; the footer icons appear automatically.

### Verified business data

Name, address, phone, GPS, and hours in `company.ts` were confirmed directly against the live Google Maps listing on 2026-07-20 via `scripts/scrape-gmb.mjs` (a one-off Playwright script, not part of the site — run `npm install -D playwright && npx playwright install chromium` first if it ever needs to be re-run).

## Deployment (Cloudflare Pages)

This is a fully static site — no adapter needed.

1. Push this repo to GitHub/GitLab (Cloudflare Pages' Git integration needs a repo — this directory isn't a git repo yet).
2. In the Cloudflare Pages dashboard, create a project from the repo.
3. Build command: `npm run build`
4. Build output directory: `dist`
5. Add `cateringmakyo.site` as a custom domain in the Pages project settings once the first deploy succeeds.

`astro.config.mjs` has `site: 'https://cateringmakyo.site'` set, which drives canonical URLs, the sitemap, and Open Graph tags — update it there if the final domain changes.

## Project structure

```
src/
  components/       section components + ui/ primitives
  layouts/Layout.astro   SEO shell (meta, OG, JSON-LD LocalBusiness schema)
  pages/index.astro      single-page layout, sections in brief order
  data/                  editable content (see above)
  scripts/                two tiny vanilla scripts (navbar scroll state, scroll-reveal)
  styles/global.css       Tailwind v4 theme tokens + base styles
public/
  images/                 business photos, licensed menu photos, generated visuals, and SVG artwork
scripts/
  scrape-gmb.mjs              one-off Google Maps scraper (not part of the build)
  generate-placeholders.mjs   regenerates the SVG placeholder tiles
```
