import { calculateBearing } from './utils.js';

const DEFAULT_CENTER = [18.493059, -69.750604];
const DEFAULT_ZOOM = 14;

let map = null;
let busMarker = null;
let routePolyline = null;
let stopMarkers = [];
let prevLat = null;
let prevLon = null;

export function initMap(containerId) {
  map = L.map(containerId, {
    center: DEFAULT_CENTER,
    zoom: DEFAULT_ZOOM,
    zoomControl: true,
    attributionControl: true,
  }); 

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  }).addTo(map);

  const busIcon = L.divIcon({
    className: 'bus-marker-icon',
    html: `<div class="bus-marker-inner">
      <svg width="32" height="32" viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="14" fill="#1E90FF" stroke="#fff" stroke-width="3"/>
        <polygon points="16,6 22,16 16,26 10,16" fill="#fff" transform="rotate(0,16,16)"/>
      </svg>
    </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });

  busMarker = L.marker(DEFAULT_CENTER, {
    icon: busIcon,
    zIndexOffset: 1000,
  }).addTo(map);

  busMarker.bindPopup('BUS-01');
}

export function drawRoute(routePath) {
  if (routePolyline) {
    map.removeLayer(routePolyline);
  }

  routePolyline = L.polyline(routePath, {
    color: '#1E90FF',
    weight: 5,
    opacity: 0.8,
    lineJoin: 'round',
    dashArray: null,
  }).addTo(map);
}

export function drawStopMarkers(stops) {
  stopMarkers.forEach((m) => map.removeLayer(m));
  stopMarkers = [];

  stops.forEach((stop) => {
    const marker = L.circleMarker([stop.lat, stop.lon], {
      radius: 7,
      fillColor: getStopColor(stop.status),
      color: '#ffffff',
      weight: 2,
      opacity: 1,
      fillOpacity: 0.9,
    }).addTo(map);

    marker.bindTooltip(stop.name, {
      permanent: false,
      direction: 'top',
      offset: [0, -10],
    });

    stopMarkers.push(marker);
  });
}

export function updateStopMarkers(stops) {
  stops.forEach((stop, i) => {
    if (stopMarkers[i]) {
      stopMarkers[i].setStyle({
        fillColor: getStopColor(stop.status),
      });
    }
  });
}

function getStopColor(status) {
  switch (status) {
    case 'visited':
      return '#9CA3AF';
    case 'current':
      return '#F59E0B';
    case 'upcoming':
      return '#1E90FF';
    default:
      return '#9CA3AF';
  }
}

export function updateBusMarker(lat, lon) {
  if (!busMarker || !map) return;

  const newLatLng = L.latLng(lat, lon);

  const markerEl = busMarker.getElement();
  if (markerEl) {
    markerEl.style.transition = 'transform 0.5s ease-out';
  }

  busMarker.setLatLng(newLatLng);

  busMarker.setPopupContent(`BUS-01<br>${lat.toFixed(6)}, ${lon.toFixed(6)}`);

  if (prevLat !== null && prevLon !== null) {
    const bearing = calculateBearing(prevLat, prevLon, lat, lon);
    rotateMarker(bearing);
  }

  const mapCenter = map.getCenter();
  if (prevLat !== null && prevLon !== null) {
    const dist = mapCenter.distanceTo(L.latLng(prevLat, prevLon));
    if (dist < 20) {
      map.panTo(newLatLng, { animate: true, duration: 0.5 });
    }
  }

  prevLat = lat;
  prevLon = lon;
}

function rotateMarker(bearing) {
  const el = busMarker.getElement();
  if (!el) return;

  const inner = el.querySelector('.bus-marker-inner');
  if (!inner) return;

  inner.style.transform = `rotate(${bearing}deg)`;
}

export function getMap() {
  return map;
}

export function getMarkerPosition() {
  if (!busMarker) return null;
  const ll = busMarker.getLatLng();
  return { lat: ll.lat, lon: ll.lng };
}

export function invalidateSize() {
  if (map) {
    map.invalidateSize();
  }
}