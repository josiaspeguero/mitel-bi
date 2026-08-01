export function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const toRad = (deg) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export function parseTelemetryPayload(payload) {
  try {
    const data = JSON.parse(payload.toString());

    if (
      typeof data.lat !== 'number' ||
      typeof data.lon !== 'number' ||
      typeof data.sat !== 'number' ||
      typeof data.vel !== 'number' ||
      typeof data.pas !== 'number' ||
      typeof data.fecha !== 'string' ||
      typeof data.hora !== 'string'
    ) {
      console.warn('[utils] Invalid telemetry payload: missing or malformed fields', data);
      return null;
    }

    if (data.lat < -90 || data.lat > 90 || data.lon < -180 || data.lon > 180) {
      console.warn('[utils] Telemetry coordinates out of range', data);
      return null;
    }

    return {
      lat: data.lat,
      lon: data.lon,
      sat: data.sat,
      vel: data.vel,
      pas: data.pas,
      fecha: data.fecha,
      hora: data.hora,
    };
  } catch (err) {
    console.warn('[utils] Failed to parse MQTT payload JSON:', err.message);
    return null;
  }
}

export function formatTimestamp(fecha, hora) {
  try {
    const [year, month, day] = fecha.split('-').map(Number);
    const [hourStr, minStr, secStr] = hora.split(':');
    let hour = parseInt(hourStr, 10);
    const minute = parseInt(minStr, 10);
    const second = parseInt(secStr, 10);

    const date = new Date(year, month - 1, day, hour, minute, second);

    if (isNaN(date.getTime())) {
      return `${fecha} ${hora}`;
    }

    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  } catch {
    return `${fecha} ${hora}`;
  }
}

export function calculateBearing(lat1, lon1, lat2, lon2) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const toDeg = (rad) => (rad * 180) / Math.PI;

  const dLon = toRad(lon2 - lon1);
  const y = Math.sin(dLon) * Math.cos(toRad(lat2));
  const x =
    Math.cos(toRad(lat1)) * Math.sin(toRad(lat2)) -
    Math.sin(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(dLon);

  let bearing = toDeg(Math.atan2(y, x));
  return (bearing + 360) % 360;
}

export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function formatNumber(value, decimals = 2) {
  return Number(value).toFixed(decimals);
}