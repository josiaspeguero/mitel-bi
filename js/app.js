import { connect, getStatus, onTelemetry } from './mqtt.js';
import { initMap, drawRoute, drawStopMarkers, updateBusMarker, updateStopMarkers, invalidateSize } from './map.js';
import { getState, updateTelemetry, setRouteName } from './vehicle.js';
import { getStops, detectStop, getRoutePath, ROUTE_NAME, labelStopsWithPlaceNames } from './route.js';
import { initUI, renderAll, showToast } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('[app] Initializing Bus Tracking Dashboard...');

  initUI();

  setRouteName(ROUTE_NAME);

  initMap('map-container');

  const routePath = getRoutePath();
  drawRoute(routePath);

  const stops = getStops();
  drawStopMarkers(stops);

  labelStopsWithPlaceNames().then((changed) => {
    if (changed > 0) {
      drawStopMarkers(getStops());
      const state = getState();
      renderAll(state, { currentStop: getCurrentStop(), nextStop: getNextStop() }, getStatus());
    }
  });

  onTelemetry((telemetry) => {
    handleTelemetry(telemetry);
  });

  connect();

  setInterval(() => {
    const state = getState();
    const stops = getStops();
    const currentStop = stops.find((s) => s.status === 'current') || null;
    const nextStop = stops.find((s) => s.status === 'upcoming') || null;
    renderAll(state, { currentStop, nextStop }, getStatus());
    updateStopMarkers(stops);
  }, 2000);

  window.addEventListener('resize', () => {
    invalidateSize();
  });

  console.log('[app] Dashboard initialized.');
});

function handleTelemetry(telemetry) {
  console.log('[coordinate]', {
    lat: telemetry.lat,
    lon: telemetry.lon,
    speed: telemetry.vel,
    satellites: telemetry.sat,
    passengers: telemetry.pas,
    fecha: telemetry.fecha,
    hora: telemetry.hora,
  });

  updateTelemetry(telemetry);

  const { currentStop, nextStop, changed } = detectStop(telemetry.lat, telemetry.lon);

  updateBusMarker(telemetry.lat, telemetry.lon);

  if (changed) {
    updateStopMarkers(getStops());
  }

  const state = getState();
  renderAll(state, { currentStop, nextStop }, getStatus());
}