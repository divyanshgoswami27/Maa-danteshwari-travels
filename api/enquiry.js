import nodemailer from 'nodemailer';
import crypto from 'node:crypto';

// ─── Constants ────────────────────────────────────────────────────────────────
const EMAIL = process.env.SMTP_TO || 'maadanteshwaritravel@gmail.com';

const SERVICE_VEHICLE_MAP = {
  'Car Rental':               ['Ertiga', 'Eco', 'Bolero', 'Scorpio', 'Innova', 'Toofan'],
  'Bus Service':              ['Bus'],
  'Transport':                ['Pickup', 'Tractor', 'Bolero', 'Toofan'],
  'Ambulance Service':        ['Ambulance'],
  'Equipment':                ['JCB', 'Tractor', 'Harvester'],
  'Tours':                    ['Ertiga', 'Eco', 'Bolero', 'Scorpio', 'Innova', 'Toofan', 'Bus'],
  'Business Travel':          ['Ertiga', 'Eco', 'Bolero', 'Scorpio', 'Innova'],
  'Wedding / Event Transport':['Ertiga', 'Eco', 'Bolero', 'Scorpio', 'Innova', 'Toofan', 'Bus']
};

// ─── Simple in-memory rate limiting ──────────────────────────────────────────
const rateLimitStore = new Map();
function checkRateLimit(ip) {
  const now = Date.now();
  const window = 15 * 60 * 1000; // 15 min
  const limit = 12;
  const key = ip || 'unknown';
  const entry = rateLimitStore.get(key) || { count: 0, resetAt: now + window };
  if (now > entry.resetAt) { entry.count = 0; entry.resetAt = now + window; }
  entry.count++;
  rateLimitStore.set(key, entry);
  // Prune old entries every 500 requests
  if (rateLimitStore.size > 500) {
    for (const [k, v] of rateLimitStore) { if (now > v.resetAt) rateLimitStore.delete(k); }
  }
  return entry.count > limit;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function clean(value, max = 500) {
  return String(value ?? '').replace(/[<>]/g, '').trim().slice(0, max);
}

function normalizePhone(raw) {
  const digits = String(raw || '').replace(/\D/g, '');
  let d = digits;
  if (d.length === 12 && d.startsWith('91')) d = d.slice(2);
  if (d.length === 11 && d.startsWith('0')) d = d.slice(1);
  if (d.length !== 10 || !/^[6-9]\d{9}$/.test(d)) return '';
  return `+91 ${d.slice(0, 5)} ${d.slice(5)}`;
}

function validDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const max = new Date(today);
  max.setMonth(max.getMonth() + 18);
  return date >= today && date <= max;
}

