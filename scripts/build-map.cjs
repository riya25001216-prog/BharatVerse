/**
 * Build script: dissolve district boundaries into state/UT outlines,
 * simplify them, and emit a compact GeoJSON consumed by the app.
 *
 *   node scripts/build-map.cjs
 */
const fs = require('fs');
const path = require('path');
const topojson = require('topojson-server');
const { merge } = require('topojson-client');
const polygonClipping = require('polygon-clipping');

const SRC = path.join(process.env.TEMP, 'opencode', 'states');
const OUT_DIR = path.join(__dirname, '..', 'src', 'data');

const META = {
  'andaman-and-nicobar-islands': { name: 'Andaman & Nicobar Islands', type: 'UT', capital: 'Port Blair' },
  'andhra-pradesh': { name: 'Andhra Pradesh', type: 'State', capital: 'Amaravati' },
  'arunachal-pradesh': { name: 'Arunachal Pradesh', type: 'State', capital: 'Itanagar' },
  'assam': { name: 'Assam', type: 'State', capital: 'Dispur' },
  'bihar': { name: 'Bihar', type: 'State', capital: 'Patna' },
  'chandigarh': { name: 'Chandigarh', type: 'UT', capital: 'Chandigarh' },
  'chhattisgarh': { name: 'Chhattisgarh', type: 'State', capital: 'Raipur' },
  'delhi': { name: 'Delhi', type: 'UT', capital: 'New Delhi' },
  'dnh-and-dd': { name: 'Dadra & Nagar Haveli and Daman & Diu', type: 'UT', capital: 'Daman' },
  'goa': { name: 'Goa', type: 'State', capital: 'Panaji' },
  'gujarat': { name: 'Gujarat', type: 'State', capital: 'Gandhinagar' },
  'haryana': { name: 'Haryana', type: 'State', capital: 'Chandigarh' },
  'himachal-pradesh': { name: 'Himachal Pradesh', type: 'State', capital: 'Shimla' },
  'jammu-and-kashmir': { name: 'Jammu & Kashmir', type: 'UT', capital: 'Srinagar' },
  'jharkhand': { name: 'Jharkhand', type: 'State', capital: 'Ranchi' },
  'karnataka': { name: 'Karnataka', type: 'State', capital: 'Bengaluru' },
  'kerala': { name: 'Kerala', type: 'State', capital: 'Thiruvananthapuram' },
  'ladakh': { name: 'Ladakh', type: 'UT', capital: 'Leh' },
  'lakshadweep': { name: 'Lakshadweep', type: 'UT', capital: 'Kavaratti' },
  'madhya-pradesh': { name: 'Madhya Pradesh', type: 'State', capital: 'Bhopal' },
  'maharashtra': { name: 'Maharashtra', type: 'State', capital: 'Mumbai' },
  'manipur': { name: 'Manipur', type: 'State', capital: 'Imphal' },
  'meghalaya': { name: 'Meghalaya', type: 'State', capital: 'Shillong' },
  'mizoram': { name: 'Mizoram', type: 'State', capital: 'Aizawl' },
  'nagaland': { name: 'Nagaland', type: 'State', capital: 'Kohima' },
  'odisha': { name: 'Odisha', type: 'State', capital: 'Bhubaneswar' },
  'puducherry': { name: 'Puducherry', type: 'UT', capital: 'Puducherry' },
  'punjab': { name: 'Punjab', type: 'State', capital: 'Chandigarh' },
  'rajasthan': { name: 'Rajasthan', type: 'State', capital: 'Jaipur' },
  'sikkim': { name: 'Sikkim', type: 'State', capital: 'Gangtok' },
  'tamil-nadu': { name: 'Tamil Nadu', type: 'State', capital: 'Chennai' },
  'telangana': { name: 'Telangana', type: 'State', capital: 'Hyderabad' },
  'tripura': { name: 'Tripura', type: 'State', capital: 'Agartala' },
  'uttar-pradesh': { name: 'Uttar Pradesh', type: 'State', capital: 'Lucknow' },
  'uttarakhand': { name: 'Uttarakhand', type: 'State', capital: 'Dehradun' },
  'west-bengal': { name: 'West Bengal', type: 'State', capital: 'Kolkata' },
};

const objects = {};
for (const slug of Object.keys(META)) {
  const file = path.join(SRC, slug + '.geojson');
  if (!fs.existsSync(file)) {
    console.warn('missing', slug);
    continue;
  }
  const fc = JSON.parse(fs.readFileSync(file, 'utf8'));
  objects[slug] = fc;
}

const TOLERANCE = Number(process.argv[2] || 0.02);
const PRECISION = Number(process.argv[3] || 3);

