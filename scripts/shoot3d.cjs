/**
 * Captures the 3D map canvas so the extrusion + base plate can be inspected.
 *
 *   node scripts/shoot3d.cjs [url] [outName]
 */
const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const URL = process.argv[2] || 'http://localhost:5173/explore';
const NAME = process.argv[3] || '3d-map';
const OUT = path.join(process.env.TEMP, 'opencode', 'shots');
fs.mkdirSync(OUT, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({
    executablePath: EDGE,
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-gpu',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      '--enable-unsafe-swiftshader',
    ],
    defaultViewport: { width: 1600, height: 1000 },
  });
  const page = await browser.newPage();
  const errors = [];
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text());
  });
  page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message));

  await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sleep(8000);

  const hasWebGL = await page.evaluate(() => {
    const c = document.createElement('canvas');
    const gl = c.getContext('webgl2') || c.getContext('webgl');
    return gl ? gl.getParameter(gl.VERSION) : 'NO WEBGL';
  });

  const canvasBox = await page.evaluate(() => {
    const c = document.querySelector('canvas');
    if (!c) return null;
    const b = c.getBoundingClientRect();
    return { x: b.x, y: b.y, w: b.width, h: b.height };
  });

  const file = path.join(OUT, `${NAME}.png`);
  if (canvasBox && canvasBox.w > 10) {
    await page.screenshot({
      path: file,
      clip: { x: canvasBox.x, y: canvasBox.y, width: canvasBox.w, height: canvasBox.h },
    });
  } else {
    await page.screenshot({ path: file });
  }

  console.log('webgl:', hasWebGL);
  console.log('canvas:', JSON.stringify(canvasBox));
  console.log('saved:', file);
  console.log('console errors:', errors.length ? errors.slice(0, 8) : 'none');
  await browser.close();
})();
