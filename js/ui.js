import { formatTimestamp, formatNumber } from './utils.js';
import { getRemainingStops } from './route.js';

let dom = {};
let initialized = false;

export function initUI() {
  dom = {
    connectionStatus: document.getElementById('connection-status'),
    connectionText: document.getElementById('connection-text'),
    vehicleId: document.getElementById('info-vehicle-id'),
    maxCapacity: document.getElementById('info-capacity'),
    passengers: document.getElementById('info-passengers'),
    occupancyPct: document.getElementById('info-occupancy'),
    occupancyBar: document.getElementById('occupancy-bar'),
    speed: document.getElementById('info-speed'),
    status: document.getElementById('info-status'),
    latitude: document.getElementById('info-latitude'),
    longitude: document.getElementById('info-longitude'),
    satellites: document.getElementById('info-satellites'),
    lastUpdate: document.getElementById('info-last-update'),
    currentStop: document.getElementById('info-current-stop'),
    nextStop: document.getElementById('info-next-stop'),
    routeName: document.getElementById('info-route-name'),
    ticketPrice: document.getElementById('info-ticket-price'),
    remainingStopsList: document.getElementById('remaining-stops-list'),
    sidebar: document.getElementById('sidebar'),
    sidebarToggle: document.getElementById('sidebar-toggle'),
    loadingOverlay: document.getElementById('loading-overlay'),
    toastContainer: document.getElementById('toast-container'),
  };

  if (dom.vehicleId) dom.vehicleId.textContent = 'BUS-01';
  if (dom.maxCapacity) dom.maxCapacity.textContent = '40 Passengers';

  if (dom.sidebarToggle) {
    dom.sidebarToggle.addEventListener('click', toggleSidebar);
  }

  setTimeout(() => {
    if (dom.loadingOverlay && !dom.loadingOverlay.classList.contains('hidden')) {
      dom.loadingOverlay.classList.add('hidden');
    }
  }, 5000);

  initialized = true;
}

export function renderAll(vehicleState, routeInfo, connectionStatus) {
  if (!initialized) return;

  updateConnectionBadge(connectionStatus);
  updateVehicleInfo(vehicleState);
  updateOccupancy(vehicleState.occupancyPct, vehicleState.passengers);
  updateRouteInfo(routeInfo, vehicleState.routeName, vehicleState.ticketPrice);
  updateRemainingStops();
  updateLastUpdate(vehicleState.fecha, vehicleState.hora);

  if (dom.loadingOverlay && vehicleState.lat !== null) {
    dom.loadingOverlay.classList.add('hidden');
  }
}

function updateConnectionBadge(status) {
  if (!dom.connectionStatus || !dom.connectionText) return;

  dom.connectionStatus.className = 'connection-badge ' + status;
  dom.connectionStatus.setAttribute('data-status', status);

  switch (status) {
    case 'connected':
      dom.connectionText.textContent = 'Connected';
      break;
    case 'disconnected':
      dom.connectionText.textContent = 'Disconnected';
      break;
    case 'reconnecting':
      dom.connectionText.textContent = 'Reconnecting...';
      break;
  }
}

function updateVehicleInfo(vs) {
  if (dom.passengers) dom.passengers.textContent = vs.passengers;
  if (dom.speed) dom.speed.textContent = formatNumber(vs.speed, 1) + ' km/h';
  if (dom.latitude) dom.latitude.textContent = vs.lat !== null ? formatNumber(vs.lat, 6) : '--';
  if (dom.longitude) dom.longitude.textContent = vs.lon !== null ? formatNumber(vs.lon, 6) : '--';
  if (dom.satellites) dom.satellites.textContent = vs.satellites;

  if (dom.status) {
    dom.status.textContent = vs.status;
    dom.status.className = 'info-value status-' + vs.status.toLowerCase().replace(/\s+/g, '-');
  }
}

function updateOccupancy(pct, passengers) {
  if (dom.occupancyPct) {
    dom.occupancyPct.textContent = formatNumber(pct, 1) + '%';
  }

  if (dom.occupancyBar) {
    dom.occupancyBar.style.width = pct + '%';

    if (pct < 50) {
      dom.occupancyBar.className = 'occupancy-fill low';
    } else if (pct < 80) {
      dom.occupancyBar.className = 'occupancy-fill medium';
    } else {
      dom.occupancyBar.className = 'occupancy-fill high';
    }
  }
}

function updateRouteInfo(routeInfo, routeName, ticketPrice) {
  if (dom.currentStop) {
    dom.currentStop.textContent = routeInfo.currentStop
      ? routeInfo.currentStop.name
      : '--';
  }
  if (dom.nextStop) {
    dom.nextStop.textContent = routeInfo.nextStop
      ? routeInfo.nextStop.name
      : '--';
  }
  if (dom.routeName) dom.routeName.textContent = routeName;
  if (dom.ticketPrice) dom.ticketPrice.textContent = ticketPrice;
}

function updateRemainingStops() {
  if (!dom.remainingStopsList) return;

  const remaining = getRemainingStops();
  dom.remainingStopsList.innerHTML = remaining
    .map(
      (s, i) =>
        `<li class="stop-item">
          <span class="stop-dot"></span>
          <span class="stop-name">${s.name}</span>
        </li>`
    )
    .join('');

  if (remaining.length === 0) {
    dom.remainingStopsList.innerHTML =
      '<li class="stop-item end">All stops visited</li>';
  }
}

function updateLastUpdate(fecha, hora) {
  if (!dom.lastUpdate) return;

  if (fecha && hora) {
    dom.lastUpdate.textContent = formatTimestamp(fecha, hora);
  }
}

function toggleSidebar() {
  if (dom.sidebar) {
    dom.sidebar.classList.toggle('open');
  }
}

export function showToast(message, type = 'error') {
  if (!dom.toastContainer) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;

  dom.toastContainer.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('show'));

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}