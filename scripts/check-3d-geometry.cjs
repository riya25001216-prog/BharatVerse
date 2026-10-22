/**
 * Diagnostic: verify the projected geometry used by India3D.
 *   node scripts/check-3d-geometry.cjs
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const raw = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'src', 'data', 'india-states.json'), 'utf8')
);

const { geoConicEqualArea, geoStream, geoPath, geoBounds } = require('d3-geo');

const PROJECTION = geoConicEqualArea()
  .parallels([8, 36])
  .rotate([-80, 0])
  .center([0, 22])
  .fitExtent(
    [
      [-46, -46],
      [46, 46],
    ],
    raw
  );

function ringsOf(feature) {
  const polygons = [];
  let poly = null;
  let ring = null;

  geoStream(feature, {
    polygonStart: () => {
      poly = [];
    },
    polygonEnd: () => {
      if (poly) polygons.push(poly);
      poly = null;
    },
    lineStart: () => {
      ring = [];
    },
    lineEnd: () => {
      if (poly && ring) poly.push(ring);
      ring = null;
    },
    point: (x, y) => {
      if (ring) ring.push([x, y]);
    },
  });

  return polygons.flat();
}

const all = [];
const rows = [];

for (const f of raw.features) {
  const rings = ringsOf(f);
  const projected = [];
  for (const r of rings) {
    const pr = r.map(([lon, lat]) => {
      const p = PROJECTION([lon, lat]);
      return p ? [p[0], -p[1]] : null;
    });
    const good = pr.filter(Boolean);
    if (good.length) projected.push(good);
  }

  const xs = projected.flat().map((p) => p[0]);
  const ys = projected.flat().map((p) => p[1]);
  const bbox = projected.length
    ? [
        Math.min(...xs).toFixed(1),
        Math.min(...ys).toFixed(1),
        Math.max(...xs).toFixed(1),
        Math.max(...ys).toFixed(1),
      ].join(', ')
    : 'EMPTY';

  all.push(...projected.flat());
  rows.push({
    id: f.properties.id,
    polys: projected.length,
    rings: rings.length,
    pts: projected.flat().length,
    bbox,
  });
}

const xs = all.map((p) => p[0]);
const ys = all.map((p) => p[1]);
console.log('TOTAL POINTS:', all.length);
console.log(
  'GLOBAL BBOX: x',
  Math.min(...xs).toFixed(2),
  '..',
  Math.max(...xs).toFixed(2),
  ' y',
  Math.min(...ys).toFixed(2),
  '..',
  Math.max(...ys).toFixed(2)
);
console.log('\nper-state:');
for (const r of rows) {
  console.log(
    `${r.id.padEnd(28)} polys=${String(r.polys).padStart(3)} rings=${String(r.rings).padStart(3)} pts=${String(r.pts).padStart(6)} bbox=[${r.bbox}]`
  );
}

// sanity: where do a few known capitals land?
const probes = [
  ['Delhi', 28.6139, 77.209],
  ['Mumbai', 19.076, 72.8777],
  ['Kanyakumari', 8.08, 77.55],
  ['Kashmir north', 34.5, 74.5],
  ['Guwahati', 26.14, 91.73],
];
console.log('\ncapital probes (x,y):');
for (const [n, lat, lon] of probes) {
  const p = PROJECTION([lon, lat]);
  console.log(n, p ? `${p[0].toFixed(2)}, ${(-p[1]).toFixed(2)}` : 'null');
}
