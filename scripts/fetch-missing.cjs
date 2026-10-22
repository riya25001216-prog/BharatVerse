/**
 * Retry the images that the first pass could not resolve, with relaxed rules.
 *
 *   node scripts/fetch-missing.cjs
 */
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'public', 'images');
const API = 'https://commons.wikimedia.org/w/api.php';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const TARGETS = [
  ['dnh-and-dd', ['Daman Diu', 'Daman', 'Diu fort', 'Nagoa beach Diu', 'Daman and Diu']],
  ['lakshadweep', ['Lakshadweep', 'Agatti', 'Kadmat island', 'Minicoy', 'Lakshadweep islands']],
  ['scene-taj-dawn', ['Taj Mahal', 'Taj Mahal sunrise', 'Taj Mahal reflection', 'Taj Mahal dawn']],
];

const BLOCK = /logo|wiki|question|icon|flag|emblem|coat of arms|diagram|chart|template|portrait|\d{4} \d{2} \d{2}/i;

async function api(params) {
  const url = `${API}?${new URLSearchParams({ format: 'json', origin: '*', ...params })}`;
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'BharatVerse/1.0 (educational project)' } });
      if (res.status === 429) {
        await sleep(5000 * (attempt + 1));
        continue;
      }
      if (!res.ok) throw new Error(`api ${res.status}`);
      return await res.json();
    } catch (err) {
      await sleep(3000 * (attempt + 1));
    }
  }
  throw new Error('api failed');
}

(async () => {
  const manifestPath = path.join(__dirname, '..', 'src', 'data', 'image-credits.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

  for (const [slug, queries] of TARGETS) {
    const dest = path.join(OUT, `${slug}.jpg`);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 20000) {
      console.log('already have', slug);
      continue;
    }
    let saved = false;
    for (const q of queries) {
      if (saved) break;
      try {
        const data = await api({
          action: 'query',
          generator: 'search',
          gsrsearch: `${q} filetype:bitmap`,
          gsrnamespace: '6',
          gsrlimit: '30',
          prop: 'imageinfo',
          iiprop: 'url|size|extmetadata',
          iiurlwidth: '1600',
        });
        const pages = data?.query?.pages ? Object.values(data.query.pages) : [];
        const candidates = pages
          .filter((p) => {
            const info = p.imageinfo?.[0];
            if (!info?.thumburl) return false;
            const title = p.title.replace(/^File:/, '');
            if (!/\.(jpe?g|png)$/i.test(title)) return false;
            if (BLOCK.test(title)) return false;
            if (info.width < 1000) return false;
            return true;
          })
          .sort((a, b) => {
            const ratioA = a.imageinfo[0].width / a.imageinfo[0].height;
            const ratioB = b.imageinfo[0].width / b.imageinfo[0].height;
            return Math.abs(ratioA - 1.5) - Math.abs(ratioB - 1.5);
          });
        for (const p of candidates.slice(0, 3)) {
          const info = p.imageinfo[0];
          const res = await fetch(info.thumburl, { headers: { 'User-Agent': 'BharatVerse/1.0' } });
          if (!res.ok) continue;
          const buf = Buffer.from(await res.arrayBuffer());
          fs.writeFileSync(dest, buf);
          const meta = info.extmetadata || {};
          const strip = (s) => String(s || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
          manifest[slug] = {
            slug,
            title: p.title.replace(/^File:/, ''),
            credit: strip(meta.Artist?.value).slice(0, 120),
            license: strip(meta.LicenseShortName?.value),
            source: `https://commons.wikimedia.org/wiki/${encodeURIComponent(p.title)}`,
          };
          console.log('ok', slug, `${Math.round(buf.length / 1024)}KB`, '|', p.title);
          saved = true;
          break;
        }
      } catch (err) {
        console.log('ERR', slug, q, err.message);
      }
      await sleep(1500);
    }
    if (!saved) console.log('STILL MISSING', slug);
    await sleep(1200);
  }

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log('manifest entries:', Object.keys(manifest).length);
})();
