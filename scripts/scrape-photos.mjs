// ponytail: one-off tool to pull real photos off the Google Maps listing.
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, 'output', 'photos');
mkdirSync(OUT_DIR, { recursive: true });

const MAPS_URL = 'https://maps.app.goo.gl/tT2QgQasdRXPtH4V6';

function log(...args) {
  console.log(new Date().toISOString(), ...args);
}

function upscale(url) {
  // Google photo URLs end in a size directive like =w150-h150-... ; request a larger version.
  return url.replace(/=w\d+-h\d+.*$/, '=w1600-h1600-k-no');
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ locale: 'id-ID', viewport: { width: 1400, height: 1000 } });
  const page = await context.newPage();

  await page.goto(MAPS_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(2500);
  await page.waitForSelector('h1', { timeout: 20000 }).catch(() => {});

  // Try clicking the header photo to open the photo viewer.
  const headerPhoto = page.locator('button[jsaction*="heroHeaderImage"], [data-photo-index]').first();
  let openedViewer = false;
  try {
    if (await headerPhoto.isVisible({ timeout: 5000 })) {
      await headerPhoto.click();
      await page.waitForTimeout(1500);
      openedViewer = true;
    }
  } catch (e) {
    log('could not open photo viewer via header click:', e.message);
  }

  if (!openedViewer) {
    // fallback: try the "Photos" section heading
    try {
      const photosHeading = page.locator('text=Foto').first();
      await photosHeading.click({ timeout: 5000 });
      await page.waitForTimeout(1000);
    } catch (e) {
      log('no Foto heading to click either:', e.message);
    }
  }

  await page.screenshot({ path: path.join(OUT_DIR, '..', 'photo-viewer-debug.png') }).catch(() => {});

  const urls = await page.evaluate(() => {
    const set = new Set();
    document.querySelectorAll('img[src*="googleusercontent"]').forEach((img) => set.add(img.src));
    // Also check CSS background-image (Maps often uses div backgrounds for photo tiles)
    document.querySelectorAll('[style*="googleusercontent"]').forEach((el) => {
      const m = el.getAttribute('style').match(/url\("?(https:\/\/[^")]+googleusercontent[^")]+)"?\)/);
      if (m) set.add(m[1]);
    });
    return [...set];
  });

  log(`Found ${urls.length} candidate photo URLs`);
  writeFileSync(path.join(OUT_DIR, '..', 'photo-urls.json'), JSON.stringify(urls, null, 2));

  const saved = [];
  for (let i = 0; i < urls.length; i++) {
    const url = upscale(urls[i]);
    try {
      const resp = await page.request.get(url);
      if (resp.ok()) {
        const buf = await resp.body();
        const file = `gmb-photo-${i + 1}.jpg`;
        writeFileSync(path.join(OUT_DIR, file), buf);
        saved.push({ file, sourceUrl: url, bytes: buf.length });
        log('saved', file, buf.length, 'bytes');
      } else {
        log('failed to fetch', url, resp.status());
      }
    } catch (e) {
      log('error fetching', url, e.message);
    }
  }

  writeFileSync(path.join(OUT_DIR, '..', 'photo-manifest.json'), JSON.stringify(saved, null, 2));
  await browser.close();
  log(`Done. Saved ${saved.length} photo(s) to ${OUT_DIR}`);
}

main().catch((err) => {
  console.error('Photo scraper failed:', err);
  process.exit(1);
});
