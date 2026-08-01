import { haversineDistance } from './utils.js';

export const ROUTE_NAME = 'Ruta 27 - Av. 27 de Febrero';

export const ROUTE_PATH = [
  [18.496824, -69.747874],
  [18.491200, -69.759100],
  [18.486300, -69.769400],
  [18.482100, -69.777800],
  [18.478500, -69.785200],
  [18.475200, -69.792100],
  [18.472400, -69.798600],
  [18.469800, -69.804800],
  [18.467600, -69.810100],
  [18.465500, -69.815300],
  [18.463400, -69.820600],
  [18.461600, -69.825100],
  [18.459900, -69.829500],
  [18.458300, -69.834200],
  [18.457100, -69.838400],
];

export const STOP_NAMES = [
  'Las Américas',
  'Megacentro',
  'San Vicente de Paúl',
  'Plaza de la Bandera',
  'Winston Churchill',
  'Abraham Lincoln',
  'Máximo Gómez',
  'UASD',
  'Ortega y Gasset',
  'Tiradentes',
  'Luperón',
  'Nuñez de Cáceres',
  'Privada',
  'Isabel Aguiar',
  'Plaza del Sol',
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