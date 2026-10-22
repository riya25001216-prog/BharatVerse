/**
 * Confirms where each state's landmass ends up in world space after the
 * flat-map rotation, so islands can be checked against a reference map.
 *   node scripts/check-3d-layout.cjs
 */
const fs = require('fs');
const path = require('path');
const { geoConicEqualArea, geoStream } = require('d3-geo');

const ROOT = path.join(__dirname, '..');
const raw = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'src', 'data', 'india-states.json'), 'utf8')
);

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

function polys(feature) {
  const out = [];
  let poly = null;
  let ring = null;
  geoStream(feature, {
    polygonStart: () => {
      poly = [];
    },
    polygonEnd: () => {
      if (poly) out.push(poly);
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
      if (!ring) return;
      const p = PROJECTION([x, y]);
      if (p) ring.push([p[0], -p[1]]);
    },
  });
  return out;
}

// world = (x, z, -y)  after rotateX(-90): north (local +y) -> world -z
const rows = [];
for (const f of raw.features) {
  const ps = polys(f);
  const xs = [];
  const zs = [];
  for (const poly of ps) {
    for (const p of poly[0] ?? []) {
      xs.push(p[0]);
      zs.push(-p[1]);
    }
  }
  rows.push({
    id: f.properties.id,
    n: ps.length,
    x: `${Math.min(...xs).toFixed(0)}..${Math.max(...xs).toFixed(0)}`,
    z: `${Math.min(...zs).toFixed(0)}..${Math.max(...zs).toFixed(0)}`,
  });
}

console.log('world Z: negative = NORTH (far from camera), positive = SOUTH (near camera)\n');
rows
  .sort((a, b) => Number(b.z.split('..')[0]) - Number(a.z.split('..')[0]))
  .forEach((r) =>
    console.log(`${r.id.padEnd(28)} parts=${String(r.n).padStart(3)}  x=${r.x.padStart(11)}  z=${r.z.padStart(12)}`)
  );
