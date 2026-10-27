import { geoContains, geoDistance, geoCentroid } from 'd3-geo';
import rawStates from '../data/india-states.json';
import { STATE_BY_ID } from '../data/states';
export const COLLECTION = rawStates;
const R = 6371.0088;
export function haversineKm(lat1, lon1, lat2, lon2) {
    const toRad = (d) => (d * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.min(1, Math.sqrt(a)));
}
/** Parses "12.9716, 77.5946" / "12.9716 77.5946" / "12.9716°N, 77.5946°E" */
export function parseCoordinates(input) {
    const cleaned = input.replace(/[°]/g, ' ').replace(/[NSnsEeWw]/g, ' ');
    const matches = cleaned.match(/-?\d+(?:\.\d+)?/g);
    if (!matches || matches.length < 2)
        return null;
    const nums = matches.map(Number).filter((n) => Number.isFinite(n));
    if (nums.length < 2)
        return null;
    const [a, b] = nums;
    const lat = Math.abs(a) <= 90 ? a : b;
    const lng = Math.abs(a) <= 90 ? b : a;
    if (Math.abs(lat) > 90 || Math.abs(lng) > 180)
        return null;
    return { lat, lng };
}
/**
 * Finds which state contains the given coordinate. Falls back to the nearest
 * state by great-circle distance when the point is outside the country.
 */
export function locate(lat, lng) {
    let inside = null;
    for (const f of COLLECTION.features) {
        if (geoContains(f, [lng, lat])) {
            inside = f.properties;
            break;
        }
    }
    if (inside) {
        const capital = STATE_BY_ID[inside.id]?.capital ?? inside.capital;
        const [capLat, capLng] = capitalCoords(inside.id);
        return {
            id: inside.id,
            name: inside.name,
            capital,
            inside: true,
            distanceKm: haversineKm(lat, lng, capLat, capLng),
            centroidLat: lat,
            centroidLng: lng,
        };
    }
    let best = null;
    for (const f of COLLECTION.features) {
        const [cLng, cLat] = geoCentroid(f);
        const d = haversineKm(lat, lng, cLat, cLng);
        if (!best || d < best.distanceKm) {
            best = {
                id: f.properties.id,
                name: f.properties.name,
                capital: STATE_BY_ID[f.properties.id]?.capital ?? f.properties.capital,
                inside: false,
                distanceKm: d,
                centroidLat: cLat,
                centroidLng: cLng,
            };
        }
    }
    return best;
}
const CAPITAL_CACHE = {};
/** Rough capital coordinates (lat, lng) for the distance readout. */
export function capitalCoords(stateId) {
    if (CAPITAL_CACHE[stateId])
        return CAPITAL_CACHE[stateId];
    const table = {
        'andhra-pradesh': [16.5062, 80.648],
        'arunachal-pradesh': [27.0844, 93.6053],
        assam: [26.2006, 92.9376],
        bihar: [25.5941, 85.1376],
        chhattisgarh: [21.2514, 81.6296],
        delhi: [28.6139, 77.209],
        'dnh-and-dd': [20.3974, 72.8328],
        goa: [15.4909, 73.8278],
        gujarat: [23.0225, 72.5714],
        haryana: [29.6857, 76.9905],
        'himachal-pradesh': [31.1048, 77.1734],
        'jammu-and-kashmir': [34.0837, 74.7973],
        jharkhand: [23.6102, 85.2799],
        karnataka: [12.9716, 77.5946],
        kerala: [8.5241, 76.9366],
        ladakh: [34.1526, 77.5771],
        lakshadweep: [10.5667, 72.6417],
        'madhya-pradesh': [23.2599, 77.4126],
        maharashtra: [19.076, 72.8777],
        manipur: [24.817, 93.9368],
        meghalaya: [25.5788, 91.8933],
        mizoram: [23.7271, 92.7176],
        nagaland: [25.6751, 94.1086],
        odisha: [20.9517, 85.0985],
        puducherry: [11.9416, 79.8083],
        punjab: [31.1471, 75.3414],
        rajasthan: [26.9124, 75.7813],
        sikkim: [27.533, 88.5122],
        'tamil-nadu': [13.0827, 80.2707],
        telangana: [17.385, 78.4867],
        tripura: [23.8315, 91.2868],
        'uttar-pradesh': [26.8467, 80.9462],
        uttarakhand: [30.3165, 78.0322],
        'west-bengal': [22.9868, 87.855],
        'andaman-and-nicobar-islands': [11.7401, 92.6586],
        chandigarh: [30.7333, 76.7794],
    };
    const value = table[stateId] ?? [20, 78];
    CAPITAL_CACHE[stateId] = value;
    return value;
}
/** Great-circle distance between two states' capitals. */
export function capitalDistance(a, b) {
    const [aLat, aLng] = capitalCoords(a);
    const [bLat, bLng] = capitalCoords(b);
    return haversineKm(aLat, aLng, bLat, bLng);
}
/** Angular distance (radians) between two lon/lat points on the globe. */
export function angularDistance(lon1, lat1, lon2, lat2) {
    return geoDistance([lon1, lat1], [lon2, lat2]);
}
