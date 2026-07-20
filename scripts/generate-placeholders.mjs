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
  { bg1: '#FBF6EE', bg2: '#DBE6D2', accent: '#55703F' }, // green
];

// Simple bowl-with-steam line icon, centered in a 0 0 100 100 box.
const ICON = `
  <g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M28 52 h44 a2 2 0 0 1 2 2 c0 12 -10 22 -24 22 s-24 -10 -24 -22 a2 2 0 0 1 2 -2 Z" />
    <path d="M24 52 h52" />
    <path d="M42 30 c-4 4 -4 8 0 12" />
    <path d="M52 30 c-4 4 -4 8 0 12" />
    <path d="M62 30 c-4 4 -4 8 0 12" />
  </g>
`;

function tileSvg({ width, height, label, palette, id }) {
  const iconSize = Math.min(width, height) * 0.28;
  const iconX = width / 2 - iconSize / 2;
  const iconY = height / 2 - iconSize / 2 - (label ? height * 0.04 : 0);
  const gradId = `grad-${id}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="${label ?? 'Placeholder foto Catering Mak Yo'}">
  <defs>
    <linearGradient id="${gradId}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${palette.bg1}" />
      <stop offset="100%" stop-color="${palette.bg2}" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#${gradId})" />
  <rect x="8" y="8" width="${width - 16}" height="${height - 16}" fill="none" stroke="${palette.accent}" stroke-opacity="0.35" stroke-width="1.5" />
  <g transform="translate(${iconX}, ${iconY}) scale(${iconSize / 100})" color="${palette.accent}">
    ${ICON}
  </g>
  ${
    label
      ? `<text x="${width / 2}" y="${height * 0.72}" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="${Math.max(14, width * 0.045)}" font-weight="600" fill="${palette.accent}">${label}</text>`
      : ''
  }
</svg>`;
}

function write(dir, file, svg) {
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, file), svg, 'utf-8');
}

// --- Menu placeholders (8, 4:3-ish landscape cards) ---
const menuItems = [
  ['nasi-box', 'Nasi Box'],
  ['snack-box', 'Snack Box'],
  ['prasmanan', 'Prasmanan'],
  ['tumpeng', 'Tumpeng'],
  ['aqiqah', 'Aqiqah'],
  ['wedding', 'Wedding Catering'],
  ['corporate', 'Corporate Catering'],
  ['custom', 'Custom Package'],
];
menuItems.forEach(([slug, label], i) => {
  const svg = tileSvg({ width: 800, height: 600, label, palette: PALETTE[i % 2], id: `menu-${slug}` });
  write(path.join(PUBLIC_DIR, 'menu'), `${slug}.svg`, svg);
});

// --- Gallery placeholders (12, varied aspect for masonry) ---
const galleryDims = [
  1000, 600, 900, 700, 1100, 600, 800, 1000, 650, 950, 700, 850,
];
for (let i = 1; i <= 12; i++) {
  const height = galleryDims[i - 1];
  const svg = tileSvg({
    width: 800,
    height,
    label: null,
    palette: PALETTE[i % 2],
    id: `gallery-${i}`,
  });
  write(path.join(PUBLIC_DIR, 'gallery'), `gallery-${String(i).padStart(2, '0')}.svg`, svg);
}

// --- Hero decorative accents (3, square polaroid-style) ---
const heroAccents = [
  ['accent-1', 'Sajian Hangat'],
  ['accent-2', 'Cita Rasa Rumahan'],
  ['accent-3', 'Sejak 1970'],
];
heroAccents.forEach(([slug, label], i) => {
  const svg = tileSvg({ width: 500, height: 500, label, palette: PALETTE[i % 2], id: `hero-${slug}` });
  write(path.join(PUBLIC_DIR, 'hero'), `${slug}.svg`, svg);
});

console.log('Placeholder assets generated in public/images/{menu,gallery,hero}');
