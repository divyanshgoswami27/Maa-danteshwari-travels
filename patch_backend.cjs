const fs = require('fs');
const path = 'c:/Users/divya/OneDrive/Desktop/mdtt-react-app/server/index.js';
let code = fs.readFileSync(path, 'utf8');

// Update backend mapping and validation
code = code.replace(
/const data = \{\s*reference[\s\S]*?message: clean\(body\.message, 800\)\s*\};/m,
`const data = {
      reference: makeReference(),
      pickup: clean(body.pickup, 80),
      destination: clean(body.destination, 80),
      date: clean(body.date, 10),
      time: clean(body.time, 5),
      tripType: clean(body.tripType, 30),
      service: clean(body.service, 80),
      vehicle: clean(body.vehicle, 80),
      passengers: clean(body.passengers, 3),
      name: clean(body.name, 80),
      phone: normalizePhone(body.phone),
      email: clean(body.email, 120).toLowerCase(),
      message: clean(body.message, 800),
      returnDate: clean(body.returnDate, 10),
      returnTime: clean(body.returnTime, 5),
      days: clean(body.days, 3),
      hours: clean(body.hours, 3)
    };
    
    const SERVICE_VEHICLE_MAP = {
      "Car Rental": ["Ertiga", "Eco", "Bolero", "Scorpio", "Innova", "Toofan"],
      "Bus Service": ["Bus"],
      "Transport": ["Pickup", "Tractor", "Bolero", "Toofan"],
      "Ambulance Service": ["Ambulance"],
      "Equipment": ["JCB", "Tractor", "Harvester"],
      "Tours": ["Ertiga", "Eco", "Bolero", "Scorpio", "Innova", "Toofan", "Bus"],
      "Business Travel": ["Ertiga", "Eco", "Bolero", "Scorpio", "Innova"],
      "Wedding / Event Transport": ["Ertiga", "Eco", "Bolero", "Scorpio", "Innova", "Toofan", "Bus"]
    };
    
    if (data.service && data.vehicle && data.vehicle !== "Not sure — recommend a vehicle") {
       const allowed = SERVICE_VEHICLE_MAP[data.service] || [];
       if (!allowed.includes(data.vehicle)) {
          return res.status(422).json({ error: 'Please choose a vehicle suitable for the selected service.' });
       }
    }`
);

// Update HTML email builder
code = code.replace(
/function buildEmailHtml\(data\) \{\s*const rows = \[[\s\S]*?\];/m,
`function buildEmailHtml(data) {
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
    data.days ? ['Days Needed', data.days] : null,
    data.hours ? ['Hours Needed', data.hours] : null,
    ['Service', data.service],
    ['Vehicle', data.vehicle || 'Not specified'],
    ['Passengers', data.passengers || 'Not specified'],
    ['Additional requirement', data.message || 'None']
  ].filter(Boolean);`
);

fs.writeFileSync(path, code);
console.log('Updated server/index.js');
