/**
 * Downloads freely-licensed photographs from Wikimedia Commons for the
 * BharatVerse experience and records attribution metadata.
 *
 *   node scripts/fetch-images.cjs
 */
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'public', 'images');
fs.mkdirSync(OUT, { recursive: true });

const API = 'https://commons.wikimedia.org/w/api.php';

const QUERIES = [
  ['andhra-pradesh', 'Tirumala Tirupati temple', 'tirupati'],
  ['andaman-and-nicobar-islands', 'Radhanagar Beach Andaman', 'radhanagar'],
  ['arunachal-pradesh', 'Tawang monastery', 'tawang'],
  ['assam', 'Kamakhya temple Guwahati', 'kamakhya'],
  ['bihar', 'Mahabodhi Temple Bodh Gaya', 'bodh'],
  ['chandigarh', 'Rock Garden Chandigarh', 'rock garden'],
  ['chhattisgarh', 'Chitrakote Falls', 'chitrakote'],
  ['delhi', 'India Gate New Delhi', 'india gate'],
  ['dnh-and-dd', 'Daman fort beach Gujarat', 'daman'],
  ['goa', 'Palolem beach Goa', 'palolem'],
  ['gujarat', 'Rani ki Vav Patan stepwell', 'rani'],
  ['haryana', 'Brahma Sarovar Kurukshetra', 'kurukshetra'],
  ['himachal-pradesh', 'Manali Himachal Pradesh', 'manali'],
  ['jammu-and-kashmir', 'Dal Lake Srinagar', 'dal lake'],
  ['jharkhand', 'Hundru Falls Jharkhand', 'hundru'],
  ['karnataka', 'Hampi Vijayanagara ruins', 'hampi'],
  ['kerala', 'Alleppey backwaters houseboat', 'alleppey'],
  ['ladakh', 'Pangong Tso lake Ladakh', 'pangong'],
  ['lakshadweep', 'Lakshadweep island aerial', 'lakshadweep'],
  ['madhya-pradesh', 'Khajuraho temple Madhya Pradesh', 'khajuraho'],
  ['maharashtra', 'Ajanta Caves Maharashtra', 'ajanta'],
  ['manipur', 'Loktak Lake Manipur', 'loktak'],
  ['meghalaya', 'Nohkalikai Falls Meghalaya', 'nohkalikai'],
  ['mizoram', 'Mizoram landscape hills', 'mizoram'],
  ['nagaland', 'Naga village Nagaland', 'naga'],
  ['odisha', 'Konark Sun Temple Odisha', 'konark'],
  ['puducherry', 'Promenade beach Puducherry', 'puducherry'],
  ['punjab', 'Golden Temple Amritsar', 'golden temple'],
  ['rajasthan', 'Hawa Mahal Jaipur', 'hawa mahal'],
  ['sikkim', 'Khangchendzonga Sikkim', 'khangchendzonga'],
  ['tamil-nadu', 'Meenakshi Temple Madurai', 'meenakshi'],
  ['telangana', 'Charminar Hyderabad', 'charminar'],
  ['tripura', 'Neermahal waterfall Tripura', 'neermahal'],
  ['uttar-pradesh', 'Taj Mahal Agra', 'taj mahal'],
  ['uttarakhand', 'Kedarnath Temple Himalaya', 'kedarnath'],
  ['west-bengal', 'Victoria Memorial Kolkata', 'victoria memorial'],
  // virtual-guide scenes
  ['scene-taj-dawn', 'Taj Mahal sunrise reflection Yamuna', 'taj mahal'],
  ['scene-varanasi', 'Varanasi ghats Ganges evening', 'varanasi'],
  ['scene-jaipur', 'Amber Fort Jaipur Rajasthan', 'amber fort'],
  ['scene-kerala', 'Kerala backwaters canoe', 'kerala'],
  ['scene-golden-temple', 'Golden Temple Amritsar night', 'golden temple'],
  ['scene-konark', 'Konark Sun Temple chariot wheels', 'konark'],
  ['scene-hampi', 'Hampi boulder landscape Karnataka', 'hampi'],
  ['scene-ladakh', 'Leh Ladakh mountains monastery', 'ladakh'],
  ['scene-rann', 'Rann of Kutch white desert', 'rann'],
  ['scene-goa', 'Old Goa church basilica', 'old goa'],
  ['scene-munnar', 'Munnar tea plantation Kerala', 'munnar'],
  ['scene-andaman', 'Havelock Island Andaman beach', 'havelock'],
  ['hero-himalaya', 'Himalaya mountain panorama India', 'himalaya'],
  ['hero-bharat', 'Varanasi ghats panorama Ganges', 'varanasi'],
];

