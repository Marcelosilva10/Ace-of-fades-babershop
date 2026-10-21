import { randomUUID } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = fileURLToPath(new URL('.', import.meta.url));
const dataDir = join(rootDir, '.data');
const bookingsPath = join(dataDir, 'bookings.json');
const distDir = join(rootDir, 'dist');
const port = Number(process.env.PORT || process.env.API_PORT || 3001);
const openTime = process.env.SHOP_OPEN_TIME || '09:00';
const closeTime = process.env.SHOP_CLOSE_TIME || '18:00';
const slotInterval = 15;

const services = [
  { id: 'adult-haircut', name: 'Adult Haircut · 17+', description: 'Experienced barbers cut and style your hair the way you want.', price: 50, duration: 45 },
  { id: 'haircut-beard', name: 'Adult Haircut with Beard', description: 'A tailored haircut and beard cleanup in one appointment.', price: 60, duration: 50 },
  { id: 'youth-haircut', name: 'Young Adult / Kids Haircut', description: 'Haircut for guests under 17. Prices may vary by barber.', price: 45, duration: 45 },
  { id: 'haircut-beard-eyebrows', name: 'Full Service · Haircut, Beard & Eyebrows', description: 'A complete grooming appointment for hair, beard, and eyebrows. Prices may vary by barber.', price: 65, duration: 60 },
  { id: 'full-grooming', name: 'The Members Special', description: 'A premium grooming upgrade. Contact the shop to confirm membership and included services.', price: 90, duration: 75 },
  { id: 'haircut-eyebrows', name: 'Adult Haircut with Eyebrows', description: 'An adult haircut finished with eyebrow grooming.', price: 55, duration: 45 },
  { id: 'early-after-hours', name: 'Early Bird / After Hours Haircut', description: 'For appointments before 10 AM or after 4 PM. Call the shop if no suitable time appears.', price: 70, duration: 45, timeWindows: [[9 * 60, 10 * 60], [16 * 60, 24 * 60]] },
  { id: 'sunday-haircut', name: 'Sunday Haircut', description: 'Sunday appointments are by appointment only. Availability is limited.', price: 60, duration: 45, sundayOnly: true },
  { id: 'house-business-call', name: 'House / Business Call', description: 'An off-site haircut appointment. Contact the shop to confirm the location before booking.', price: 150, duration: 120 },
];

const barbers = [
  { id: 'alan-adame', name: 'Alan Adame' },
  { id: 'angel-flores', name: 'Angel Flores' },
  { id: 'derek-beltran', name: 'Derek Beltran' },
];

function sendJson(response, status, body) {
  response.writeHead(status, { 'content-type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(body));
}

function readBookings() {
  if (!existsSync(bookingsPath)) return [];
  return JSON.parse(readFileSync(bookingsPath, 'utf8'));
}

function saveBookings(bookings) {
  mkdirSync(dataDir, { recursive: true });
  const temporaryPath = `${bookingsPath}.tmp`;
  writeFileSync(temporaryPath, JSON.stringify(bookings, null, 2));
  renameSync(temporaryPath, bookingsPath);
}

function timeToMinutes(time) {
  const match = /^(\d{2}):(\d{2})$/.exec(time);
  if (!match) return null;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours > 23 || minutes > 59) return null;
  return hours * 60 + minutes;
}

function getShopNow() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return {
    date: `${values.year}-${values.month}-${values.day}`,
    minutes: Number(values.hour) * 60 + Number(values.minute),
  };
}

function isOpenDate(date) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const parsedDate = new Date(`${date}T12:00:00.000Z`);
  return Number.isFinite(parsedDate.getTime())
    && parsedDate.toISOString().slice(0, 10) === date
    && parsedDate.getUTCDay() !== 1;
}

function getSlots(date, barberId, serviceId, bookings) {
  const service = services.find((item) => item.id === serviceId);
  const opensAt = timeToMinutes(openTime);
  const closesAt = timeToMinutes(closeTime);
  const weekday = new Date(`${date}T12:00:00.000Z`).getUTCDay();
  const sundayOnly = service?.sundayOnly === true;
  const normalOpenDay = [2, 3, 4, 5, 6].includes(weekday);
  const validServiceDay = sundayOnly ? weekday === 0 : normalOpenDay;
  if (!isOpenDate(date) || !barbers.some((item) => item.id === barberId) || !service
    || !validServiceDay || opensAt === null || closesAt === null || closesAt <= opensAt) return [];

  const shopNow = getShopNow();
  if (date < shopNow.date) return [];
  const earliestStart = date === shopNow.date ? shopNow.minutes + slotInterval : opensAt;

  const barberBookings = bookings.filter((booking) => (
    booking.date === date && booking.barberId === barberId && booking.status !== 'cancelled'
  ));
  const slots = [];
  for (let start = opensAt; start + service.duration <= closesAt; start += slotInterval) {
    if (start < earliestStart) continue;
    if (service.timeWindows && !service.timeWindows.some(([windowStart, windowEnd]) => (
      start >= windowStart && start + service.duration <= windowEnd
    ))) continue;
    const end = start + service.duration;
    const available = !barberBookings.some((booking) => (
      start < timeToMinutes(booking.endTime) && end > timeToMinutes(booking.time)
    ));
    const hours = String(Math.floor(start / 60)).padStart(2, '0');
    const minutes = String(start % 60).padStart(2, '0');
    slots.push({ time: `${hours}:${minutes}`, available });
  }
  return slots;
}

