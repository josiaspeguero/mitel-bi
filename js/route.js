import { haversineDistance } from './utils.js';

export const ROUTE_NAME = 'Las Americas - Los 3 Ojos';

export const ROUTE_PATH = [
  [18.493059, -69.750604],
  [18.495632, -69.750635],
  [18.495642, -69.750358],
  [18.495610, -69.750149],
  [18.495424, -69.749361],
  [18.495308, -69.748987],
  [18.495270, -69.748885],
  [18.495081, -69.748476],
  [18.494758, -69.747790],
  [18.494394, -69.747014],
  [18.494365, -69.746964],
  [18.494350, -69.746939],
  [18.494309, -69.746942],
  [18.494229, -69.746921],
  [18.494076, -69.746956],
  [18.493969, -69.747005],
  [18.493839, -69.747088],
  [18.493680, -69.747271],
  [18.493553, -69.747463],
  [18.493405, -69.747723],
  [18.493491, -69.747845],
  [18.493557, -69.747992],
  [18.493640, -69.748228],
  [18.493666, -69.748355],
  [18.493681, -69.748485],
  [18.493674, -69.748619],
  [18.493643, -69.748761],
  [18.493542, -69.749003],
  [18.493473, -69.749107],
  [18.493371, -69.749215],
  [18.493261, -69.749316],
  [18.493145, -69.749389],
  [18.493007, -69.749448],
  [18.492947, -69.749458],
  [18.492810, -69.749473],
  [18.492599, -69.749459],
  [18.492488, -69.749441],
  [18.492490, -69.749397],
  [18.492588, -69.747455],
  [18.492616, -69.746664],
  [18.492680, -69.745231],
  [18.492770, -69.743363],
  [18.492701, -69.743257],
  [18.492571, -69.743153],
  [18.492484, -69.743151],
  [18.490868, -69.743110],
  [18.489283, -69.743086],
  [18.488417, -69.743071],
  [18.485527, -69.743001],
  [18.485219, -69.742994],
  [18.485107, -69.743004],
  [18.484876, -69.743048],
  [18.484749, -69.743123],
  [18.484369, -69.743322],
  [18.484168, -69.743414],
  [18.483880, -69.743510],
  [18.483494, -69.743650],
  [18.483252, -69.743682],
  [18.482711, -69.743662],
  [18.482166, -69.743637],
  [18.480058, -69.743450],
  [18.479511, -69.743403],
  [18.478280, -69.743297],
  [18.476530, -69.743146],
  [18.475499, -69.743049],
  [18.474968, -69.742990],
  [18.474438, -69.742931],
  [18.473908, -69.742871],
  [18.473113, -69.742783],
  [18.472107, -69.742670],
  [18.469344, -69.742394],
  [18.465516, -69.741975],
  [18.464499, -69.741845],
  [18.463483, -69.741715],
  [18.463484, -69.741719],
  [18.463513, -69.742011],
  [18.463687, -69.743292],
  [18.463788, -69.744427],
  [18.463864, -69.745279],
  [18.463896, -69.747205],
  [18.463899, -69.749198],
  [18.463906, -69.749826],
  [18.463912, -69.750430],
  [18.463937, -69.751311],
  [18.463978, -69.751927],
  [18.464015, -69.752383],
  [18.464111, -69.753376],
  [18.464246, -69.754539],
  [18.464346, -69.755572],
  [18.464550, -69.757376],
  [18.464574, -69.759888],
  [18.464593, -69.761842],
  [18.464544, -69.763472],
  [18.464502, -69.765026],
  [18.464493, -69.765674],
  [18.464509, -69.766519],
  [18.464541, -69.767159],
  [18.465187, -69.772620],
  [18.465332, -69.773900],
  [18.465411, -69.775124],
  [18.465465, -69.776103],
  [18.465508, -69.777098],
  [18.465531, -69.778006],
  [18.465594, -69.778716],
  [18.465705, -69.779591],
  [18.465945, -69.781187],
  [18.466071, -69.782030],
  [18.466234, -69.783076],
  [18.466295, -69.783681],
  [18.466340, -69.784233],
  [18.466352, -69.784804],
  [18.466361, -69.785276],
  [18.466367, -69.786195],
  [18.466371, -69.786808],
  [18.466380, -69.787087],
  [18.466413, -69.788203],
  [18.466413, -69.788439],
  [18.466416, -69.789285],
  [18.466423, -69.789938],
  [18.466477, -69.791685],
  [18.466514, -69.793287],
  [18.466499, -69.794196],
  [18.466465, -69.794541],
  [18.466230, -69.795861],
  [18.466029, -69.796731],
  [18.465973, -69.796993],
  [18.465749, -69.798040],
  [18.465527, -69.799044],
  [18.465301, -69.800123],
  [18.465184, -69.800735],
  [18.465065, -69.801851],
  [18.465029, -69.802295],
  [18.465018, -69.802525],
  [18.465016, -69.803119],
  [18.465031, -69.803677],
  [18.465062, -69.805062],
  [18.465074, -69.805614],
  [18.465064, -69.806168],
  [18.465059, -69.806445],
  [18.464995, -69.807042],
  [18.464886, -69.807626],
  [18.464735, -69.808505],
  [18.464692, -69.808890],
  [18.464658, -69.809590],
  [18.464735, -69.810588],
  [18.464769, -69.811018],
  [18.464881, -69.812386],
  [18.464909, -69.812726],
  [18.464980, -69.813607],
  [18.465057, -69.814541],
  [18.465105, -69.815237],
  [18.465134, -69.815716],
  [18.465214, -69.817480],
  [18.465306, -69.818379],
  [18.465448, -69.819341],
  [18.465505, -69.819651],
  [18.465577, -69.819955],
  [18.465648, -69.820259],
  [18.465835, -69.820942],
  [18.465990, -69.821452],
  [18.466155, -69.821889],
  [18.466609, -69.823368],
  [18.466934, -69.824439],
  [18.467114, -69.824974],
  [18.467298, -69.825492],
  [18.467378, -69.825699],
  [18.467491, -69.826061],
  [18.467516, -69.826187],
  [18.467548, -69.826292],
  [18.467635, -69.826483],
  [18.467838, -69.826875],
  [18.468137, -69.827369],
  [18.468558, -69.828066],
  [18.468848, -69.828492],
  [18.468931, -69.828583],
  [18.469017, -69.828660],
  [18.469174, -69.828768],
  [18.469342, -69.828848],
  [18.469690, -69.828970],
  [18.470522, -69.829343],
  [18.470628, -69.829405],
  [18.470732, -69.829478],
  [18.470829, -69.829569],
  [18.470987, -69.829763],
  [18.471212, -69.830133],
  [18.471459, -69.830619],
  [18.471702, -69.831077],
  [18.471967, -69.831568],
  [18.472122, -69.831807],
  [18.472201, -69.831917],
  [18.472393, -69.832137],
  [18.473137, -69.832682],
  [18.473577, -69.833003],
  [18.474226, -69.833475],
  [18.474655, -69.833787],
  [18.475298, -69.834255],
  [18.476137, -69.834883],
  [18.476799, -69.835362],
  [18.477833, -69.836075],
  [18.478397, -69.836490],
  [18.479421, -69.837229],
  [18.480051, -69.837686],
  [18.480471, -69.837991],
  [18.480818, -69.838268],
  [18.480947, -69.838422],
  [18.481079, -69.838579],
  [18.481162, -69.838697],
  [18.481247, -69.838833],
  [18.481360, -69.839049],
];

