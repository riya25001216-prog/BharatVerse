/**
 * Discovers equirectangular 360° panoramas on Wikimedia Commons that show
 * Indian places, and prints the candidates with their dimensions.
 */
const UA = { 'User-Agent': 'BharatVerse/1.0 (educational project)' };

const SEARCHES = [
  '360 panorama India',
  '"360 Degree View" India',
  '360 degree view monument India',
  'spherical panorama India',
  'panorama 360 fort India',
  '360 panorama temple India',
  '360 view palace India',
  '360 panorama beach India',
  '360 panorama Himalaya India',
  'equirectangular India',
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function api(params) {
  const url = `https://commons.wikimedia.org/w/api.php?${new URLSearchParams({
    format: 'json',
    origin: '*',
    ...params,
  })}`;
  for (let i = 0; i < 4; i++) {
    const res = await fetch(url, { headers: UA });
    if (res.status === 429) {
      await sleep(5000 * (i + 1));
      continue;
    }
    if (!res.ok) throw new Error(`api ${res.status}`);
    return res.json();
  }
  throw new Error('api failed');
}

(async () => {
  const seen = new Map();
  for (const q of SEARCHES) {
    try {
      const data = await api({
        action: 'query',
        generator: 'search',
        gsrsearch: `${q} filetype:bitmap`,
        gsrnamespace: '6',
        gsrlimit: '50',
        prop: 'imageinfo',
        iiprop: 'url|size|extmetadata',
      });
      const pages = data?.query?.pages ? Object.values(data.query.pages) : [];
      for (const p of pages) {
        const info = p.imageinfo?.[0];
        if (!info) continue;
        const ratio = info.width / info.height;
        if (ratio < 1.85 || ratio > 2.4) continue;
        if (info.width < 2400) continue;
        if (seen.has(p.title)) continue;
        seen.set(p.title, {
          title: p.title,
          w: info.width,
          h: info.height,
          url: info.url,
          descUrl: info.descriptionurl,
          meta: info.extmetadata || {},
        });
      }
      console.log(`search "${q}" -> ${pages.length} hits, ${seen.size} candidates so far`);
    } catch (e) {
      console.log(`search "${q}" ERR ${e.message}`);
    }
    await sleep(1200);
  }

  console.log('\n=== CANDIDATES ===');
  for (const c of seen.values()) {
    const artist = String(c.meta.Artist?.value || '')
      .replace(/<[^>]*>/g, '')
      .trim()
      .slice(0, 60);
    console.log(`${c.w}x${c.h}  ${c.title}`);
    console.log(`     ${artist}`);
  }
  console.log('total candidates:', seen.size);
})();
