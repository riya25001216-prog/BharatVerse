/**
 * Downloads real equirectangular 360° panoramas of Indian places from
 * Wikimedia Commons into public/panoramas/.
 *
 *   node scripts/fetch-panoramas.cjs
 */
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'public', 'panoramas');
fs.mkdirSync(OUT, { recursive: true });

const API = 'https://commons.wikimedia.org/w/api.php';
const UA = { 'User-Agent': 'BharatVerse/1.0 (educational project)' };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// slug -> [search queries], the first equirectangular match wins
const PLACES = [
  ['gateway-of-india', ['360 Gateway of India Mumbai', 'Gateway of India 360 panorama']],
  ['mehrangarh-fort', ['360 Mehrangarh Fort Jaisalmer', 'Mehrangarh Fort panorama 360']],
  ['hemis-monastery', ['360 Hemis Monastery Ladakh', 'Hemis monastery 360 view']],
  ['shore-temple', ['360 Shore Temple Mahabalipuram', 'Mahabalipuram 360 panorama']],
  ['victoria-memorial', ['360 Victoria Memorial Kolkata', 'Dalhousie Square 360 equirectangular']],
  ['ooty-ithalar', ['360 panorama Ooty Ithalar', 'Ooty sunrise 360 aerial']],
  ['hyderabad-lake', ['360 aerial Hyderabad Malkam cheruvu', 'Hyderabad 360 panorama']],
  ['bengaluru-bellandur', ['360 Bellandur lake Kempapura', '360 Domlur Bengaluru panoramic']],
  ['taj-mahal', ['360 Taj Mahal Agra panorama', 'Taj Mahal 360 equirectangular', 'Taj Mahal spherical panorama']],
  ['hawa-mahal', ['360 Hawa Mahal Jaipur', 'Hawa Mahal 360 panorama']],
  ['amber-fort', ['360 Amber Fort Jaipur', 'Amber Fort 360 panorama']],
  ['varanasi-ghats', ['360 Varanasi ghats Ganga', 'Varanasi 360 panorama']],
  ['konark', ['360 Konark Sun Temple', 'Konark 360 panorama']],
  ['hampi', ['360 Hampi ruins', 'Hampi 360 panorama']],
  ['golden-temple', ['360 Golden Temple Amritsar', 'Harmandir Sahib 360 panorama']],
  ['dal-lake', ['360 Dal Lake Srinagar', 'Srinagar 360 panorama']],
  ['charminar', ['360 Charminar Hyderabad', 'Charminar 360 view']],
  ['red-fort', ['360 Red Fort Delhi', 'Delhi 360 panorama fort']],
  ['qutub-minar', ['360 Qutub Minar', 'Qutb complex 360 panorama']],
  ['fatehpur-sikri', ['360 Fatehpur Sikri', 'Fatehpur Sikri 360 view']],
  ['meenakshi-temple', ['360 Meenakshi Temple Madurai', 'Madurai 360 panorama temple']],
  ['jagannath-puri', ['360 Jagannath Temple Puri', 'Puri 360 panorama']],
  ['cellular-jail', ['360 Cellular Jail Port Blair', 'Port Blair 360 panorama']],
  ['rann-of-kutch', ['360 Rann of Kutch', 'Kutch 360 panorama']],
  ['mysore-palace', ['360 Mysore Palace', 'Mysore Dasara 360 panorama']],
  ['marina-beach', ['360 Marina Beach Chennai', 'Chennai 360 panorama beach']],
  ['kedarnath', ['360 Kedarnath Temple', 'Uttarakhand 360 panorama temple']],
  ['pangong-lake', ['360 Pangong Lake Ladakh', 'Pangong Tso 360 panorama']],
  ['mandu', ['360 Mandu Madhya Pradesh', 'Mandu 360 panorama']],
  ['khajuraho', ['360 Khajuraho temples', 'Khajuraho 360 panorama']],
  ['kerala-backwaters', ['360 Kerala backwaters Alleppey', 'Kerala 360 panorama']],
  ['jaisalmer-fort', ['360 Jaisalmer Fort', 'Jaisalmer 360 panorama']],
  ['rani-ki-vav', ['360 Rani ki Vav Patan', 'Patan stepwell 360']],
  ['sivasagar', ['360 Sivasagar Rang Ghar', 'Assam 360 panorama']],
  ['diu-fort', ['360 Daman Diu fort', 'Diu 360 panorama']],
];

async function api(params) {
  const url = `${API}?${new URLSearchParams({ format: 'json', origin: '*', ...params })}`;
  for (let i = 0; i < 5; i++) {
    try {
      const res = await fetch(url, { headers: UA });
      if (res.status === 429) {
        await sleep(5000 * (i + 1));
        continue;
      }
      if (!res.ok) throw new Error(`api ${res.status}`);
      return await res.json();
    } catch (err) {
      await sleep(3000 * (i + 1));
    }
  }
  throw new Error('api failed');
}

const strip = (s) =>
  String(s || '')
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();

async function search(query) {
  const data = await api({
    action: 'query',
    generator: 'search',
    gsrsearch: `${query} filetype:bitmap`,
    gsrnamespace: '6',
    gsrlimit: '40',
    prop: 'imageinfo',
    iiprop: 'url|size|extmetadata',
    iiurlwidth: '4096',
  });
  const pages = data?.query?.pages ? Object.values(data.query.pages) : [];
  const out = [];
  for (const p of pages) {
    const info = p.imageinfo?.[0];
    if (!info) continue;
    const ratio = info.width / info.height;
    if (ratio < 1.85 || ratio > 2.2) continue;
    if (info.width < 2400) continue;
    const title = p.title.replace(/^File:/, '');
    if (/\.svg$/i.test(title)) continue;
    out.push({ title, info, ratio });
  }
  out.sort((a, b) => b.info.width - a.info.width);
  return out;
}

(async () => {
  const manifestPath = path.join(__dirname, '..', 'src', 'data', 'panorama-credits.json');
  const manifest = fs.existsSync(manifestPath)
    ? JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
    : {};
  let ok = 0;

  for (const [slug, queries] of PLACES) {
    const dest = path.join(OUT, `${slug}.jpg`);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 100000) {
      console.log('skip', slug);
      ok++;
      continue;
    }
    let saved = false;
    for (const q of queries) {
      if (saved) break;
      let hits = [];
      try {
        hits = await search(q);
      } catch (e) {
        console.log('  search failed', q, e.message);
      }
      for (const hit of hits.slice(0, 4)) {
        const url = hit.info.thumburl || hit.info.url;
        try {
          const res = await fetch(url, { headers: UA });
          if (!res.ok) continue;
          const buf = Buffer.from(await res.arrayBuffer());
          if (buf.length < 60000) continue;
          fs.writeFileSync(dest, buf);
          const meta = hit.info.extmetadata || {};
          manifest[slug] = {
            slug,
            title: hit.title,
            credit: strip(meta.Artist?.value).slice(0, 120),
            license: strip(meta.LicenseShortName?.value),
            source: `https://commons.wikimedia.org/wiki/${encodeURIComponent('File:' + hit.title)}`,
            width: hit.info.width,
            height: hit.info.height,
          };
          console.log(
            `ok   ${slug.padEnd(20)} ${Math.round(buf.length / 1024)}KB  ${hit.info.width}x${hit.info.height}  ${hit.title}`
          );
          saved = true;
          ok++;
          break;
        } catch {
          /* try the next candidate */
        }
      }
      await sleep(1000);
    }
    if (!saved) console.log(`MISS ${slug}`);
    await sleep(800);
  }

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`\ndownloaded ${ok}/${PLACES.length} panoramas`);
})();
