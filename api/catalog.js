import { barbers, closeTime, openTime, sendJson, services } from '../server.js';

export default function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    sendJson(response, 405, { error: 'Method not allowed.' });
    return;
  }

  sendJson(response, 200, {
    services,
    barbers,
    schedule: { days: 'Tuesday–Saturday', opensAt: openTime, closesAt: closeTime },
  });
}