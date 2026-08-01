import { clamp } from './utils.js';

const VEHICLE_ID = 'BUS-01';
const MAX_CAPACITY = 40;
const TICKET_PRICE = 'RD$35.00';

const OUT_OF_SERVICE_THRESHOLD_MS = 10 * 60 * 1000;

const state = {
  vehicleId: VEHICLE_ID,
  maxCapacity: MAX_CAPACITY,
  ticketPrice: TICKET_PRICE,
  routeName: '',

  lat: null,
  lon: null,
  speed: 0,
  passengers: 0,
  satellites: 0,
  fecha: '',
  hora: '',

  occupancyPct: 0,
  status: 'Out of Service',
  lastMovementTime: null,
  lastUpdate: '',
  outOfServiceTimer: null,
};

export function getState() {
  return { ...state };
}

export function setRouteName(name) {
  state.routeName = name;
}

export function updateTelemetry(telemetry) {
  state.lat = telemetry.lat;
  state.lon = telemetry.lon;
  state.speed = telemetry.vel;
  state.passengers = telemetry.pas;
  state.satellites = telemetry.sat;
  state.fecha = telemetry.fecha;
  state.hora = telemetry.hora;

  state.occupancyPct = clamp(
    (state.passengers / state.maxCapacity) * 100,
    0,
    100
  );

  if (state.speed > 0) {
    state.status = 'In Service';
    state.lastMovementTime = Date.now();

    if (state.outOfServiceTimer) {
      clearTimeout(state.outOfServiceTimer);
      state.outOfServiceTimer = null;
    }
  } else if (state.speed === 0 && state.status === 'In Service') {
    if (!state.outOfServiceTimer && state.lastMovementTime) {
      const elapsed = Date.now() - state.lastMovementTime;
      const remaining = OUT_OF_SERVICE_THRESHOLD_MS - elapsed;

      if (remaining <= 0) {
        state.status = 'Out of Service';
      } else {
        state.outOfServiceTimer = setTimeout(() => {
          state.status = 'Out of Service';
          state.outOfServiceTimer = null;
        }, remaining);
      }
    }
  }

  if (!state.lastMovementTime && state.speed === 0) {
    state.status = 'Out of Service';
  }
}

export function destroy() {
  if (state.outOfServiceTimer) {
    clearTimeout(state.outOfServiceTimer);
    state.outOfServiceTimer = null;
  }
}