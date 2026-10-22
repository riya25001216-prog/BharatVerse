/**
 * Second pass: fetch panoramas for the places that were missed, accepting
 * both true equirectangular (2:1) and ultra-wide stitched panoramas (>=1.6),
 * and verifying that the file title actually refers to the place.
 *
 *   node scripts/fetch-panoramas-2.cjs
 */
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'public', 'panoramas');
fs.mkdirSync(OUT, { recursive: true });

const API = 'https://commons.wikimedia.org/w/api.php';
const UA = { 'User-Agent': 'BharatVerse/1.0 (educational project)' };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const PLACES = [
  ['taj-mahal', ['taj mahal panorama', 'taj mahal 360'], ['taj mahal']],
  ['hawa-mahal', ['hawa mahal panorama', 'hawa mahal jaipur view'], ['hawa mahal']],
  ['amber-fort', ['amber fort panorama jaipur', 'amer fort view'], ['amber fort', 'amer fort']],
  ['konark', ['konark sun temple panorama', 'konark temple view'], ['konark']],
  ['hampi', ['hampi panorama', 'hampi bazaar view'], ['hampi', 'vijayanagara']],
  ['golden-temple', ['golden temple amritsar panorama', 'harmandir sahib view'], ['golden temple', 'harmandir']],
  ['dal-lake', ['dal lake srinagar panorama', 'srinagar houseboat view'], ['dal lake', 'srinagar']],
  ['charminar', ['charminar panorama', 'charminar hyderabad view'], ['charminar']],
  ['red-fort', ['red fort delhi panorama', 'lal qila view'], ['red fort', 'lal qila']],
  ['qutub-minar', ['qutub minar panorama', 'qutb minar view'], ['qutub', 'qutb']],
  ['fatehpur-sikri', ['fatehpur sikri panorama', 'fatehpur sikri view'], ['fatehpur']],
  ['meenakshi-temple', ['meenakshi temple panorama madurai', 'madurai temple view'], ['meenakshi', 'madurai']],
  ['cellular-jail', ['cellular jail port blair panorama', 'port blair view'], ['cellular jail', 'port blair']],
  ['rann-of-kutch', ['rann of kutch panorama', 'kutch white desert view'], ['rann', 'kutch']],
  ['mysore-palace', ['mysore palace panorama', 'mysore dasara view'], ['mysore', 'mysuru']],
  ['marina-beach', ['marina beach chennai panorama', 'chennai beach view'], ['marina', 'chennai']],
  ['kedarnath', ['kedarnath temple panorama', 'kedarnath view'], ['kedarnath']],
  ['pangong-lake', ['pangong lake panorama', 'pangong tso view'], ['pangong']],
  ['mandu', ['mandu panorama madhya pradesh', 'mandu fort view'], ['mandu']],
  ['khajuraho', ['khajuraho panorama', 'khajuraho temple view'], ['khajuraho']],
  ['kerala-backwaters', ['kerala backwaters panorama alleppey', 'alleppey view'], ['alleppey', 'backwater', 'kerala']],
  ['rani-ki-vav', ['rani ki vav panorama patan', 'patan stepwell view'], ['rani ki vav', 'patan']],
  ['sivasagar', ['rang ghar sivasagar panorama', 'sivasagar view'], ['sivasagar', 'rang ghar']],
  ['shore-temple', ['shore temple mahabalipuram panorama', 'mahabalipuram view'], ['shore temple', 'mahabalipuram']],
  ['jagannath-puri', ['jagannath temple puri panorama', 'puri Rath Yatra view'], ['jagannath', 'puri']],
  ['jaisalmer-fort', ['jaisalmer fort panorama', 'jaisalmer view'], ['jaisalmer']],
  ['mehrangarh-fort', ['mehrangarh fort panorama jaisalmer', 'jaisalmer fort view'], ['mehrangarh']],
  ['sun-temple-konark', ['sun temple konark 360', 'konark wheel view'], ['konark']],
  ['qutb-complex', ['qutb complex delhi panorama', 'qutb minar complex view'], ['qutb']],
  ['sundarban', ['sundarbans panorama', 'sundarban creek view'], ['sundarban']],
  ['kathakali', ['kerala kathakali panorama', 'kerala theatre view'], ['kathakali', 'kerala']],
  ['temple-south', ['thanjavur brihadisvara panorama', 'tanjore temple view'], ['thanjavur', 'tanjore', 'brihadisvara']],
  ['leh-palace', ['leh palace panorama', 'ladakh street view'], ['leh', 'ladakh']],
  ['spiti-village', ['spiti village panorama', 'himachal village view'], ['spiti', 'himachal']],
  ['ghat-varanasi', ['varanasi ghat panorama ganga', 'varanasi ghat aarti'], ['varanasi']],
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

const strip = (s) => String(s || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();

(async () => {
  const manifestPath = path.join(__dirname, '..', 'src', 'data', 'panorama-credits.json');
  const manifest = fs.existsSync(manifestPath)
    ? JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
    : {};
  let ok = 0;

  for (const [slug, queries, musts] of PLACES) {
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
        const data = await api({
          action: 'query',
          generator: 'search',
          gsrsearch: `${q} filetype:bitmap`,
          gsrnamespace: '6',
          gsrlimit: '40',
          prop: 'imageinfo',
          iiprop: 'url|size|extmetadata',
          iiurlwidth: '4096',
        });
        const pages = data?.query?.pages ? Object.values(data.query.pages) : [];
        for (const p of pages) {
          const info = p.imageinfo?.[0];
          if (!info) continue;
          const ratio = info.width / info.height;
          if (ratio < 1.6 || ratio > 3.2) continue;
          if (info.width < 2200) continue;
          const title = p.title.replace(/^File:/, '');
          if (/\.svg$/i.test(title)) continue;
          const low = title.toLowerCase();
          if (!musts.some((m) => low.includes(m))) continue;
          hits.push({ title, info, ratio });
        }
        hits.sort((a, b) => {
          const ra = Math.abs(a.ratio - 2);
          const rb = Math.abs(b.ratio - 2);
          return ra - rb || b.info.width - a.info.width;
        });
      } catch (e) {
        console.log('  search failed', q, e.message);
      }

      for (const hit of hits.slice(0, 3)) {
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
            equirectangular: Math.abs(hit.ratio - 2) < 0.12,
          };
          console.log(
            `ok   ${slug.padEnd(20)} ${Math.round(buf.length / 1024)}KB  ${hit.info.width}x${hit.info.height} r=${hit.ratio.toFixed(2)}  ${hit.title}`
          );
          saved = true;
          ok++;
          break;
        } catch {
          /* next */
        }
      }
      await sleep(900);
    }
    if (!saved) console.log(`MISS ${slug}`);
    await sleep(700);
  }

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`\npanoramas available: ${ok}/${PLACES.length}`);
})();
