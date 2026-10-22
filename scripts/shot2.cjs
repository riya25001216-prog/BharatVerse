const puppeteer = require('puppeteer-core');
const path = require('path');
const OUT = path.join(process.env.TEMP, 'opencode', 'shots');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'],
    defaultViewport: { width: 1600, height: 1000 },
  });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle2', timeout: 60000 });
  await sleep(3500);
  await page.evaluate(() => window.scrollTo(0, 1500));
  await sleep(2500);
  const map = await page.$('svg[aria-label="Interactive map of India"]');
  await map.screenshot({ path: path.join(OUT, '09-map2.png') });

  // chat panel position
  await page.evaluate(() => {
    document.querySelector('[aria-label="Open the BharatVerse guide"]')?.click();
  });
  await sleep(1000);
  await page.screenshot({ path: path.join(OUT, '10-chat2.png') });

  console.log('errors:', errors.length ? errors : 'none');
  await browser.close();
})();