const BLOCK = /logo|wiki|question|icon|flag|emblem|coat|seal|map|diagram|chart|svg|template|book|banner|stub|user[ _]|portrait of/i;
const GOOD = /\.(jpe?g|png)$/i;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function api(params) {
  const url = `${API}?${new URLSearchParams({ format: 'json', origin: '*', ...params })}`;
  let lastErr;
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'BharatVerse/1.0 (educational project)' } });
      if (res.status === 429) {
        await sleep(4000 * (attempt + 1));
        continue;
      }
      if (!res.ok) throw new Error(`api ${res.status}`);
      return await res.json();
    } catch (err) {
      lastErr = err;
      await sleep(2000 * (attempt + 1));
    }
  }
  throw lastErr || new Error('api failed');
}

function stripHtml(str) {
  return String(str || '')
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

async function search(query, must) {
  const data = await api({
    action: 'query',
    generator: 'search',
    gsrsearch: `${query} filetype:bitmap`,
    gsrnamespace: '6',
    gsrlimit: '20',
    prop: 'imageinfo',
    iiprop: 'url|size|extmetadata',
    iiurlwidth: '1600',
  });
  const pages = data?.query?.pages ? Object.values(data.query.pages) : [];
  const scored = [];
  for (const p of pages) {
    const info = p.imageinfo?.[0];
    if (!info) continue;
    const title = p.title.replace(/^File:/, '');
    if (!GOOD.test(title) || BLOCK.test(title)) continue;
    if (!info.thumburl) continue;
    if (info.width < 1100) continue;
    if (!must || title.toLowerCase().includes(must.toLowerCase())) {
      scored.push({ title, info });
    }
  }
  scored.sort((a, b) => b.info.width * b.info.height - a.info.width * a.info.height);
  return scored[0] || null;
}

async function download(url, dest) {
  const res = await fetch(url, { headers: { 'User-Agent': 'BharatVerse/1.0 (educational project)' } });
  if (!res.ok) throw new Error(`download ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
  return buf.length;
}

(async () => {
  const manifest = [];
  for (const [slug, query, must] of QUERIES) {
    const dest = path.join(OUT, `${slug}.jpg`);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 20000) {
      console.log('skip', slug);
      continue;
    }
    try {
      const hit = await search(query, must);
      if (!hit) {
        console.log('NO MATCH', slug, '|', query);
        continue;
      }
      const size = await download(hit.info.thumburl, dest);
      const meta = hit.info.extmetadata || {};
      manifest.push({
        slug,
        title: hit.title,
        credit: stripHtml(meta.Artist?.value).slice(0, 120),
        license: stripHtml(meta.LicenseShortName?.value),
        source: `https://commons.wikimedia.org/wiki/${encodeURIComponent(hit.title)}`,
      });
      console.log('ok', slug, `${Math.round(size / 1024)}KB`, '|', hit.title);
    } catch (err) {
      console.log('ERR', slug, err.message);
    }
    await sleep(1200);
  }
  const manifestPath = path.join(__dirname, '..', 'src', 'data', 'image-credits.json');
  fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
  const existing = fs.existsSync(manifestPath)
    ? JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
    : {};
  for (const m of manifest) existing[m.slug] = m;
  fs.writeFileSync(manifestPath, JSON.stringify(existing, null, 2));
  console.log('manifest entries:', Object.keys(existing).length);
})();
