// ponytail: one-off tool to pull real photos off the Google Maps listing.
// playwright is intentionally NOT a persistent dependency (see scrape-gmb.mjs) —
// `npm install -D playwright && npx playwright install chromium` first.
// v2: headed mode (headless can trigger Google's "limited view" fallback,
// which hides most of the photo grid) + opens the full "Foto" gallery
// instead of just the single hero image, and scrolls to lazy-load all tiles.
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, 'output', 'photos');
mkdirSync(OUT_DIR, { recursive: true });

const MAPS_URL = 'https://maps.app.goo.gl/UpTa1Upv6NZUyjXu7';

function log(...args) {
  console.log(new Date().toISOString(), ...args);
}

function upscale(url) {
  return url.replace(/=w\d+-h\d+.*$/, '=w1600-h1600-k-no');
}

async function collectPhotoUrls(page) {
  return page.evaluate(() => {
    const set = new Set();
    document.querySelectorAll('img[src*="googleusercontent"]').forEach((img) => set.add(img.src));
    document.querySelectorAll('[style*="googleusercontent"]').forEach((el) => {
      const m = el.getAttribute('style').match(/url\("?(https:\/\/[^")]+googleusercontent[^")]+)"?\)/);
      if (m) set.add(m[1]);
    });
    return [...set];
  });
}

async function main() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ locale: 'id-ID', viewport: { width: 1440, height: 960 } });
  const page = await context.newPage();

  await page.goto(MAPS_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(2500);
  await page.waitForSelector('h1', { timeout: 20000 }).catch(() => {});

  // Open the full photo gallery via the "Foto" section heading, not just the hero image.
  let openedGallery = false;
  const gallerySelectors = [
    'button[aria-label*="Foto" i]',
    'a[aria-label*="Foto" i]',
    'div[role="button"][aria-label*="Foto" i]',
    'text=Foto',
    'button[jsaction*="heroHeaderImage"]',
    '[data-photo-index]',
  ];
  for (const sel of gallerySelectors) {
    try {
      const el = page.locator(sel).first();
      if (await el.isVisible({ timeout: 3000 })) {
        await el.click();
        await page.waitForTimeout(1500);
        openedGallery = true;
        log('Opened gallery via', sel);
        break;
      }
    } catch {
      // try next selector
    }
  }
  log('openedGallery =', openedGallery);

  await page.screenshot({ path: path.join(OUT_DIR, '..', 'gallery-open-debug.png') }).catch(() => {});

  // Iterate every category tab (Semua / Menu / Makanan & minuman / Oleh pemilik /
  // Street View & 360° / etc.) and scroll+collect within each — photo tiles are
  // lazy-loaded per-tab, and each tab can surface photos the others don't.
  const urlSet = new Set();
  const tabLabels = await page.locator('[role="tab"]').allInnerTexts().catch(() => []);
  log('Found tabs:', tabLabels);

  const tabCount = await page.locator('[role="tab"]').count().catch(() => 0);
  for (let t = 0; t < tabCount; t++) {
    try {
      const tab = page.locator('[role="tab"]').nth(t);
      const label = (await tab.innerText().catch(() => `tab-${t}`)).trim();
      await tab.click({ timeout: 3000 });
      await page.waitForTimeout(1000);
      log('Switched to tab:', label);
    } catch (e) {
      log(`tab ${t} click failed:`, e.message);
      continue;
    }

    for (let i = 0; i < 15; i++) {
      try {
        await page.mouse.wheel(0, 1500);
      } catch (e) {
        log('scroll failed:', e.message);
        break;
      }
      await page.waitForTimeout(400);
      (await collectPhotoUrls(page)).forEach((u) => urlSet.add(u));
    }
  }

  if (tabCount === 0) {
    // No tabs at all — just scroll the single gallery view.
    for (let i = 0; i < 20; i++) {
      await page.mouse.wheel(0, 1500);
      await page.waitForTimeout(400);
      (await collectPhotoUrls(page)).forEach((u) => urlSet.add(u));
    }
  }

  await page.screenshot({ path: path.join(OUT_DIR, '..', 'gallery-scrolled-debug.png') }).catch(() => {});

  const urls = [...urlSet];
  log(`Found ${urls.length} candidate photo URLs (raw, before upscale/dedupe-by-id)`);
  writeFileSync(path.join(OUT_DIR, '..', 'photo-urls.json'), JSON.stringify(urls, null, 2));

  // Dedupe by the photo's stable ID prefix (before the size suffix) so we don't
  // re-download the same photo at multiple thumbnail sizes.
  const byId = new Map();
  for (const u of urls) {
    const id = u.split('=w')[0].split('=s')[0];
    if (!byId.has(id) || u.length > byId.get(id).length) byId.set(id, u);
  }
  const uniqueUrls = [...byId.values()].map(upscale);
  log(`${uniqueUrls.length} unique photo(s) after dedupe`);

  const saved = [];
  for (let i = 0; i < uniqueUrls.length; i++) {
    const url = uniqueUrls[i];
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
