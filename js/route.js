import { haversineDistance } from './utils.js';

export const ROUTE_NAME = 'Las Americas - Los 3 Ojos';

export const ROUTE_PATH = [
  [18.493223, -69.750708],
  [18.495604, -69.750532],
  [18.495510, -69.749797],
  [18.494328, -69.746950],
  [18.494100, -69.746899],
  [18.493390, -69.747689],
  [18.492855, -69.747466],
  [18.489466, -69.747931],
  [18.489336, -69.748804],
  [18.488273, -69.749108],
  [18.487738, -69.748522],
  [18.488205, -69.747435],
  [18.488505, -69.747330],
  [18.488764, -69.743089],
  [18.484865, -69.743034],
  [18.483311, -69.743683],
  [18.476692, -69.743235],
  [18.464185, -69.741822],
  [18.463483, -69.741811],
  [18.463525, -69.741772],
  [18.464156, -69.753621],
  [18.464596, -69.767396],
  [18.465542, -69.777910],
  [18.465990, -69.778801],
  [18.466465, -69.788183],
  [18.466526, -69.794266],
  [18.465116, -69.801517],
  [18.465028, -69.813940],
  [18.465578, -69.819793],
  [18.472477, -69.832449],
  [18.481275, -69.839325],
];

export const STOP_NAMES = [
  'Inicio',
  'C/Carmen kidelo 1',
  'C/Carmen kidelo 2',
  'C/Carmen kidelo 3',
  'AV/camino real 1',
  'AV/camino real 2',
  'AV/camino real 3',
  'AV/camino real 4',
  'AV/camino real 5',
  'AV/camino real 6',
  'AV/camino real 7',
  'AV/camino real 8',
  'AV/camino real 9',
  'C/Oro y paz',
  'AV/30 junio 1',
  'AV/30 junio 2',
  'Parada AV/30 junio 1',
  'Parada AV/30 junio 2',
  'AV/30 junio 3',
  'Las americas 1',
  'Parada Las americas 1',
  'Las americas 2',
  'Las americas 3',
  'Las americas 4',
  'Las americas 5',
  'Parada Las americas 2',
  'Parada Las americas 3',
  'Parada Las americas 4',
  'Parada Las americas 5',
  'Las americas 6',
  'Las americas 7',
];

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