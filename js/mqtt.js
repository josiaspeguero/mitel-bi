import { parseTelemetryPayload } from './utils.js';

const BROKER_URL = 'wss://broker.hivemq.com:8884/mqtt';
const TOPIC = 'omsa/ruta/27/bus/01';

export const STATUS = {
  CONNECTED: 'connected',
  DISCONNECTED: 'disconnected',
  RECONNECTING: 'reconnecting',
};

let client = null;
let connectionStatus = STATUS.DISCONNECTED;
let listeners = [];

export function getStatus() {
  return connectionStatus;
}

export function onTelemetry(callback) {
  listeners.push(callback);
}

function notifyListeners(telemetry) {
  listeners.forEach((cb) => {
    try {
      cb(telemetry);
    } catch (err) {
      console.error('[mqtt] Listener error:', err);
    }
  });
}

function setStatus(newStatus) {
  connectionStatus = newStatus;
}

export function connect() {
  if (client) {
    client.end(true);
  }

  setStatus(STATUS.RECONNECTING);

  if (typeof mqtt === 'undefined') {
    console.error('[mqtt] MQTT.js library not loaded. Ensure the CDN script is included in index.html.');
    setStatus(STATUS.DISCONNECTED);
    return;
  }

  try {
    client = mqtt.connect(BROKER_URL, {
      clean: true,
      connectTimeout: 5000,
      reconnectPeriod: 3000,
    });

    client.on('connect', () => {
      console.log('[mqtt] Connected to broker');
      setStatus(STATUS.CONNECTED);

      client.subscribe(TOPIC, { qos: 1 }, (err) => {
        if (err) {
          console.error('[mqtt] Subscribe error:', err);
        } else {
          console.log('[mqtt] Subscribed to', TOPIC);
        }
      });
    });

    client.on('message', (topic, payload) => {
      if (topic !== TOPIC) return;

      const message = payload.toString();
      console.log(`[mqtt] Message received on ${topic}:`, message);

      const telemetry = parseTelemetryPayload(payload);
      if (telemetry) {
        notifyListeners(telemetry);
      }
    });

    client.on('reconnect', () => {
      console.log('[mqtt] Reconnecting...');
      setStatus(STATUS.RECONNECTING);
    });

    client.on('close', () => {
      console.log('[mqtt] Connection closed');
      if (connectionStatus === STATUS.CONNECTED) {
        setStatus(STATUS.RECONNECTING);
      }
    });

    client.on('offline', () => {
      console.log('[mqtt] Client offline');
      setStatus(STATUS.DISCONNECTED);
    });

    client.on('error', (err) => {
      console.error('[mqtt] Error:', err.message);
    });
  } catch (err) {
    console.error('[mqtt] Failed to create client:', err);
    setStatus(STATUS.DISCONNECTED);
  }
}

export function disconnect() {
  if (client) {
    client.end(true);
    client = null;
  }
  setStatus(STATUS.DISCONNECTED);
}