import { createBooking, sendJson } from '../server.js';

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    sendJson(response, 405, { error: 'Method not allowed.' });
    return;
  }

  try {
    const input = typeof request.body === 'string' ? JSON.parse(request.body) : request.body;
    const booking = await createBooking(input || {});
    sendJson(response, 201, { booking });
  } catch (error) {
    sendJson(response, error.statusCode || 500, {
      error: error.statusCode ? error.message : 'Unable to save this appointment. Please try again.',
    });
  }
}