/** Ramer-Douglas-Peucker on a closed ring, preserving the ring's closure. */
function simplifyRing(points, tolerance) {
  if (points.length <= 4) return points;
  const sqTol = tolerance * tolerance;

  const sqSegDist = (p, a, b) => {
    let x = a[0];
    let y = a[1];
    let dx = b[0] - x;
    let dy = b[1] - y;
    if (dx !== 0 || dy !== 0) {
      const t = ((p[0] - x) * dx + (p[1] - y) * dy) / (dx * dx + dy * dy);
      if (t > 1) {
        x = b[0];
        y = b[1];
      } else if (t > 0) {
        x += dx * t;
        y += dy * t;
      }
    }
    dx = p[0] - x;
    dy = p[1] - y;
    return dx * dx + dy * dy;
  };

  const rdp = (first, last, keep) => {
    let maxDist = 0;
    let index = -1;
    for (let i = first + 1; i < last; i++) {
      const d = sqSegDist(points[i], points[first], points[last]);
      if (d > maxDist) {
        maxDist = d;
        index = i;
      }
    }
    if (maxDist > sqTol && index !== -1) {
      rdp(first, index, keep);
      rdp(index, last, keep);
    } else {
      keep[index] = true;
    }
  };

  // Work on the open ring (drop the closing duplicate for the algorithm)
  const open = points.slice(0, -1);
  const keep = new Array(open.length).fill(false);
  keep[0] = true;
  keep[open.length - 1] = true;
  rdp(0, open.length - 1, keep);
  const out = [];
  for (let i = 0; i < open.length; i++) {
    if (keep[i]) out.push(open[i]);
  }
  if (out.length < 3) return points;
  out.push(out[0]);
  return out;
}

const signedArea = (ring) => {
  let sum = 0;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    sum += ring[j][0] * ring[i][1] - ring[i][0] * ring[j][1];
  }
  return sum / 2;
};

/**
 * d3-geo (like d3) expects exterior rings to be clockwise and holes to be
 * counter-clockwise. polygon-clipping emits the opposite (GeoJSON RFC 7946),
 * so every polygon is re-wound before it reaches the renderer.
 */
const normalizeWinding = (rings) =>
  rings.map((ring, index) => {
    const area = signedArea(ring);
    if (index === 0) return area > 0 ? ring.slice().reverse() : ring;
    return area < 0 ? ring.slice().reverse() : ring;
  });

const round = (n) => Number(n.toFixed(PRECISION));
const roundRing = (ring) => {
  const out = ring.map(([x, y]) => [round(x), round(y)]);
  // drop consecutive duplicates introduced by rounding
  return out.filter((p, i) => i === 0 || p[0] !== out[i - 1][0] || p[1] !== out[i - 1][1]);
};
const roundPoly = (poly) => {
  const rings = poly
    .map((ring) => simplifyRing(ring, TOLERANCE))
    .map(roundRing)
    .filter((r) => r.length > 3)
    .filter((r) => Math.abs(signedArea(r)) > 1e-9);
  if (!rings.length) return [];
  return rings.map((ring, i) => {
    const area = signedArea(ring);
    if (i === 0) return area > 0 ? ring.slice().reverse() : ring;
    return area < 0 ? ring.slice().reverse() : ring;
  });
};
const roundGeom = (g) =>
  g.type === 'Polygon'
    ? { type: 'Polygon', coordinates: roundPoly(g.coordinates) }
    : {
        type: 'MultiPolygon',
        coordinates: g.coordinates.map(roundPoly).filter((p) => p.length),
      };

const features = [];
for (const slug of Object.keys(META)) {
  const fc = objects[slug];
  const polys = [];
  for (const f of fc.features) {
    const g = f.geometry;
    if (!g) continue;
    if (g.type === 'Polygon') polys.push(normalizeWinding(g.coordinates));
    else if (g.type === 'MultiPolygon') polys.push(...g.coordinates.map(normalizeWinding));
  }
  let geom;
  try {
    const unioned = polygonClipping.union(...polys);
    geom = { type: 'MultiPolygon', coordinates: unioned };
  } catch (err) {
    console.warn('union failed for', slug, '-', err.message);
    const topology = topojson.topology({ s: fc }, { quantization: 1e5 });
    geom = merge(topology, topology.objects.s.geometries);
  }
  if (!geom) {
    console.warn('no geometry for', slug);
    continue;
  }
  features.push({
    type: 'Feature',
    id: slug,
    properties: {
      id: slug,
      name: META[slug].name,
      type: META[slug].type,
      capital: META[slug].capital,
    },
    geometry: roundGeom(geom),
  });
}

// Sanity check: d3-geo treats a zero-area ring as covering the whole sphere,
// so a bogus area here means a geometry problem rather than a data problem.
const { geoArea } = require('d3-geo');
const EARTH_R = 6371.0088;
for (const f of features) {
  const sqKm = geoArea(f) * EARTH_R * EARTH_R;
  if (!Number.isFinite(sqKm) || sqKm > 1e6) {
    console.warn('SUSPICIOUS area for', f.properties.name, sqKm);
  }
}

const out = {
  type: 'FeatureCollection',
  features,
};

fs.mkdirSync(OUT_DIR, { recursive: true });
const outFile = path.join(OUT_DIR, 'india-states.json');
fs.writeFileSync(outFile, JSON.stringify(out));
const size = fs.statSync(outFile).size;
console.log(`features: ${features.length}`);
console.log(`written: ${outFile} (${(size / 1024).toFixed(0)} KB)`);
const totalPts = features.reduce(
  (acc, f) =>
    acc +
    (f.geometry.type === 'Polygon'
      ? f.geometry.coordinates.reduce((a, r) => a + r.length, 0)
      : f.geometry.coordinates.reduce(
          (a, poly) => a + poly.reduce((b, r) => b + r.length, 0),
          0
        )),
  0
);
console.log('total points:', totalPts);