function makeReference() {
  const now = new Date();
  const ymd = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
  return `MDTT-${ymd}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
}

function escapeHtml(value) {
  return clean(value, 1000)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function buildEmailHtml(data) {
  const rows = [
    ['Reference', data.reference],
    ['Name', data.name],
    ['Phone', data.phone],
    ['Email', data.email || 'Not provided'],
    ['Pickup', data.pickup],
    ['Destination', data.destination],
    ['Travel date', data.date],
    ['Travel time', data.time || 'Not provided'],
    ['Trip type', data.tripType || 'Not provided'],
    data.returnDate ? ['Return Date', data.returnDate] : null,
    data.returnTime ? ['Return Time', data.returnTime] : null,
    data.days   ? ['Days Needed', data.days]   : null,
    data.hours  ? ['Hours Needed', data.hours]  : null,
    ['Service',    data.service],
    ['Vehicle',    data.vehicle    || 'Not specified'],
    ['Passengers', data.passengers || 'Not specified'],
    ['Submitted',  new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })],
    ['Additional requirement', data.message || 'None']
  ].filter(Boolean);

  const rowHtml = rows.map(([label, value]) => `
    <tr>
      <td style="padding:10px 12px;border-bottom:1px solid #e6e9e1;font-weight:700;color:#1d2f45;width:34%;vertical-align:top">${escapeHtml(label)}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #e6e9e1;color:#47586d;vertical-align:top">${escapeHtml(value)}</td>
    </tr>`).join('');

  return `<!doctype html><html><body style="margin:0;background:#f8f9f6;font-family:Arial,sans-serif;color:#14263a">
    <div style="max-width:720px;margin:24px auto;background:#fff;border:1px solid #e6e9e1;border-radius:16px;overflow:hidden">
      <div style="background:#063b70;color:#fff;padding:24px 26px">
        <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#f4c400;font-weight:700">Maa Danteshwari Tour &amp; Travels</div>
        <h1 style="font-size:24px;margin:8px 0 0">New Booking Enquiry</h1>
        <p style="margin:8px 0 0;color:#d9e7f5">Reference: <strong style="color:#fff">${escapeHtml(data.reference)}</strong></p>
      </div>
      <div style="padding:24px 26px">
        <table style="width:100%;border-collapse:collapse">${rowHtml}</table>
        <div style="margin-top:18px;padding:14px 16px;background:#eff5fb;border:1px solid #d9e7f5;border-radius:10px;font-size:13px;line-height:1.6;color:#2f4157">
          This is an enquiry, not a confirmed booking. Please check actual availability and contact the customer with a quotation.
        </div>
      </div>
    </div>
  </body></html>`;
}

function buildCustomerHtml(data) {
  return `<!doctype html><html><body style="margin:0;background:#f8f9f6;font-family:Arial,sans-serif;color:#14263a">
    <div style="max-width:640px;margin:24px auto;background:#fff;border:1px solid #e6e9e1;border-radius:16px;overflow:hidden">
      <div style="background:#063b70;color:#fff;padding:24px 26px">
        <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#f4c400;font-weight:700">Maa Danteshwari Tour &amp; Travels</div>
        <h1 style="font-size:24px;margin:8px 0 0">Enquiry received</h1>
      </div>
      <div style="padding:24px 26px;line-height:1.65;color:#47586d">
        <p>Dear ${escapeHtml(data.name)},</p>
        <p>We have received your travel enquiry.</p>
        <p style="padding:12px 14px;background:#eff5fb;border:1px solid #d9e7f5;border-radius:10px"><strong style="color:#1d2f45">Reference:</strong> ${escapeHtml(data.reference)}</p>
        <p>Our team will check actual availability and contact you with a quotation. This email does not confirm a booking.</p>
        <p style="margin-bottom:0">Maa Danteshwari Tour &amp; Travels<br>Tilda Newra, Chhattisgarh<br>+91 79702 28089</p>
      </div>
    </div>
  </body></html>`;
}

function getTransporter() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) return null;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    secure: String(process.env.SMTP_SECURE || 'true') === 'true',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD }
  });
}

// ─── Vercel Serverless Handler ─────────────────────────────────────────────────
export default async function handler(req, res) {
  // CORS
  const allowedOrigins = (process.env.CLIENT_ORIGINS || '')
    .split(',').map(s => s.trim()).filter(Boolean);

  const origin = req.headers.origin || '';
  const originOk = !origin
    || origin.startsWith('http://localhost')
    || origin.startsWith('http://127.0.0.1')
    || allowedOrigins.includes(origin)
    || origin.includes('vercel.app');

  if (originOk && origin) res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' });

  // Rate limiting
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket?.remoteAddress || '';
  if (checkRateLimit(ip)) {
    return res.status(429).json({ error: 'Too many enquiry attempts. Please try again later.' });
  }

  try {
    const body = req.body || {};

    // Honeypot
    if (clean(body.company_website, 100) !== '') {
      return res.status(400).json({ error: 'Unable to process this request.' });
    }

    const data = {
      reference:   makeReference(),
      pickup:      clean(body.pickup, 80),
      destination: clean(body.destination, 80),
      date:        clean(body.date, 10),
      time:        clean(body.time, 5),
      tripType:    clean(body.tripType, 30),
      service:     clean(body.service, 80),
      vehicle:     clean(body.vehicle, 80),
      passengers:  clean(body.passengers, 3),
      name:        clean(body.name, 80),
      phone:       normalizePhone(body.phone),
      email:       clean(body.email, 120).toLowerCase(),
      message:     clean(body.message, 800),
      returnDate:  clean(body.returnDate, 10),
      returnTime:  clean(body.returnTime, 5),
      days:        clean(body.days, 3),
      hours:       clean(body.hours, 3)
    };

    // Service/vehicle compatibility
    if (data.service && data.vehicle && data.vehicle !== 'Not sure — recommend a vehicle') {
      const allowed = SERVICE_VEHICLE_MAP[data.service] || [];
      if (!allowed.includes(data.vehicle)) {
        return res.status(422).json({ error: 'Please choose a vehicle suitable for the selected service.' });
      }
    }

    // Required field validation
    if (data.pickup.length < 2 || data.destination.length < 2)
      return res.status(422).json({ error: 'Please provide pickup and destination.' });
    if (!validDate(data.date))
      return res.status(422).json({ error: 'Please choose a valid travel date.' });
    if (!data.service)
      return res.status(422).json({ error: 'Please choose a service.' });
    if (data.name.length < 2)
      return res.status(422).json({ error: 'Please provide your name.' });
    if (!data.phone)
      return res.status(422).json({ error: 'Please provide a valid Indian mobile number.' });
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email))
      return res.status(422).json({ error: 'Please provide a valid email address.' });

    // SMTP
    const transporter = getTransporter();
    if (!transporter) {
      return res.status(503).json({ error: 'Email service is not configured yet. Please call or use WhatsApp.' });
    }

    // Send to business
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: EMAIL,
      replyTo: data.email || undefined,
      subject: `New Booking Enquiry — ${data.reference}`,
      html: buildEmailHtml(data),
      text: `New booking enquiry ${data.reference}\nName: ${data.name}\nPhone: ${data.phone}\nPickup: ${data.pickup}\nDestination: ${data.destination}\nDate: ${data.date}\nService: ${data.service}`
    });

    // Send confirmation to customer
    if (data.email) {
      await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: data.email,
        subject: `Maa Danteshwari Tour & Travels — Enquiry ${data.reference}`,
        html: buildCustomerHtml(data),
        text: `Your enquiry ${data.reference} has been received. Our team will check availability and contact you with a quotation.`
      });
    }

    return res.status(200).json({ ok: true, reference: data.reference, message: 'Enquiry received successfully.' });

  } catch (error) {
    console.error('Enquiry error:', error?.message || error);
    return res.status(500).json({ error: 'We could not send the enquiry right now. Please call or use WhatsApp instead.' });
  }
}
