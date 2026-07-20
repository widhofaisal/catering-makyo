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
- `menu.ts` — the 8 menu/package categories
- `testimonials.ts` — customer review cards (currently placeholder quotes, see note below)
- `gallery.ts` — masonry gallery image list

To swap a placeholder image for a real photo, replace the file at the same path under `public/images/` (menu/gallery/hero) and update the `image`/`src` field in the relevant data file if the filename changes.

### Known placeholders to revisit

- **Testimonials** (`src/data/testimonials.ts`): the live Google Maps listing (5.0★) doesn't expose written reviews without a logged-in session, so these are illustrative quotes matching real event types. Replace with genuine reviews as they come in.
- **Photos**: the Google Maps listing only has one public photo (a bihun goreng prasmanan tray) — it's already pulled in and used for the Prasmanan menu card and the first gallery slot (`public/images/gallery/gmb-bihun-goreng.jpg`, via `scripts/scrape-photos.mjs`). Everything else in menu/gallery/hero is a generated SVG placeholder (`scripts/generate-placeholders.mjs`). Drop real photography into `public/images/{menu,gallery,hero}/` using the same filenames as more photos become available.
- **Grandmother's photo**: the uploaded photo only ever existed as an inline image in chat — there is no file on disk for it, so it can't be read or processed into the codebase. The current brand mark (`GrandmaPortrait.astro`) is an original hand-drawn silhouette illustration inspired by her pose, per the brief's instruction not to use the raw photo directly. If you save the actual photo file into the project and point to its path, it can be added as a real (tastefully treated) photo in the Our Story section, separate from the illustrated brand mark used in the nav/hero/footer.
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
  images/                 placeholder assets, organized by section
scripts/
  scrape-gmb.mjs              one-off Google Maps scraper (not part of the build)
  generate-placeholders.mjs   regenerates the SVG placeholder tiles
```
