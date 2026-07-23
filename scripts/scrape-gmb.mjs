// ponytail: one-off research tool, not part of the shipped site. Run with `node scripts/scrape-gmb.mjs`.
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, 'output');
mkdirSync(OUT_DIR, { recursive: true });

const MAPS_URL = 'https://maps.app.goo.gl/UpTa1Upv6NZUyjXu7';

function log(...args) {
  console.log(new Date().toISOString(), ...args);
}

async function dismissConsent(page) {
  const consentSelectors = [
    'button:has-text("Terima semua")',
    'button:has-text("Accept all")',
    'button:has-text("Reject all")',
    'button:has-text("Tolak semua")',
    'form[action*="consent"] button',
  ];
  for (const sel of consentSelectors) {
    try {
      const btn = page.locator(sel).first();
      if (await btn.isVisible({ timeout: 3000 })) {
        await btn.click();
        log('Dismissed consent dialog via', sel);
        await page.waitForTimeout(1000);
        return;
      }
    } catch {
      // selector not present, keep trying
    }
  }
  log('No consent dialog detected (or already dismissed).');
}

async function extractHeaderInfo(page) {
  const result = { name: null, category: null, rating: null, reviewCount: null };
  try {
    result.name = await page.locator('h1').first().innerText({ timeout: 10000 });
  } catch (e) {
    log('name extraction failed:', e.message);
  }
  try {
    const ratingBtn = page.locator('span[role="img"][aria-label*="star" i], span[role="img"][aria-label*="bintang" i]').first();
    const ariaLabel = await ratingBtn.getAttribute('aria-label', { timeout: 5000 });
    result.rating = ariaLabel;
  } catch (e) {
    log('rating extraction failed:', e.message);
  }
  try {
    const reviewBtn = page.locator('button[aria-label*="review" i], button[aria-label*="ulasan" i]').first();
    result.reviewCount = await reviewBtn.getAttribute('aria-label', { timeout: 5000 });
  } catch (e) {
    log('review count extraction failed:', e.message);
  }
  try {
    result.category = await page.locator('button[jsaction*="category"]').first().innerText({ timeout: 5000 });
  } catch (e) {
    log('category extraction failed:', e.message);
  }
  return result;
}

async function extractContactInfo(page) {
  const result = { address: null, phone: null, website: null, planCode: null };
  const buttons = page.locator('button[data-item-id], a[data-item-id]');
  const count = await buttons.count();
  for (let i = 0; i < count; i++) {
    const btn = buttons.nth(i);
    const itemId = (await btn.getAttribute('data-item-id')) || '';
    const ariaLabel = (await btn.getAttribute('aria-label')) || '';
    if (itemId === 'address') result.address = ariaLabel.replace(/^Address:\s*/i, '');
    if (itemId.startsWith('phone')) result.phone = ariaLabel.replace(/^Phone:\s*/i, '');
    if (itemId === 'authority') result.website = ariaLabel.replace(/^Website:\s*/i, '');
  }
  return result;
}

async function extractHours(page) {
  const hours = [];
  try {
    const hoursToggle = page.locator('button[aria-label*="hour" i], button[aria-label*="jam" i], div[jsaction*="openhours"]').first();
    if (await hoursToggle.isVisible({ timeout: 5000 })) {
      await hoursToggle.click();
      await page.waitForTimeout(800);
    }
  } catch (e) {
    log('could not open hours dropdown:', e.message);
  }
  try {
    const rows = page.locator('table tr');
    const rowCount = await rows.count();
    for (let i = 0; i < rowCount; i++) {
      const text = await rows.nth(i).innerText();
      if (text.trim()) hours.push(text.replace(/\n/g, ' ').trim());
    }
  } catch (e) {
    log('hours table extraction failed:', e.message);
  }
  return hours;
}

