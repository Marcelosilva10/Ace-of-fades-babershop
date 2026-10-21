import { getSlots, readBookings, sendJson } from '../server.js';

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    sendJson(response, 405, { error: 'Method not allowed.' });
    return;
  }

  const { date, barberId, serviceId } = request.query || {};
  try {
    const bookings = await readBookings();
    sendJson(response, 200, {
      date,
      barberId,
      serviceId,
      demo: false,
      slots: getSlots(date, barberId, serviceId, bookings),
    });
  } catch (error) {
    if (error.statusCode === 503
      && (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN)) {
      sendJson(response, 200, {
        date,
        barberId,
        serviceId,
        demo: true,
        slots: getSlots(date, barberId, serviceId, []),
      });
      return;
    }

    sendJson(response, error.statusCode || 503, {
      error: error.statusCode ? error.message : 'Live availability is temporarily unavailable.',
    });
  }
}