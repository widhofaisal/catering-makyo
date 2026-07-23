// ponytail: one-off asset generator, not part of the site runtime.
// Produces brand-colored SVG placeholder tiles for public/images/*.
// Run with `node scripts/generate-placeholders.mjs`.
import { writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, '..', 'public', 'images');

const PALETTE = [
  { bg1: '#FBF6EE', bg2: '#E8D5A8', accent: '#9C7A3C' }, // gold
  { bg1: '#FBF6EE', bg2: '#F0D9C8', accent: '#A3441F' }, // terracotta
];

// Line icons in a shared visual language (stroke 3, round joins, 0-100 box).
const ICONS = {
  bowl: `<path d="M28 52 h44 a2 2 0 0 1 2 2 c0 12 -10 22 -24 22 s-24 -10 -24 -22 a2 2 0 0 1 2 -2 Z" />
    <path d="M24 52 h52" />
    <path d="M42 30 c-4 4 -4 8 0 12" />
    <path d="M52 30 c-4 4 -4 8 0 12" />
    <path d="M62 30 c-4 4 -4 8 0 12" />`,
  box: `<rect x="22" y="42" width="56" height="34" rx="4" />
    <path d="M20 42 h60 l-6 -14 h-48 Z" />
    <path d="M50 42 v-14" />`,
  cookie: `<path d="M50 24 a26 26 0 1 0 0.01 0 Z" />
    <circle cx="40" cy="42" r="2.4" fill="currentColor" stroke="none" />
    <circle cx="59" cy="46" r="2.4" fill="currentColor" stroke="none" />
    <circle cx="45" cy="59" r="2.4" fill="currentColor" stroke="none" />
    <circle cx="61" cy="61" r="2.4" fill="currentColor" stroke="none" />`,
  buffet: `<path d="M24 70 h52" />
    <path d="M30 70 v-16 a20 20 0 0 1 40 0 v16" />
    <path d="M50 32 v-8" />`,
  cone: `<path d="M50 20 L73 74 H27 Z" />
    <path d="M18 74 h64" />`,
  flame: `<path d="M50 18 c11 15 15 24 8 34 c-2.5 3.5 -6.5 5.5 -8 5.5 c-1.5 0 -5.5 -2 -8 -5.5 c-7 -10 -3 -19 8 -34 Z" />
    <path d="M50 44 c4.5 4.5 4.5 9.5 0 14 c-4.5 -4.5 -4.5 -9.5 0 -14 Z" />`,
  gift: `<rect x="24" y="44" width="52" height="32" rx="3" />
    <path d="M24 56 h52" />
    <path d="M50 44 v32" />
    <path d="M42 44 c-9 -15 8 -22 8 -9 c0 -13 17 -6 8 9 Z" />`,
  rings: `<path d="M40 56 a14 14 0 1 0 0.01 0 Z" />
    <path d="M60 56 a14 14 0 1 0 0.01 0 Z" />`,
  briefcase: `<rect x="22" y="42" width="56" height="34" rx="4" />
    <path d="M40 42 v-7 a4 4 0 0 1 4 -4 h12 a4 4 0 0 1 4 4 v7" />
    <path d="M22 57 h56" />`,
  spoon: `<ellipse cx="50" cy="35" rx="12" ry="16" />
    <path d="M50 51 v29" />`,
  heart: `<path d="M50 76 C32 61 23 48 23 36 a13 13 0 0 1 27 -6 a13 13 0 0 1 27 6 c0 12 -9 25 -27 40 Z" />`,
  sparkle: `<path d="M50 18 L57 43 L82 50 L57 57 L50 82 L43 57 L18 50 L43 43 Z" />`,
  tent: `<path d="M50 22 L82 76 H18 Z" />
    <path d="M12 76 h76" />
    <path d="M40 76 Q50 60 60 76" />`,
  laurel: `<path d="M32 72 C25 56 27 38 38 26" />
    <path d="M38 26 c-1 6 3 10 7 8" />
    <path d="M34 42 c-2 5 2 9 7 7" />
    <path d="M32 58 c-3 5 1 9 7 7" />
    <path d="M68 72 C75 56 73 38 62 26" />
    <path d="M62 26 c1 6 -3 10 -7 8" />
    <path d="M66 42 c2 5 -2 9 -7 7" />
    <path d="M68 58 c3 5 -1 9 -7 7" />`,
};

function escapeXml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function tileSvg({ width, height, label, palette, id, icon = 'bowl', iconScale = 0.3, badge = true }) {
  const safeLabel = label ? escapeXml(label) : label;
  const iconSize = Math.min(width, height) * iconScale;
  const badgeR = iconSize * 0.72;
  const cx = width / 2;
  const cy = height / 2 - (label ? height * 0.05 : 0);
  const iconX = cx - iconSize / 2;
  const iconY = cy - iconSize / 2;
  const gradId = `grad-${id}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="${safeLabel ?? 'Placeholder foto Catering Mak Yo'}">
  <defs>
    <linearGradient id="${gradId}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${palette.bg1}" />
      <stop offset="100%" stop-color="${palette.bg2}" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#${gradId})" />
  <rect x="8" y="8" width="${width - 16}" height="${height - 16}" fill="none" stroke="${palette.accent}" stroke-opacity="0.35" stroke-width="1.5" />
  ${badge ? `<circle cx="${cx}" cy="${cy}" r="${badgeR}" fill="${palette.accent}" fill-opacity="0.12" />` : ''}
  <g transform="translate(${iconX}, ${iconY}) scale(${iconSize / 100})" fill="none" stroke="${palette.accent}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    ${ICONS[icon]}
  </g>
  ${
    safeLabel
      ? `<text x="${width / 2}" y="${height * 0.72}" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="${Math.max(14, width * 0.045)}" font-weight="600" fill="${palette.accent}">${safeLabel}</text>`
      : ''
  }
</svg>`;
}

function write(dir, file, svg) {
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, file), svg, 'utf-8');
}

// --- Menu placeholders (categories without a real/stock photo) ---
const menuItems = [
  ['pramuka-perkemahan', 'Katering Pramuka & Perkemahan', 'tent'],
  ['custom', 'Custom Package', 'sparkle'],
];
menuItems.forEach(([slug, label, icon], i) => {
  const svg = tileSvg({ width: 800, height: 600, label, icon, palette: PALETTE[i % 2], id: `menu-${slug}` });
  write(path.join(PUBLIC_DIR, 'menu'), `${slug}.svg`, svg);
});

// --- Gallery placeholders (only the mood/lifestyle slots without a good
// real or stock-photo match still use generated tiles) ---
const galleryItems = [
  ['11', 700, 'spoon', 'Penyajian'],
  ['12', 850, 'heart', 'Kebersamaan'],
];
galleryItems.forEach(([num, height, icon, label], i) => {
  const svg = tileSvg({ width: 800, height, label, icon, palette: PALETTE[i % 2], id: `gallery-${num}` });
  write(path.join(PUBLIC_DIR, 'gallery'), `gallery-${num}.svg`, svg);
});

console.log('Placeholder assets generated in public/images/{menu,gallery}');