async function extractReviews(page) {
  const reviews = [];
  try {
    // Match the tab whose label is exactly "Ulasan"/"Reviews" — a loose
    // has-text() substring match also catches "Tulis ulasan" (write a
    // review), which opens a login-gated compose box instead of the list.
    const tabs = page.locator('[role="tab"]');
    const tabCount = await tabs.count();
    let clicked = false;
    for (let i = 0; i < tabCount; i++) {
      const tab = tabs.nth(i);
      const label = (await tab.innerText().catch(() => '')).trim();
      if (/^(ulasan|reviews)$/i.test(label)) {
        await tab.click({ timeout: 8000 });
        log('Clicked reviews tab:', label);
        clicked = true;
        break;
      }
    }
    if (!clicked) {
      log('No exact "Ulasan"/"Reviews" tab found; tabs seen:', await tabs.allInnerTexts());
      return reviews;
    }
    await page.waitForTimeout(1500);
  } catch (e) {
    log('could not click reviews tab:', e.message);
    return reviews;
  }

  // Expand any truncated review text
  async function expandMore() {
    const moreButtons = page.locator('button:has-text("More"), button:has-text("Lainnya")');
    const n = await moreButtons.count();
    for (let i = 0; i < Math.min(n, 30); i++) {
      try {
        await moreButtons.nth(i).click({ timeout: 1000 });
      } catch {
        // ignore, best effort
      }
    }
  }

  // Scroll the reviews scrollable panel to lazy-load more entries
  const scrollable = page.locator('div[role="main"] div.m6QErb[aria-label]').last();
  for (let i = 0; i < 15; i++) {
    try {
      await scrollable.evaluate((el) => el.scrollBy(0, 1200));
    } catch (e) {
      log('scroll iteration failed:', e.message);
      break;
    }
    await page.waitForTimeout(600);
  }
  await expandMore();

  try {
    const cards = page.locator('div[data-review-id]');
    const cardCount = await cards.count();
    log(`Found ${cardCount} review cards`);
    for (let i = 0; i < cardCount; i++) {
      const card = cards.nth(i);
      const reviewer = await card.locator('div.d4r55, [class*="fontBodyMedium"]').first().innerText().catch(() => null);
      const ratingLabel = await card.locator('span[role="img"]').first().getAttribute('aria-label').catch(() => null);
      const text = await card.locator('span.wiI7pd, [class*="wiI7pd"]').first().innerText().catch(() => null);
      const relativeTime = await card.locator('span.rsqaWe, [class*="rsqaWe"]').first().innerText().catch(() => null);
      reviews.push({ reviewer, ratingLabel, text, relativeTime });
    }
  } catch (e) {
    log('review card extraction failed:', e.message);
  }
  return reviews;
}

async function extractPhotoUrls(page) {
  const urls = new Set();
  try {
    const imgs = page.locator('img[src*="googleusercontent"]');
    const n = await imgs.count();
    for (let i = 0; i < n; i++) {
      const src = await imgs.nth(i).getAttribute('src');
      if (src) urls.add(src);
    }
  } catch (e) {
    log('photo url extraction failed:', e.message);
  }
  return [...urls];
}

async function main() {
  // Headless triggers Google's stripped-down "limited view" of Maps (fewer
  // photos, no review interaction) — headed mode avoids that, same fix as
  // scrape-photos.mjs.
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ locale: 'id-ID', viewport: { width: 1400, height: 1000 } });
  const page = await context.newPage();

  log('Navigating to', MAPS_URL);
  await page.goto(MAPS_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(2000);
  await dismissConsent(page);
  await page.waitForTimeout(2000);

  try {
    await page.waitForSelector('h1', { timeout: 20000 });
  } catch (e) {
    log('Timed out waiting for place panel h1:', e.message);
  }

  await page.screenshot({ path: path.join(OUT_DIR, 'debug-panel.png'), fullPage: false }).catch(() => {});

  const header = await extractHeaderInfo(page);
  const contact = await extractContactInfo(page);
  const hours = await extractHours(page);

  const company = { ...header, ...contact, hours, scrapedAt: new Date().toISOString(), sourceUrl: MAPS_URL };
  writeFileSync(path.join(OUT_DIR, 'company.json'), JSON.stringify(company, null, 2));
  log('Wrote company.json:', JSON.stringify(company, null, 2));

  const reviews = await extractReviews(page);
  await page.screenshot({ path: path.join(OUT_DIR, 'debug-reviews.png'), fullPage: false }).catch(() => {});
  writeFileSync(path.join(OUT_DIR, 'reviews.json'), JSON.stringify(reviews, null, 2));
  log(`Wrote reviews.json with ${reviews.length} reviews`);

  const photos = await extractPhotoUrls(page);
  writeFileSync(path.join(OUT_DIR, 'gallery.json'), JSON.stringify(photos, null, 2));
  log(`Wrote gallery.json with ${photos.length} photo URLs`);

  await page.screenshot({ path: path.join(OUT_DIR, 'debug-final.png'), fullPage: false }).catch(() => {});
  await browser.close();
  log('Done.');
}

main().catch((err) => {
  console.error('Scraper failed:', err);
  process.exit(1);
});