export const STOP_NAMES = ROUTE_PATH.map((_, i) => `Punto ${i + 1}`);

const STOP_PROXIMITY_RADIUS = 80;

const routeState = {
  stops: STOP_NAMES.map((name, i) => ({
    id: i,
    name,
    lat: ROUTE_PATH[i][0],
    lon: ROUTE_PATH[i][1],
    status: 'upcoming',
  })),
  currentStopIndex: -1,
};

export function getStops() {
  return routeState.stops;
}

export function getCurrentStop() {
  if (routeState.currentStopIndex >= 0) {
    return routeState.stops[routeState.currentStopIndex];
  }
  return null;
}

export function getNextStop() {
  for (let i = 0; i < routeState.stops.length; i++) {
    if (routeState.stops[i].status === 'upcoming') {
      return routeState.stops[i];
    }
  }
  return null;
}

export function getRemainingStops() {
  return routeState.stops.filter((s) => s.status === 'upcoming');
}

export function detectStop(lat, lon) {
  let closestIndex = -1;
  let closestDistance = Infinity;

  routeState.stops.forEach((stop, i) => {
    const dist = haversineDistance(lat, lon, stop.lat, stop.lon);
    if (dist < closestDistance) {
      closestDistance = dist;
      closestIndex = i;
    }
  });

  const isNearStop = closestDistance <= STOP_PROXIMITY_RADIUS;
  const changed =
    isNearStop && closestIndex !== routeState.currentStopIndex;

  if (changed) {
    for (let i = 0; i <= closestIndex; i++) {
      routeState.stops[i].status = 'visited';
    }
    routeState.stops[closestIndex].status = 'current';
    for (let i = closestIndex + 1; i < routeState.stops.length; i++) {
      routeState.stops[i].status = 'upcoming';
    }
    routeState.currentStopIndex = closestIndex;
  } else if (!isNearStop && routeState.currentStopIndex >= 0) {
    routeState.stops[routeState.currentStopIndex].status = 'visited';
    routeState.currentStopIndex = -1;
  }

  return {
    currentStop: getCurrentStop(),
    nextStop: getNextStop(),
    changed,
  };
}

