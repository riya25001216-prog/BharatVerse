/**
 * Visual smoke test: drives the running dev server with the system Edge and
 * captures screenshots of each section plus a few interactions.
 *
 *   node scripts/shoot.cjs [baseUrl]
 */
const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE = process.argv[2] || 'http://localhost:5173/';
const OUT = path.join(process.env.TEMP, 'opencode', 'shots');
fs.mkdirSync(OUT, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({
    executablePath: EDGE,
    headless: 'new',
    args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1'],
    defaultViewport: { width: 1600, height: 1000 },
  });
  const page = await browser.newPage();
  const errors = [];
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text());
  });
  page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message));

  await page.goto(BASE, { waitUntil: 'networkidle2', timeout: 60000 });
  await sleep(2500);
  await page.screenshot({ path: path.join(OUT, '01-hero.png') });

  // scroll to explore
  await page.evaluate(() => document.getElementById('explore')?.scrollIntoView());
  await sleep(2500);
  await page.screenshot({ path: path.join(OUT, '02-explore.png') });

  // click Kerala on the map (find the path by title through the DOM order)
  const clicked = await page.evaluate(() => {
    const paths = Array.from(document.querySelectorAll('#explore svg path'));
    if (!paths.length) return false;
    // Kerala is the 12th feature in the merged ordering; pick by centroid order instead:
    // choose the path whose bounding box sits in the south-west of the map.
    let best = null;
    for (const p of paths) {
      const b = p.getBoundingClientRect();
      if (b.width === 0) continue;
      const area = b.width * b.height;
      if (!best || area < best.area) {
        // keep the smallest; Kerala is small
      }
    }
    // Just click the quick-pick strip instead: it is deterministic.
    const buttons = Array.from(document.querySelectorAll('#explore button'));
    const kerala = buttons.find((b) => b.textContent?.includes('Kerala'));
    if (kerala) {
      kerala.click();
      return 'quickpick';
    }
    return 'none';
  });
  await sleep(2000);
  await page.screenshot({ path: path.join(OUT, '03-state.png') });

  // virtual guide
  await page.evaluate(() => document.getElementById('guide')?.scrollIntoView());
  await sleep(2500);
  await page.screenshot({ path: path.join(OUT, '04-guide.png') });

  // stories
  await page.evaluate(() => document.getElementById('stories')?.scrollIntoView());
  await sleep(2000);
  await page.screenshot({ path: path.join(OUT, '05-stories.png') });

  // open chatbot and ask
  await page.evaluate(() => {
    document.querySelector('[aria-label="Open the BharatVerse guide"]')?.click();
  });
  await sleep(900);
  await page.type('[aria-label="Message the guide"]', 'Tell me about Kerala');
  await page.keyboard.press('Enter');
  await sleep(2200);
  await page.screenshot({ path: path.join(OUT, '06-chat.png') });

  // footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await sleep(1500);
  await page.screenshot({ path: path.join(OUT, '07-footer.png') });

  console.log('clicked:', clicked);
  console.log('console errors:', errors.length ? errors.slice(0, 10) : 'none');
  await browser.close();
})();
