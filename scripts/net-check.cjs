const puppeteer = require('puppeteer-core');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'],
    defaultViewport: { width: 1600, height: 1000 },
  });
  const page = await browser.newPage();
  const bad = [];
  page.on('response', (r) => {
    if (r.status() >= 400) bad.push(r.status() + ' ' + r.url());
  });
  page.on('requestfailed', (r) =>
    bad.push('FAILED ' + r.url() + ' :: ' + (r.failure() && r.failure().errorText))
  );

  await page.goto(process.argv[2] || 'http://localhost:4173/', { waitUntil: 'networkidle2', timeout: 60000 });
  await sleep(2000);
  for (const id of ['explore', 'guide', 'stories']) {
    await page.evaluate((s) => document.getElementById(s)?.scrollIntoView(), id);
    await sleep(1500);
  }
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await sleep(1500);
  await page.evaluate(() => {
    document.querySelector('[aria-label="Open the BharatVerse guide"]')?.click();
  });
  await sleep(800);
  await page.type('[aria-label="Message the guide"]', 'food in Kerala');
  await page.keyboard.press('Enter');
  await sleep(2500);
  console.log('bad:', bad.length ? bad : 'none');
  await browser.close();
})();