export function getRoutePath() {
  return ROUTE_PATH;
}

const OVERPASS_ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.private.coffee/api/interpreter',
];
const SEARCH_RADIUS = 60;
const PLACE_NAME_MAX_RADIUS = 80;

function toMeters(lat, lon) {
  return {
    x: lon * 111320 * Math.cos((lat * Math.PI) / 180),
    y: lat * 111320,
  };
}

function distanceToSegmentMeters(pLat, pLon, aLat, aLon, bLat, bLon) {
  const p = toMeters(pLat, pLon);
  const a = toMeters(aLat, aLon);
  const b = toMeters(bLat, bLon);
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len2 = dx * dx + dy * dy;
  let t = len2 === 0 ? 0 : ((p.x - a.x) * dx + (p.y - a.y) * dy) / len2;
  t = Math.max(0, Math.min(1, t));
  const cx = a.x + t * dx - p.x;
  const cy = a.y + t * dy - p.y;
  return Math.hypot(cx, cy);
}

function distanceToWayMeters(pLat, pLon, geometry) {
  if (!geometry || geometry.length === 0) return Infinity;
  let d = Infinity;
  for (let i = 0; i < geometry.length; i++) {
    const a = geometry[i];
    const b = geometry[i + 1] || a;
    const seg = distanceToSegmentMeters(pLat, pLon, a.lat, a.lon, b.lat, b.lon);
    if (seg < d) d = seg;
  }
  return d;
}

async function queryOverpass(aroundFilters) {
  const query = `[out:json][timeout:45];(\n  ${aroundFilters.join(';\n  ')};\n);out geom;`;
  let lastError = null;
  for (const endpoint of OVERPASS_ENDPOINTS) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 50000);
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'RAUDI-Fleet-Monitor/1.0 (Santo Domingo bus tracking demo)',
        },
        body: 'data=' + encodeURIComponent(query),
        signal: controller.signal,
      });
      if (!res.ok) throw new Error(`Overpass ${endpoint} responded ${res.status}`);
      return await res.json();
    } catch (err) {
      lastError = err;
    } finally {
      clearTimeout(timer);
    }
  }
  throw lastError;
}

export async function labelStopsWithPlaceNames() {
  let changed = 0;
  try {
    const chunks = [];
    for (let i = 0; i < ROUTE_PATH.length; i += 35) {
      chunks.push(ROUTE_PATH.slice(i, i + 35));
    }

    const elements = [];
    for (let i = 0; i < chunks.length; i += 2) {
      const batch = chunks.slice(i, i + 2);
      const results = await Promise.all(
        batch.map(async (points) => {
          try {
            return await queryOverpass(
              points.map(
                ([lat, lon]) => `way(around:${SEARCH_RADIUS},${lat},${lon})[name]`
              )
            );
          } catch (err) {
            console.warn('[route] No se pudo consultar un lote de nombres:', err);
            return { elements: [] };
          }
        })
      );
      results.forEach((data) => {
        (data.elements || [])
          .filter(
            (el) =>
              el.type === 'way' &&
              el.tags &&
              typeof el.tags.name === 'string' &&
              Array.isArray(el.geometry)
          )
          .forEach((el) => elements.push(el));
      });
    }

    routeState.stops.forEach((stop) => {
      let bestName = null;
      let bestDist = Infinity;
      for (const way of elements) {
        const d = distanceToWayMeters(stop.lat, stop.lon, way.geometry);
        if (d < bestDist) {
          bestDist = d;
          bestName = way.tags.name;
        }
      }
      if (bestName && bestDist <= PLACE_NAME_MAX_RADIUS && bestName !== stop.name) {
        stop.name = bestName;
        changed++;
      }
    });
  } catch (err) {
    console.warn('[route] No se pudieron obtener nombres de lugares:', err);
  }
  return changed;
}