async function readRequestJson(request) {
  let body = '';
  for await (const chunk of request) {
    body += chunk;
    if (body.length > 16_384) throw new Error('Request body too large');
  }
  return JSON.parse(body || '{}');
}

function serveStatic(request, response, pathname) {
  if (!existsSync(join(distDir, 'index.html'))) {
    response.writeHead(503, { 'content-type': 'text/plain; charset=utf-8' });
    response.end('Build the app with npm run build before starting production mode.');
    return;
  }

  let requestedPath;
  try {
    requestedPath = decodeURIComponent(pathname);
  } catch {
    response.writeHead(400).end();
    return;
  }

  const filePath = resolve(distDir, `.${requestedPath === '/' ? '/index.html' : requestedPath}`);
  if (!filePath.startsWith(`${resolve(distDir)}${sep}`) && filePath !== join(distDir, 'index.html')) {
    response.writeHead(403).end();
    return;
  }
  const targetPath = existsSync(filePath) ? filePath : join(distDir, 'index.html');
  const mimeTypes = {
    '.css': 'text/css; charset=utf-8',
    '.html': 'text/html; charset=utf-8',
    '.ico': 'image/x-icon',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
  };
  response.writeHead(200, { 'content-type': mimeTypes[extname(targetPath)] || 'application/octet-stream' });
  response.end(request.method === 'HEAD' ? undefined : readFileSync(targetPath));
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host || 'localhost'}`);
  if (url.pathname === '/api/catalog' && request.method === 'GET') {
    sendJson(response, 200, {
      services,
      barbers,
      schedule: { days: 'Tuesday–Saturday', opensAt: openTime, closesAt: closeTime },
    });
    return;
  }

  if (url.pathname === '/api/availability' && request.method === 'GET') {
    const { date, barberId, serviceId } = Object.fromEntries(url.searchParams);
    sendJson(response, 200, {
      date,
      barberId,
      serviceId,
      slots: getSlots(date, barberId, serviceId, readBookings()),
    });
    return;
  }

  if (url.pathname === '/api/bookings' && request.method === 'POST') {
    try {
      const input = await readRequestJson(request);
      const name = typeof input.name === 'string' ? input.name.trim() : '';
      const email = typeof input.email === 'string' ? input.email.trim() : '';
      const phone = typeof input.phone === 'string' ? input.phone.trim() : '';
      const service = services.find((item) => item.id === input.serviceId);
      const barber = barbers.find((item) => item.id === input.barberId);
      if (!name || name.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        || email.length > 254 || phone.length > 40 || !service || !barber
        || !isOpenDate(input.date) || input.date < new Date().toISOString().slice(0, 10)) {
        sendJson(response, 400, { error: 'Check your contact details and appointment choices.' });
        return;
      }

      const bookings = readBookings();
      const slot = getSlots(input.date, barber.id, service.id, bookings)
        .find((candidate) => candidate.time === input.time && candidate.available);
      if (!slot) {
        sendJson(response, 409, { error: 'That time was just booked. Choose another available time.' });
        return;
      }

      const startMinutes = timeToMinutes(slot.time);
      const endMinutes = startMinutes + service.duration;
      const endTime = `${String(Math.floor(endMinutes / 60)).padStart(2, '0')}:${String(endMinutes % 60).padStart(2, '0')}`;
      const booking = {
        id: randomUUID(),
        name,
        email,
        phone,
        serviceId: service.id,
        serviceName: service.name,
        price: service.price,
        duration: service.duration,
        barberId: barber.id,
        barberName: barber.name,
        date: input.date,
        time: slot.time,
        endTime,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      };
      saveBookings([...bookings, booking]);
      sendJson(response, 201, { booking });
    } catch {
      sendJson(response, 400, { error: 'Unable to save this appointment. Please try again.' });
    }
    return;
  }

  if (url.pathname.startsWith('/api/')) {
    sendJson(response, 404, { error: 'API route not found.' });
    return;
  }

  if (request.method === 'GET' || request.method === 'HEAD') {
    serveStatic(request, response, url.pathname);
    return;
  }
  response.writeHead(405).end();
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Booking API listening on http://localhost:${port}`);
});