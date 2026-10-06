# Maa Danteshwari Tour & Travels — React + SMTP

A React/Vite frontend plus a small Express API for secure booking-enquiry email delivery through SMTP and WhatsApp prefilled enquiries.

## What is included

- Responsive React travel site with componentized sections
- English/Hindi language switch
- Dynamic services, fleet filters, routes, districts, destinations and FAQ search
- Multi-step booking enquiry flow with validation and local draft saving
- Dynamic enquiry reference (`MDTT-YYYYMMDD-XXXXXX`)
- Secure server-side `/api/enquiry` endpoint
- SMTP email to `maadanteshwaritravel@gmail.com`
- Optional customer acknowledgement email
- WhatsApp message generated from the same enquiry data
- Call/WhatsApp/mobile sticky actions
- Scroll reveal and modal animations with reduced-motion support
- SEO meta/canonical/Open Graph basics

## Setup

1. Install Node.js 20+.
2. Run `npm install`.
3. Copy `server/.env.example` to `server/.env`.
4. Fill in the SMTP values. For Gmail, use an App Password rather than your normal account password.
5. Start the API in one terminal: `npm run server`.
6. Start Vite in another terminal: `npm run dev`.
7. Open `http://localhost:5173`.

## SMTP variables

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=maadanteshwaritravel@gmail.com
SMTP_PASSWORD=YOUR_SMTP_APP_PASSWORD
SMTP_FROM=maadanteshwaritravel@gmail.com
SMTP_TO=maadanteshwaritravel@gmail.com
CLIENT_ORIGINS=http://localhost:5173
PORT=5173
```

Never put SMTP credentials in React code or `VITE_*` variables.

## Production

Build the frontend with `npm run build` and deploy the API separately (or convert the API route to your hosting provider's serverless function). Set the production frontend origin in `CLIENT_ORIGINS`.

If the SMTP provider is down, the frontend still provides a WhatsApp/call fallback after an API error.
