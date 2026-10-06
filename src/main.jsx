import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BrowserRouter, Routes as RouterRoutes, Route, Link, useParams, useLocation } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { createRoot } from 'react-dom/client';
import DATA from './data.json';
import './styles.css';

const BUSINESS = {
  name: 'Maa Danteshwari Tour & Travels',
  email: 'maadanteshwaritravel@gmail.com',
  primaryPhone: '+91 79702 28089',
  primaryWa: '917970228089',
  secondaryPhone: '+91 79876 46354',
  secondaryWa: '917987646354',
  address: 'Vrindavan Colony Ke Pass, Tilda Newra, Chhattisgarh 493114',
  website: 'https://maadanteshwaritours.com/'
};

const TXT = {
  en: {
    established: 'Established 2009',
    nav: ['Services', 'Fleet', 'Routes', 'Chhattisgarh', 'Destinations', 'Tours', 'FAQ', 'Contact'],
    heroTitle: 'Maa Danteshwari Tour & Travels',
    heroSub: 'Serving all of Chhattisgarh since 2009',
    promise: 'Your Journey. Our Responsibility.',
    safe: 'Safe Journey. Our Priority.',
    hindiTag: 'हर सफर में आपका साथ...',
    book: 'Book Your Journey',
    whatsapp: 'WhatsApp Us',
    call: 'Call Now',
    quick: 'Quick enquiry',
    quickCopy: "Tell us your route anywhere in Chhattisgarh. We'll check availability.",
    continue: 'Continue to enquiry',
    trust1: 'Established 2009', trust1b: 'Over a decade serving Chhattisgarh.',
    trust2: 'Human contact', trust2b: 'Talk directly to a real person.',
    trust3: 'Statewide enquiries', trust3b: 'Routes across Chhattisgarh.',
    trust4: 'Enquiry first', trust4b: 'Availability is confirmed before booking.',
    servicesEyebrow: 'Our services', servicesTitle: 'Transport & travel services across Chhattisgarh',
    servicesLead: 'Eight service categories, one point of contact. Open any card for full details.',
    enquiryNote: 'Enquiries are not confirmed bookings. Our team checks actual vehicle availability and shares a quotation.',
    fleetEyebrow: 'Our fleet', fleetTitle: 'Vehicles & equipment for Chhattisgarh journeys',
    fleetLead: 'Filter by category and add a vehicle preference to your enquiry.',
    fleetNote: 'Vehicle names are service preferences only. Counts, capacities and live availability are confirmed by the team.',
    routesEyebrow: 'Popular routes', routesTitle: 'Travel routes across Chhattisgarh',
    routesLead: 'Common journeys customers ask about. You can still enter any pickup and destination.',
    stateEyebrow: 'Statewide coverage', stateTitle: 'Serving every district of Chhattisgarh',
    stateLead: 'Our base is Tilda Newra. We accept enquiries across the state, subject to route and vehicle availability.',
    stateLegend: 'Base location: Tilda Newra. We do not have physical offices in these districts.',
    destEyebrow: 'Chhattisgarh tourism', destTitle: 'Popular Chhattisgarh destinations',
    destLead: 'Travellers commonly enquire for these places. Tell us your route and dates and we will check what we can arrange.',
    toursEyebrow: 'Journeys we plan', toursTitle: 'Tours, business & event travel in Chhattisgarh',
    toursLead: 'We do not sell fixed tour packages. We arrange vehicles for the journey you describe.',
    aboutEyebrow: 'About us', aboutTitle: 'Why choose Maa Danteshwari Tour & Travels',
    aboutP1: 'Maa Danteshwari Tour & Travels has been serving travellers from Tilda Newra, Chhattisgarh since 2009. We handle car rental, bus service, transport, tours, ambulance service, equipment and event travel across the state.',
    aboutP2: 'Every enquiry is handled by a real person. We check what is actually available for your dates, then share a quotation. There is no automated booking engine — just a straightforward conversation about your journey.',
    contactTeam: 'Contact our team', readFaq: 'Read FAQs',
    processEyebrow: 'Process', processTitle: 'How to book a vehicle in Chhattisgarh with us',
    faqEyebrow: 'Questions', faqTitle: 'Frequently asked questions',
    contactEyebrow: 'Contact', contactTitle: 'Contact us — Chhattisgarh transport enquiry',
    contactLead: 'Call, WhatsApp or email us directly. Every enquiry reaches a real person.',
    ctaTitle: 'Tell us your journey.', ctaLead: "Share your pickup, destination and travel requirements anywhere in Chhattisgarh. We'll check availability and get back to you.",
    sendEmail: 'Send by Email', share: 'Share', close: 'Close'
  },
  hi: {
    established: 'स्थापना 2009',
    nav: ['सेवाएं', 'वाहन', 'रूट', 'छत्तीसगढ़', 'पर्यटन स्थल', 'टूर', 'सवाल-जवाब', 'संपर्क'],
    heroTitle: 'मां दंतेश्वरी टूर एंड ट्रेवल्स', heroSub: '2009 से पूरे छत्तीसगढ़ में सेवा',
    promise: 'आपकी यात्रा. हमारी ज़िम्मेदारी.', safe: 'सुरक्षित यात्रा. हमारी प्राथमिकता.', hindiTag: 'हर सफर में आपका साथ...',
    book: 'अपनी यात्रा बुक करें', whatsapp: 'व्हाट्सएप करें', call: 'कॉल करें',
    quick: 'तुरंत पूछताछ', quickCopy: 'छत्तीसगढ़ में अपना रूट बताएं। हम उपलब्धता जांचेंगे।', continue: 'एन्क्वायरी जारी रखें',
    trust1: 'स्थापना 2009', trust1b: 'एक दशक से अधिक छत्तीसगढ़ की सेवा में.', trust2: 'सीधा संपर्क', trust2b: 'सीधे एक वास्तविक व्यक्ति से बात करें.', trust3: 'राज्यव्यापी एन्क्वायरी', trust3b: 'पूरे छत्तीसगढ़ में रूट.', trust4: 'पहले एन्क्वायरी', trust4b: 'बुकिंग से पहले उपलब्धता की पुष्टि.',
    servicesEyebrow: 'हमारी सेवाएं', servicesTitle: 'छत्तीसगढ़ भर में ट्रांसपोर्ट और यात्रा सेवाएं', servicesLead: 'आठ सेवा श्रेणियां, एक संपर्क बिंदु। पूरी जानकारी के लिए कार्ड खोलें.', enquiryNote: 'एन्क्वायरी पक्की बुकिंग नहीं होती। हमारी टीम वास्तविक वाहन उपलब्धता जांचकर कोटेशन देती है.',
    fleetEyebrow: 'हमारे वाहन', fleetTitle: 'छत्तीसगढ़ यात्रा के लिए वाहन और उपकरण', fleetLead: 'श्रेणी के अनुसार फ़िल्टर करें और अपनी वाहन पसंद एन्क्वायरी में जोड़ें.', fleetNote: 'वाहन नाम केवल सेवा पसंद हैं। संख्या, क्षमता और लाइव उपलब्धता टीम से पुष्टि की जाती है.',
    routesEyebrow: 'लोकप्रिय रूट', routesTitle: 'छत्तीसगढ़ भर में यात्रा मार्ग', routesLead: 'सामान्य यात्राएं जिनके बारे में ग्राहक पूछते हैं। फिर भी आप कोई भी पिकअप और मंज़िल भर सकते हैं.',
    stateEyebrow: 'राज्यव्यापी कवरेज', stateTitle: 'छत्तीसगढ़ के हर जिले में सेवा', stateLead: 'हमारा केंद्र टिल्डा नेवरा है। रूट और वाहन उपलब्धता के अनुसार पूरे राज्य से एन्क्वायरी स्वीकार करते हैं.', stateLegend: 'आधार स्थान: टिल्डा नेवरा। इन जिलों में हमारे भौतिक कार्यालय नहीं हैं.',
    destEyebrow: 'छत्तीसगढ़ पर्यटन', destTitle: 'छत्तीसगढ़ के लोकप्रिय पर्यटन स्थल', destLead: 'यात्री इन जगहों के लिए आमतौर पर पूछताछ करते हैं। अपनी यात्रा बताएं, हम व्यवस्था जांचेंगे.',
    toursEyebrow: 'हम कैसी यात्राएं करते हैं', toursTitle: 'छत्तीसगढ़ में टूर, बिज़नेस और इवेंट यात्रा', toursLead: 'हम तय टूर पैकेज नहीं बेचते। आप जो यात्रा बताते हैं, उसके लिए वाहन व्यवस्था करते हैं.',
    aboutEyebrow: 'हमारे बारे में', aboutTitle: 'मां दंतेश्वरी टूर एंड ट्रेवल्स क्यों चुनें', aboutP1: 'मां दंतेश्वरी टूर एंड ट्रेवल्स 2009 से टिल्डा नेवरा, छत्तीसगढ़ से यात्रियों की सेवा कर रही है। हम राज्य भर में कार रेंटल, बस सेवा, ट्रांसपोर्ट, टूर, एम्बुलेंस सेवा, उपकरण और इवेंट यात्रा संभालते हैं.', aboutP2: 'हर एन्क्वायरी एक वास्तविक व्यक्ति संभालता है। हम आपकी तारीखों के लिए वास्तविक उपलब्धता जांचते हैं, फिर कोटेशन देते हैं। कोई स्वचालित बुकिंग इंजन नहीं है.', contactTeam: 'हमारी टीम से संपर्क करें', readFaq: 'सवाल-जवाब पढ़ें',
    processEyebrow: 'प्रक्रिया', processTitle: 'हमारे साथ छत्तीसगढ़ में वाहन कैसे बुक करें', faqEyebrow: 'सवाल', faqTitle: 'अक्सर पूछे जाने वाले सवाल', contactEyebrow: 'संपर्क', contactTitle: 'संपर्क करें — छत्तीसगढ़ ट्रांसपोर्ट एन्क्वायरी', contactLead: 'सीधे कॉल, व्हाट्सएप या ईमेल करें। हर एन्क्वायरी एक वास्तविक व्यक्ति तक पहुंचती है.', ctaTitle: 'अपनी यात्रा बताएं।', ctaLead: 'छत्तीसगढ़ में कहीं भी अपना पिकअप, मंज़िल और यात्रा की ज़रूरतें बताएं। हम उपलब्धता जांचकर संपर्क करेंगे.', sendEmail: 'ईमेल से भेजें', share: 'साझा करें', close: 'बंद करें'
  }
};

const HOW = [
  ['Send your enquiry', 'अपनी एन्क्वायरी भेजें', 'Fill the form with pickup, destination, date and requirements.', 'पिकअप, मंज़िल, तारीख और ज़रूरतों के साथ फॉर्म भरें।'],
  ['We check availability', 'हम उपलब्धता जांचते हैं', 'Our team verifies what is actually available for your dates.', 'हमारी टीम आपकी तारीखों की वास्तविक उपलब्धता जांचती है।'],
  ['You receive a quotation', 'आपको कोटेशन मिलता है', 'Fare depends on route, vehicle, duration and requirements.', 'किराया रूट, वाहन, अवधि और ज़रूरतों पर निर्भर करता है।'],
  ['Finalise together', 'मिलकर तय करें', 'You and our team confirm the journey details directly.', 'आप और हमारी टीम सीधे यात्रा विवरण की पुष्टि करते हैं।']
];

const TOURS = [
  ['Family & group trips', 'परिवार और ग्रुप यात्रा', 'Local travel, outstation journeys and multi-day trips across Chhattisgarh.'],
  ['Business travel', 'बिज़नेस यात्रा', 'Travel arrangements for work trips, meetings and visits across Chhattisgarh.'],
  ['Wedding & event travel', 'शादी और इवेंट यात्रा', 'Vehicle arrangements for weddings, functions and events. Share dates and guest movement needs.']
];

const iconFallback = {
  car: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 17h14M6 17v2M18 17v2M4 13l1.6-5A2 2 0 0 1 7.5 6.5h9A2 2 0 0 1 18.4 8L20 13v4H4v-4Z"/><circle cx="7.5" cy="13.5" r="1"/><circle cx="16.5" cy="13.5" r="1"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/></svg>',
  wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.2-.7.2s-.8 1-1 1.2c-.2.2-.4.2-.7.1a8.2 8.2 0 0 1-2.4-1.5 9 9 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.3.3-.5a.6.6 0 0 0 0-.6l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 5 4.3.7.3 1.2.5 1.7.6a4 4 0 0 0 1.8.1c.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4 0-.1-.2-.2-.5-.3ZM12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Z"/></svg>'
};

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = root.querySelectorAll('[data-reveal]');
    if (!items.length) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      items.forEach((el) => el.classList.add('is-in'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -35px' });
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return ref;
}

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function validDate(v) {
  if (!v) return false;
  const d = new Date(`${v}T00:00:00`);
  const now = new Date(); now.setHours(0, 0, 0, 0);
  const max = new Date(now); max.setMonth(max.getMonth() + 18);
  return !Number.isNaN(d.getTime()) && d >= now && d <= max;
}

function validPhone(v) {
  let digits = String(v || '').replace(/\D/g, '');
  if (digits.startsWith('91') && digits.length === 12) digits = digits.slice(2);
  if (digits.startsWith('0') && digits.length === 11) digits = digits.slice(1);
  return /^[6-9]\d{9}$/.test(digits);
}

function formatPhone(v) {
  let digits = String(v || '').replace(/\D/g, '');
  if (digits.startsWith('91') && digits.length === 12) digits = digits.slice(2);
  if (digits.startsWith('0') && digits.length === 11) digits = digits.slice(1);
  digits = digits.slice(0, 10);
  return digits.length > 5 ? `${digits.slice(0, 5)} ${digits.slice(5)}` : digits;
}

function makeReference() {
  const d = new Date();
  const date = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  const rand = cryptoSafeRandom(6);
  return `MDTT-${date}-${rand}`;
}
function cryptoSafeRandom(n) {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let out = '';
  if (window.crypto?.getRandomValues) {
    const buf = new Uint8Array(n); window.crypto.getRandomValues(buf);
    for (let i = 0; i < n; i += 1) out += alphabet[buf[i] % alphabet.length];
  } else {
    for (let i = 0; i < n; i += 1) out += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return out;
}

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
const NOT_SURE_VEHICLE = "Not sure — recommend a vehicle";

function buildWhatsAppMessage(data) {
  const lines = [
    `Hello ${BUSINESS.name},`, '',
    'I would like to enquire about a journey in Chhattisgarh.', '',
    `Reference: ${data.reference || 'Not generated yet'}`,
    `Name: ${data.name}`,
    `Mobile: ${data.phone}`,
    data.email ? `Email: ${data.email}` : null,
    `Pickup: ${data.pickup}`,
    `Destination: ${data.destination}`,
    `Travel Date: ${data.date}`,
    data.time ? `Travel Time: ${data.time}` : null,
    `Service: ${data.service}`,
    data.vehicle ? `Vehicle: ${data.vehicle}` : null,
    data.passengers ? `Passengers: ${data.passengers}` : null,
    data.tripType ? `Trip Type: ${data.tripType}` : null,
    data.returnDate ? `Return Date: ${data.returnDate}` : null,
    data.returnTime ? `Return Time: ${data.returnTime}` : null,
    data.days ? `Days Needed: ${data.days}` : null,
    data.hours ? `Hours Needed: ${data.hours}` : null,
    data.message ? `Additional Requirement: ${data.message}` : null,
    '', 'Please check availability and share the quotation.', '', 'Thank you.'
  ].filter(Boolean);
  return lines.join('\n');
}

function openWhatsApp(data) {
  const url = `https://wa.me/${BUSINESS.primaryWa}?text=${encodeURIComponent(buildWhatsAppMessage(data))}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

function Icon({ html }) {
  return <span className="iconSvg" aria-hidden="true" dangerouslySetInnerHTML={{ __html: html }} />;
}

function Header({ lang, setLang }) {
  const [open, setOpen] = useState(false);
  const t = TXT[lang];
  const links = ['services', 'fleet', 'routes', 'chhattisgarh', 'destinations', 'tours', 'faq', 'contact'];
  return <>
    <div className="utilityBar">
      <div className="shell utilityInner"><span>Established 2009 · Tilda Newra, Chhattisgarh</span><a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a></div>
    </div>
    <header className="header">
      <div className="shell headerInner">
        <a href="#top" className="logo" aria-label={`${BUSINESS.name} home`} onClick={() => setOpen(false)}>
          <img src="/images/logo.png" alt="Maa Danteshwari Tour & Travels" className="logoImg" onError={e=>{e.currentTarget.style.display='none';e.currentTarget.nextSibling.style.display='flex';}}/>
          <span className="logoFallback" style={{display:'none'}}><span className="logoMark">MD</span><span><strong>Maa Danteshwari</strong><small>Tour &amp; Travels</small></span></span>
        </a>
        <nav className="desktopNav" aria-label="Primary">
          {links.map((id, i) => <a key={id} href={`#${id}`}>{t.nav[i]}</a>)}
        </nav>
        <div className="headerActions">
          <div className="langSwitch" role="group" aria-label="Language"><button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button><button className={lang === 'hi' ? 'active' : ''} onClick={() => setLang('hi')}>हिन्दी</button></div>
          <a className="button primary small hideMobile" href="#book">{t.book}</a>
          <button className="menuButton" aria-expanded={open} onClick={() => setOpen(v => !v)} aria-label="Open menu">☰</button>
        </div>
      </div>
      {open && <div className="mobileNav shell">
        {links.map((id, i) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{t.nav[i]}</a>)}
        <div className="mobileNavActions"><a className="button call" href={`tel:${BUSINESS.primaryPhone.replace(/\s/g, '')}`}>{t.call}</a><a className="button whatsapp" href={`https://wa.me/${BUSINESS.primaryWa}`} target="_blank" rel="noreferrer">{t.whatsapp}</a></div>
      </div>}
    </header>
  </>;
}

function Hero({ lang, onQuick }) {
  const t = TXT[lang];
  const [quick, setQuick] = useState({ pickup: 'Tilda Newra', destination: 'Raipur', date: '' });
  return <section className="hero" id="top">
    <div className="heroDecor decorOne"/><div className="heroDecor decorTwo"/>
    <div className="shell heroGrid">
      <div className="heroCopy" data-reveal>
        <span className="eyebrow brandEyebrow">{t.established}</span>
        <h1>{t.heroTitle}<span>{t.heroSub}</span></h1>
        <p className="heroPromise">{t.promise}</p><p className="heroSafe">{t.safe}</p><p className="heroHindi">{t.hindiTag}</p>
        <div className="servicePills">{['Cars', 'Buses', 'Transport', 'Tours', 'Ambulance', 'Equipment'].map(x => <span key={x}>{x}</span>)}</div>
        <div className="heroActions"><a className="button gold" href="#book">{t.book}</a><a className="button whatsapp" href={`https://wa.me/${BUSINESS.primaryWa}?text=${encodeURIComponent('Hello Maa Danteshwari Tour & Travels, I would like to enquire about a journey in Chhattisgarh.')}`} target="_blank" rel="noreferrer"><Icon html={iconFallback.wa}/>{t.whatsapp}</a><a className="button ghost" href={`tel:${BUSINESS.primaryPhone.replace(/\s/g, '')}`}><Icon html={iconFallback.phone}/>{t.call}</a></div>
        <div className="heroStats"><div><strong>2009</strong><span>Established</span></div><div><strong>8</strong><span>Service categories</span></div><div><strong>28</strong><span>Districts covered by enquiry</span></div></div>
      </div>
      <div className="quickCard" data-reveal style={{ '--delay': '.1s' }}>
        <div className="quickBadge">FAST ENQUIRY</div><h2>{t.quick}</h2><p>{t.quickCopy}</p>
        <div className="field"><label>Pickup location</label><input value={quick.pickup} onChange={e => setQuick({...quick, pickup: e.target.value})} placeholder="Tilda Newra"/></div>
        <div className="field"><label>Destination</label><input value={quick.destination} onChange={e => setQuick({...quick, destination: e.target.value})} placeholder="Raipur"/></div>
        <div className="field"><label>Travel date</label><input type="date" min={todayISO()} value={quick.date} onChange={e => setQuick({...quick, date: e.target.value})}/></div>
        <button className="button navy full" onClick={() => onQuick(quick)}>{t.continue} →</button>
        <p className="quickNote">No payment here. Your enquiry is checked with the team first.</p>
      </div>
    </div>
  </section>;
}

function Trust() {
  const t = TXT.en;
  return <section className="trustSection"><div className="shell trustGrid">{[
    ['✓', t.trust1, t.trust1b], ['↗', t.trust2, t.trust2b], ['⌖', t.trust3, t.trust3b], ['✓', t.trust4, t.trust4b]
  ].map(([i,a,b]) => <div className="trustItem" key={a} data-reveal><span>{i}</span><div><strong>{a}</strong><small>{b}</small></div></div>)}</div></section>;
}

function SectionHead({ eyebrow, title, lead, lang }) { const t = TXT[lang]; return <div className="sectionHead" data-reveal><span className="eyebrow">{eyebrow}</span><h2>{title}</h2><div className="rule"/><p>{lead}</p></div>; }

function Services({ lang, openService }) {
  const t = TXT[lang];
  return <section className="section white" id="services"><div className="shell"><SectionHead lang={lang} eyebrow={t.servicesEyebrow} title={t.servicesTitle} lead={t.servicesLead}/><div className="grid grid4">{DATA.SERVICES.map((s, idx) => <button key={s.value} className={`card serviceCard ${s.alert ? 'alert' : ''}`} onClick={() => openService(s)} data-reveal style={{ '--delay': `${idx * 0.04}s` }}><span className="iconBadge" dangerouslySetInnerHTML={{__html:s.icon}}/><h3>{lang === 'hi' ? s.hi : s.en}</h3><p>{lang === 'hi' ? s.descHi : s.descEn}</p><span className="cardArrow">View details →</span></button>)}</div><div className="notice">ⓘ <span>{t.enquiryNote}</span></div></div></section>;
}

function Fleet({ lang, activeCat, setActiveCat, onVehicle }) {
  const t = TXT[lang];
  const filtered = activeCat === 'all' ? DATA.FLEET : DATA.FLEET.filter(v => v.cat === activeCat);
  return <section className="section cream" id="fleet"><div className="shell"><SectionHead lang={lang} eyebrow={t.fleetEyebrow} title={t.fleetTitle} lead={t.fleetLead}/><div className="filters">{DATA.FLEET_CATS.map(cat => <button key={cat.id} className={activeCat === cat.id ? 'filter active' : 'filter'} onClick={() => setActiveCat(cat.id)}>{lang === 'hi' ? cat.hi : cat.en}<span>{cat.id === 'all' ? DATA.FLEET.length : DATA.FLEET.filter(v => v.cat === cat.id).length}</span></button>)}</div><div className="grid grid4">{filtered.map((v,idx) => <button key={v.name} className={`card fleetCard ${v.alert ? 'alert' : ''}`} onClick={() => onVehicle(v)} data-reveal style={{ '--delay': `${idx * 0.03}s` }}><div className="vehicleVisual"><Icon html={v.alert ? iconFallback.phone : iconFallback.car}/></div><div className="fleetTop"><h3>{lang === 'hi' ? v.hi : v.name}</h3><span className="miniPill">{v.cat}</span></div><p>{lang === 'hi' ? v.noteHi : v.note}</p><span className="cardArrow">Enquire →</span></button>)}</div><p className="fleetNote">{t.fleetNote}</p></div></section>;
}

function Routes({ lang, onRoute }) { const t=TXT[lang]; return <section className="section white" id="routes"><div className="shell"><SectionHead lang={lang} eyebrow={t.routesEyebrow} title={t.routesTitle} lead={t.routesLead}/><div className="routesGrid">{DATA.ROUTES.map((r,i)=><button key={`${r.from}-${r.to}`} className="routeItem" data-reveal style={{'--delay':`${i*.03}s`}} onClick={()=>onRoute(r)}><span className="routeIcon">→</span><span><strong>{r.from} → {r.to}</strong><small>{lang==='hi'?r.descHi:r.descEn}</small></span><b>Enquire</b></button>)}</div></div></section>; }

function Districts({ lang }) { const t=TXT[lang]; return <section className="section cream" id="chhattisgarh"><div className="shell"><SectionHead lang={lang} eyebrow={t.stateEyebrow} title={t.stateTitle} lead={t.stateLead}/><div className="districtGrid">{DATA.CG_DISTRICTS.map((d,i)=><div className="district" key={d.en} data-reveal style={{'--delay':`${(i%8)*.025}s`}}><strong>{lang==='hi'?d.hi:d.en}</strong><span>{d.note}</span></div>)}</div><p className="legend">{t.stateLegend}</p></div></section>; }

function Destinations({ lang, onDestination }) { const t=TXT[lang]; return <section className="section white" id="destinations"><div className="shell"><SectionHead lang={lang} eyebrow={t.destEyebrow} title={t.destTitle} lead={t.destLead}/><div className="grid grid3">{DATA.DESTINATIONS.map((d,i)=><button key={d.name} className="card destinationCard" onClick={()=>onDestination(d)} data-reveal style={{'--delay':`${i*.04}s`}}><span className="destinationLoc">{lang==='hi'?d.locHi:d.loc}</span><h3>{lang==='hi'?d.nameHi:d.name}</h3><p>{lang==='hi'?d.descHi:d.descEn}</p><span className="cardArrow">Plan a journey →</span></button>)}</div></div></section>; }

function Tours({ lang }) { const t=TXT[lang]; return <section className="section cream" id="tours"><div className="shell"><SectionHead lang={lang} eyebrow={t.toursEyebrow} title={t.toursTitle} lead={t.toursLead}/><div className="grid grid3">{TOURS.map((x,i)=><article className="card" key={x[0]} data-reveal style={{'--delay':`${i*.05}s`}}><span className="iconBadge gold">✦</span><h3>{lang==='hi'?x[1]:x[0]}</h3><p>{x[2]}</p></article>)}</div></div></section>; }

function Ambulance() { return <section className="section tight" id="ambulance"><div className="shell"><div className="ambulance"><div><span className="eyebrow inverse">AMBULANCE</span><h2>Ambulance enquiries — please call directly</h2><p>For ambulance enquiries in Chhattisgarh, please call directly for immediate assistance. Please do not use the enquiry form for ambulance needs.</p></div><div className="ambulanceBtns"><a className="button whiteBtn" href={`tel:${BUSINESS.primaryPhone.replace(/\s/g,'')}`}>Call Kunal</a><a className="button whiteBtn" href={`tel:${BUSINESS.secondaryPhone.replace(/\s/g,'')}`}>Call Shivaji</a></div></div></div></section>; }

const GALLERY_IMGS = [
  { src: '/images/chitrakote_falls.jpg', alt: 'Chitrakote Falls, Bastar — the Niagara of India', cap: 'Chitrakote Falls' },
  { src: '/images/tirathgarh_falls.jpg', alt: 'Tirathgarh Falls, Kanger Valley, Bastar', cap: 'Tirathgarh Falls' },
  { src: '/images/kanger_valley.jpg', alt: 'Kanger Valley National Park, Bastar', cap: 'Kanger Valley' },
  { src: '/images/bastar_jagdalpur.jpg', alt: 'Bastar Jagdalpur landscape and tribal culture', cap: 'Bastar / Jagdalpur' },
  { src: '/images/mainpat.jpg', alt: 'Mainpat scenic mountain roads, Chhattisgarh', cap: 'Mainpat Hills' },
  { src: '/images/sirpur.jpg', alt: 'Sirpur ancient temple heritage site, Mahasamund', cap: 'Sirpur Heritage' },
];
function Gallery() {
  return <section className="section white" id="gallery"><div className="shell">
    <SectionHead lang="en" eyebrow="Destinations" title="Journey photos — Chhattisgarh" lead="Popular destinations our customers travel to. Enquire to plan your journey."/>
    <div className="galleryGrid">
      {GALLERY_IMGS.map((img, i) => (
        <div className="galleryItem" key={img.cap} data-reveal style={{'--delay':`${i*.06}s`}}>
          <img src={img.src} alt={img.alt} width="600" height="400" loading={i < 2 ? 'eager' : 'lazy'}
            style={{width:'100%',height:'220px',objectFit:'cover',borderRadius:'10px',display:'block'}}/>
          <p style={{margin:'8px 0 0',fontWeight:'600',fontSize:'.9rem',color:'#063b70'}}>{img.cap}</p>
        </div>
      ))}
    </div>
    <div style={{textAlign:'center',marginTop:'30px'}}>
      <a className="button navy" href="#book">Plan a Journey →</a>
    </div>
  </div></section>;
}

function About({ lang }) { const t=TXT[lang]; return <section className="section cream" id="about"><div className="shell aboutGrid"><div data-reveal><span className="eyebrow">{t.aboutEyebrow}</span><h2>{t.aboutTitle}</h2><div className="rule"/><p>{t.aboutP1}</p><p>{t.aboutP2}</p><div className="btnRow"><a className="button navy" href="#contact">{t.contactTeam}</a><a className="button outline" href="#faq">{t.readFaq}</a></div></div><div className="aboutCards">{[['Established 2009','Serving the Tilda Newra area and Chhattisgarh for over a decade.'],['Eight service categories','From cars and buses to transport, tours, ambulance and equipment.'],['Direct human contact','Call or WhatsApp Kunal or Shivaji directly.']].map((x,i)=><div className="card flat" key={x[0]} data-reveal style={{'--delay':`${i*.06}s`}}><h3>{x[0]}</h3><p>{x[1]}</p></div>)}</div></div></section>; }

function How({ lang }) { const t=TXT[lang]; return <section className="section white"><div className="shell"><SectionHead lang={lang} eyebrow={t.processEyebrow} title={t.processTitle}/><div className="stepsGrid">{HOW.map((x,i)=><div className="step" key={x[0]} data-reveal style={{'--delay':`${i*.05}s`}}><span>{i+1}</span><h3>{lang==='hi'?x[1]:x[0]}</h3><p>{lang==='hi'?x[3]:x[2]}</p></div>)}</div></div></section>; }

const initialForm = { pickup:'', destination:'', date:'', time:'', tripType:'One Way', service:'', vehicle:'', passengers:'', name:'', phone:'', email:'', message:'', returnDate:'', returnTime:'', days:'', hours:'' };

function Booking({ lang, prefill }) {
  const t=TXT[lang];
  const [step,setStep]=useState(1);
  const [form,setForm]=useState({...initialForm, ...prefill});
  const [errors,setErrors]=useState({});
  const [saving,setSaving]=useState(false);
  const [result,setResult]=useState(null);
  const update=(key,val) => {
    setForm(f=>{
      const nf = {...f,[key]:val};
      if (key === 'service') {
        const allowed = SERVICE_VEHICLE_MAP[val] || [];
        if (!allowed.includes(nf.vehicle) && nf.vehicle !== NOT_SURE_VEHICLE) {
          nf.vehicle = allowed.length === 1 ? allowed[0] : '';
        }
        if (val === 'Ambulance Service' || val === 'Equipment' || val === 'Transport') {
           nf.passengers = '';
        }
      }
      return nf;
    });
  };
  
  useEffect(()=>{
    try { const saved=JSON.parse(localStorage.getItem('mdtt-draft-v2')||'null'); if(saved) setForm(f=>({...f,...saved})); } catch {}
  },[]);
  useEffect(()=>{ try{localStorage.setItem('mdtt-draft-v2',JSON.stringify(form));}catch{} },[form]);
  useEffect(()=>{ if(prefill && Object.keys(prefill).length) setForm(f=>({...f,...prefill})); },[prefill]);
  
  const activeService=DATA.SERVICES.find(s=>s.value===form.service);
  const isAmbulance = form.service === 'Ambulance Service';
  const showPassengers = !['Ambulance Service', 'Equipment', 'Transport'].includes(form.service);
  const availableVehicles = form.service ? (SERVICE_VEHICLE_MAP[form.service] || []) : [];
  
  const validate=(s)=>{
    const e={};
    if(s===1){if(form.pickup.trim().length<2)e.pickup=lang==='hi'?'पिकअप स्थान दर्ज करें।':'Where should we pick you up?';if(form.destination.trim().length<2)e.destination=lang==='hi'?'मंज़िल दर्ज करें।':'Where do you want to go?';if(!validDate(form.date))e.date=lang==='hi'?'भविष्य की वैध तिथि चुनें।':'When are you travelling?';}
    if(s===2){
      if(!form.service)e.service=lang==='hi'?'एक सेवा चुनें।':'Please select a service.';
      if(showPassengers && form.passengers && (!/^\d+$/.test(form.passengers)||Number(form.passengers)<1||Number(form.passengers)>99))e.passengers=lang==='hi'?'1-99 यात्री दर्ज करें।':'How many people are travelling?';
      if(form.service && availableVehicles.length > 1 && form.vehicle && form.vehicle !== NOT_SURE_VEHICLE && !availableVehicles.includes(form.vehicle)) {
         e.vehicle='Please choose a vehicle suitable for the selected service.';
      }
    }
    if(s===3){if(form.name.trim().length<2)e.name=lang==='hi'?'अपना पूरा नाम दर्ज करें।':'Please provide your name.';if(!validPhone(form.phone))e.phone=lang==='hi'?'वैध 10 अंकों का मोबाइल नंबर दर्ज करें।':'Please enter a valid 10-digit mobile number.';if(form.email&&!/^\S+@\S+\.\S+$/.test(form.email))e.email=lang==='hi'?'वैध ईमेल पता दर्ज करें।':'Please provide a valid email address.';}
    setErrors(e); return Object.keys(e).length===0;
  };
  const next=()=>{ if(validate(step)) setStep(s=>Math.min(3,s+1)); };
  const submit=async()=>{
    if(!validate(3))return;
    setSaving(true); setResult(null);
    const payload={...form, reference:makeReference()};
    try{
      const res=await fetch('/api/enquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
      const body=await res.json().catch(()=>({}));
      if(!res.ok) throw new Error(body.error||"We couldn't send your enquiry right now. Please try WhatsApp or call us directly.");
      try{localStorage.removeItem('mdtt-draft-v2')}catch{}
      setResult({ok:true,reference:body.reference||payload.reference,data:{...payload,reference:body.reference||payload.reference}});
    }catch(err){ setResult({ok:false,message:err.message||"We couldn't send your enquiry right now. Please try WhatsApp or call us directly."}); }
    finally{setSaving(false);}
  };
  
  return <section className="section cream" id="book"><div className="shell"><SectionHead lang={lang} eyebrow={lang==='hi'?'बुकिंग एन्क्वायरी':'Booking enquiry'} title={lang==='hi'?'अपनी यात्रा बताएं':'Tell us your journey'} lead={lang==='hi'?'तय करें कहाँ जाना है। हम बाकी संभाल लेंगे।':'Tell us where you want to go, what you need, and we will help you.'}/><div className="bookingCard" data-reveal>
    <div className="bookingSteps">{['Journey','Travel Requirement','Contact'].map((x,i)=><button key={x} className={step===i+1?'active':''} onClick={()=>{if(i+1<step)setStep(i+1)}}><span>{i+1}</span>{lang==='hi'?(i===0?'यात्रा':i===1?'ज़रूरत':'संपर्क'):x}</button>)}</div>
    
    {step===1&&<div className="formPanel"><div className="formGrid2"><Field label={lang==='hi'?'आपको कहाँ से लेना है?':'Where should we pick you up?'} placeholder={lang==='hi'?'शहर या एरिया':'Enter your city, area or pickup point'} value={form.pickup} onChange={v=>update('pickup',v)} error={errors.pickup}/><Field label={lang==='hi'?'आपको कहाँ जाना है?':'Where do you want to go?'} placeholder={lang==='hi'?'मंज़िल':'Enter your destination'} value={form.destination} onChange={v=>update('destination',v)} error={errors.destination}/><Field label={lang==='hi'?'आप कब यात्रा कर रहे हैं?':'When are you travelling?'} type="date" min={todayISO()} value={form.date} onChange={v=>update('date',v)} error={errors.date}/><Field label={lang==='hi'?'यात्रा का समय':'Travel time'} type="time" value={form.time} onChange={v=>update('time',v)}/></div><SelectField label={lang==='hi'?'यात्रा का प्रकार':'Trip type'} value={form.tripType} onChange={v=>update('tripType',v)} options={['One Way','Round Trip','Local','Multi-Day','Other']}/>
    {form.tripType === 'Round Trip' && <div className="formGrid2"><Field label="Return Date" type="date" min={form.date||todayISO()} value={form.returnDate} onChange={v=>update('returnDate',v)}/><Field label="Return Time" type="time" value={form.returnTime} onChange={v=>update('returnTime',v)}/></div>}
    {form.tripType === 'Multi-Day' && <div className="formGrid2"><Field label="How many days do you need the vehicle?" type="number" min="1" value={form.days} onChange={v=>update('days',v)}/></div>}
    {form.tripType === 'Local' && <div className="formGrid2"><Field label="Approximate hours needed" type="number" min="1" value={form.hours} onChange={v=>update('hours',v)}/></div>}
    <div className="navRow"><span/><button className="button navy" onClick={next}>Next →</button></div></div>}
    
    {step===2&&<div className="formPanel">
      <div className="formGrid2">
        <SelectField label={lang==='hi'?'सेवा *':'Service *'} value={form.service} onChange={v=>update('service',v)} error={errors.service} options={DATA.SERVICES.map(s=>s.value)} />
        {!isAmbulance && availableVehicles.length > 1 && <SelectField label={lang==='hi'?'वाहन पसंद':'Which vehicle do you prefer?'} value={form.vehicle} onChange={v=>update('vehicle',v)} options={[...availableVehicles, NOT_SURE_VEHICLE]} error={errors.vehicle} />}
        {showPassengers && <Field label={lang==='hi'?'कितने लोग यात्रा करेंगे?':'How many people are travelling?'} type="number" min="1" max="99" value={form.passengers} onChange={v=>update('passengers',v)} error={errors.passengers}/>}
      </div>
      
      {isAmbulance && <div className="ambulancePanel" style={{background:'#ffeaea',padding:'20px',borderRadius:'10px',border:'1px solid #ffcccc',marginTop:'10px'}}>
        <h3 style={{color:'#d32f2f',margin:'0 0 10px 0'}}>AMBULANCE ASSISTANCE</h3>
        <p style={{margin:'0 0 15px 0'}}>For urgent assistance, please call directly.</p>
        <a className="button red" href={`tel:${BUSINESS.primaryPhone.replace(/\s/g,'')}`} style={{background:'#d32f2f',color:'#fff'}}>CALL NOW +91 79702 28089</a>
      </div>}
      
      {activeService && !isAmbulance && <div className="inlineInfo"><strong>{activeService.en}</strong><span>{lang==='hi'?activeService.descHi:activeService.descEn}</span></div>}
      
      {!isAmbulance && <div className="field"><label>{lang==='hi'?'कोई और जानकारी?':'Anything else we should know?'}</label><textarea maxLength={800} value={form.message} onChange={e=>update('message',e.target.value)} placeholder="Example: Extra luggage, child seat, special requirement, etc."/><div className="counter">{form.message.length} / 800</div></div>}
      
      <div className="navRow"><button className="button outline" onClick={()=>setStep(1)}>← Back</button><button className="button navy" onClick={next}>Next →</button></div>
    </div>}
    
    {step===3&&<div className="formPanel"><div className="formGrid2">
      <Field label={lang==='hi'?'आपका नाम *':'Your name *'} value={form.name} onChange={v=>update('name',v)} error={errors.name}/>
      <div className="field"><label>{lang==='hi'?'मोबाइल नंबर *':'Mobile number *'}</label><input type="tel" value={form.phone} onChange={e=>update('phone',formatPhone(e.target.value))} placeholder="+91 XXXXX XXXXX"/><small style={{color:'#666',marginTop:'4px',display:'block'}}>{lang==='hi'?'हम आपसे संपर्क करेंगे।':'We’ll call or WhatsApp you about your enquiry.'}</small>{errors.phone&&<small className="errorText">{errors.phone}</small>}</div>
      <Field label={lang==='hi'?'ईमेल (वैकल्पिक)':'Email (OPTIONAL)'} type="email" value={form.email} onChange={v=>update('email',v)} error={errors.email} placeholder="Optional — useful if you want the enquiry details by email."/>
    </div>
    <div className="review"><h4>Review your enquiry</h4><div className="reviewGrid">
      <div style={{gridColumn:'1/-1',background:'#f0f4f8',padding:'10px',borderRadius:'8px',marginBottom:'10px'}}>
        <h5 style={{margin:'0 0 10px 0',fontSize:'12px',textTransform:'uppercase',color:'#063b70'}}>YOUR JOURNEY <button onClick={()=>setStep(1)} style={{float:'right',background:'none',border:'none',color:'#0066cc',cursor:'pointer',fontSize:'12px'}}>Edit</button></h5>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px'}}>
          <div><small style={{color:'#666'}}>Pickup</small><br/><strong>{form.pickup||'—'}</strong></div>
          <div><small style={{color:'#666'}}>Destination</small><br/><strong>{form.destination||'—'}</strong></div>
          <div><small style={{color:'#666'}}>Date</small><br/><strong>{form.date||'—'}</strong></div>
          <div><small style={{color:'#666'}}>Time</small><br/><strong>{form.time||'—'}</strong></div>
        </div>
      </div>
      <div style={{gridColumn:'1/-1',background:'#f0f4f8',padding:'10px',borderRadius:'8px',marginBottom:'10px'}}>
        <h5 style={{margin:'0 0 10px 0',fontSize:'12px',textTransform:'uppercase',color:'#063b70'}}>TRAVEL DETAILS <button onClick={()=>setStep(2)} style={{float:'right',background:'none',border:'none',color:'#0066cc',cursor:'pointer',fontSize:'12px'}}>Edit</button></h5>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px'}}>
          <div><small style={{color:'#666'}}>Service</small><br/><strong>{form.service||'—'}</strong></div>
          <div><small style={{color:'#666'}}>Vehicle</small><br/><strong>{form.vehicle||'—'}</strong></div>
          {showPassengers && <div><small style={{color:'#666'}}>Passengers</small><br/><strong>{form.passengers||'—'}</strong></div>}
        </div>
      </div>
      <div style={{gridColumn:'1/-1',background:'#f0f4f8',padding:'10px',borderRadius:'8px'}}>
        <h5 style={{margin:'0 0 10px 0',fontSize:'12px',textTransform:'uppercase',color:'#063b70'}}>CONTACT <button onClick={()=>setStep(3)} style={{float:'right',background:'none',border:'none',color:'#0066cc',cursor:'pointer',fontSize:'12px'}}>Edit</button></h5>
        <div><strong>{form.name||'—'}</strong><br/>{form.phone||'—'}</div>
      </div>
    </div></div>
    <div className="navRow" style={{justifyContent:'space-between',flexWrap:'wrap',gap:'10px'}}><button className="button outline" onClick={()=>setStep(2)}>← Back</button>
      <div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
        <button className="button whatsapp" onClick={()=>openWhatsApp({...form,reference:makeReference()})}>WhatsApp Enquiry</button>
        <button className="button gold" disabled={saving} onClick={submit}>{saving?'Sending…':'Send Enquiry'}</button>
        <a className="button navy hideMobile" href={`tel:${BUSINESS.primaryPhone.replace(/\s/g,'')}`}>Call Now</a>
      </div>
    </div></div>}
    {result&&<div className={`result ${result.ok?'success':'error'}`} role="status">{result.ok?<><strong>{lang==='hi'?'एन्क्वायरी प्राप्त हुई':'Enquiry Received'}</strong><p>Your enquiry has been prepared successfully.<br/>Reference: {result.reference}<br/>Our team will check vehicle availability and contact you with a quotation.</p><div className="btnRow"><button className="button whatsapp" onClick={()=>openWhatsApp(result.data)}>WhatsApp Us</button><a className="button navy" href={`tel:${BUSINESS.primaryPhone.replace(/\s/g,'')}`}>Call Now</a><button className="button outline" onClick={()=>{setForm(initialForm);setStep(1);setResult(null);}}>Send Another Enquiry</button></div></>:<><strong>We couldn't send the enquiry right now.</strong><p>Your details are still here. Please try WhatsApp or call us directly.</p><div className="btnRow"><button className="button whatsapp" onClick={()=>openWhatsApp({...form,reference:makeReference()})}>Send via WhatsApp</button><a className="button navy" href={`tel:${BUSINESS.primaryPhone.replace(/\s/g,'')}`}>Call Now</a><button className="button outline" onClick={()=>setResult(null)}>Try Again</button></div></>}</div>}
    <p className="formFooterNote">Not sure what to select? Don't worry. Send us your requirement and our team will help you choose the right vehicle.</p>
  </div></div></section>;
}

function Field({label,type='text',value,onChange,error,placeholder,min,max}) { return <div className="field"><label>{label}</label><input type={type} min={min} max={max} value={value||''} onChange={e=>onChange(e.target.value)} placeholder={placeholder}/>{error&&<small className="errorText">{error}</small>}</div> }
function SelectField({label,value,onChange,options,error}) { return <div className="field"><label>{label}</label><select value={value||''} onChange={e=>onChange(e.target.value)}><option value="">Select…</option>{options.map(x=><option key={x} value={x}>{x}</option>)}</select>{error&&<small className="errorText">{error}</small>}</div> }

function FAQ({ lang }) { const t=TXT[lang]; const [search,setSearch]=useState(''); const [open,setOpen]=useState(0); const list=DATA.FAQS.filter(x=>`${x.qEn} ${x.qHi} ${x.aEn}`.toLowerCase().includes(search.toLowerCase())); return <section className="section white" id="faq"><div className="shell"><SectionHead lang={lang} eyebrow={t.faqEyebrow} title={t.faqTitle}/><div className="faqWrap"><input className="faqSearch" type="search" value={search} onChange={e=>setSearch(e.target.value)} placeholder={lang==='hi'?'सवाल खोजें…':'Search questions…'} />{list.map((x,i)=><div className={`faqItem ${open===i?'open':''}`} key={x.qEn}><button onClick={()=>setOpen(open===i?-1:i)}><span>{lang==='hi'?x.qHi:x.qEn}</span><b>{open===i?'−':'+'}</b></button>{open===i&&<div><p>{lang==='hi'?x.aHi:x.aEn}</p></div>}</div>)}{!list.length&&<div className="emptyState">No matching questions.</div>}</div></div></section>; }

function Contact({ lang }) { const t=TXT[lang]; return <section className="section cream" id="contact"><div className="shell"><SectionHead lang={lang} eyebrow={t.contactEyebrow} title={t.contactTitle} lead={t.contactLead}/><div className="contactGrid"><div className="card contactCard"><span className="iconBadge">@</span><h3>Kunal Banchhor</h3><a href={`tel:${BUSINESS.primaryPhone.replace(/\s/g,'')}`}>{BUSINESS.primaryPhone}</a><a href={`https://wa.me/${BUSINESS.primaryWa}`} target="_blank" rel="noreferrer">WhatsApp</a></div><div className="card contactCard"><span className="iconBadge">↗</span><h3>Shivaji Rao</h3><a href={`tel:${BUSINESS.secondaryPhone.replace(/\s/g,'')}`}>{BUSINESS.secondaryPhone}</a><a href={`https://wa.me/${BUSINESS.secondaryWa}`} target="_blank" rel="noreferrer">WhatsApp</a></div><div className="card contactCard"><span className="iconBadge">✉</span><h3>{lang==='hi'?'व्यवसाय विवरण':'Business details'}</h3><a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a><p>{BUSINESS.address}</p><div className="btnRow"><a className="button outline small" href={`mailto:${BUSINESS.email}`}>{t.sendEmail}</a><button className="button navy small" onClick={()=>navigator.clipboard?.writeText(BUSINESS.email)}>Copy</button></div></div></div></div></section>; }

function CTA({ lang }) { const t=TXT[lang]; return <section className="section white"><div className="shell"><div className="cta" data-reveal><span className="eyebrow inverse">Maa Danteshwari</span><h2>{t.ctaTitle}</h2><p>{t.ctaLead}</p><div className="btnRow center"><a className="button gold" href="#book">{t.book}</a><a className="button whatsapp" href={`https://wa.me/${BUSINESS.primaryWa}`} target="_blank" rel="noreferrer">{t.whatsapp}</a><a className="button ghost" href={`tel:${BUSINESS.primaryPhone.replace(/\s/g,'')}`}>{t.call}</a></div></div></div></section>; }

function Footer() { return <footer className="footer"><div className="shell footerGrid"><div><div className="logo footerLogo"><img src="/images/logo.png" alt="Maa Danteshwari Tour & Travels" className="logoImg footerLogoImg" onError={e=>{e.currentTarget.style.display='none';e.currentTarget.nextSibling.style.display='flex';}}/><span className="logoFallback" style={{display:'none'}}><span className="logoMark">MD</span><span><strong>Maa Danteshwari</strong><small>Tour &amp; Travels</small></span></span></div><p>Local travel, passenger transport, tours, bus service, ambulance service, goods transport and transport equipment across Chhattisgarh. Established 2009 in Tilda Newra.</p></div><div><h4>Services</h4><a href="#services">Car Rental</a><a href="#services">Bus Service</a><a href="#services">Transport</a><a href="#services">Tours</a><a href="#ambulance">Ambulance</a></div><div><h4>Explore</h4><a href="#fleet">Fleet</a><a href="#routes">Routes</a><a href="#destinations">Destinations</a><a href="#faq">FAQ</a><a href="#book">Booking</a></div><div><h4>Contact</h4><a href={`tel:${BUSINESS.primaryPhone.replace(/\s/g,'')}`}>{BUSINESS.primaryPhone}</a><a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a><span>{BUSINESS.address}</span></div></div><div className="shell footerBottom"><span>© {new Date().getFullYear()} Maa Danteshwari Tour &amp; Travels. Established 2009.</span><a href="#top">Back to top ↑</a></div></footer>; }

function Modal({ item, lang, onClose }) { if(!item) return null; const title=item.value||item.name||`${item.from} → ${item.to}`; const desc=item.descEn||item.note||item.descEn||''; return <div className="modalBackdrop" role="dialog" aria-modal="true"><div className="modal"><button className="modalClose" onClick={onClose} aria-label="Close">×</button><span className="eyebrow">Details</span><h2>{lang==='hi'?(item.hi||item.nameHi||title):title}</h2><div className="modalBody"><p>{lang==='hi'?(item.descHi||item.noteHi||item.descEn):desc}</p>{item.whoEn&&<><h4>{lang==='hi'?'किसके लिए':'Good for'}</h4><ul>{(lang==='hi'?item.whoHi:item.whoEn).map(x=><li key={x}>✓ {x}</li>)}</ul></>}</div><div className="btnRow"><button className="button whatsapp" onClick={()=>openWhatsApp({reference:makeReference(),name:'Website visitor',phone:'',pickup:'',destination:'',date:'',service:item.value||item.name||`${item.from} to ${item.to}`,message:''})}>WhatsApp</button><a className="button navy" href="#book" onClick={onClose}>Start enquiry</a></div></div></div>; }


const CITIES = {
  'raipur': { name: 'Raipur', hi: 'रायपुर', desc: 'Raipur, the capital of Chhattisgarh.', img: 'raipur.webp' },
  'bilaspur': { name: 'Bilaspur', hi: 'बिलासपुर', desc: 'Bilaspur, the High Court city of Chhattisgarh.', img: 'bilaspur.webp' },
  'durg': { name: 'Durg', hi: 'दुर्ग', desc: 'Durg, an important industrial and educational hub.', img: 'durg.webp' },
  'bhilai': { name: 'Bhilai', hi: 'भिलाई', desc: 'Bhilai, the Steel City of Chhattisgarh.', img: 'bhilai.webp' },
  'tilda-newra': { name: 'Tilda Newra', hi: 'टिल्डा नेवरा', desc: 'Tilda Newra, our base and starting point for many journeys.', img: 'tilda.webp' }
};

function CityPage({ lang }) {
  const { city } = useParams();
  const c = CITIES[city];
  if (!c) return <div style={{padding:'100px',textAlign:'center'}}><h2>Location not found</h2><Link to="/">Go home</Link></div>;
  
  const title = `Car Rental & Travel Services in ${c.name}, Chhattisgarh | Maa Danteshwari`;
  const desc = `Looking for a vehicle from ${c.name}? Enquire with Maa Danteshwari Tour & Travels for car, bus and transport services across Chhattisgarh. Call or WhatsApp.`;
  
  return <div className="appRoot">
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={`https://maadanteshwaritours.com/travel/${city}`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={`https://maadanteshwaritours.com/travel/${city}`} />
      <meta property="og:type" content="website" />
    </Helmet>
    <Header lang={lang} setLang={()=>{}} />
    <main>
      <section className="hero" style={{padding:'80px 20px',background:'#063b70',color:'#fff',textAlign:'center'}}>
        <div className="shell">
          <span className="eyebrow brandEyebrow" style={{color:'#f4c400'}}>{lang==='hi'?'छत्तीसगढ़ यात्रा':'Chhattisgarh Travel'}</span>
          <h1>Car Rental & Travel Services in {c.name}, Chhattisgarh</h1>
          <p style={{maxWidth:'700px',margin:'20px auto'}}>{desc}</p>
          <div className="btnRow center">
             <Link className="button gold" to="/#book">Enquire Now</Link>
             <a className="button whatsapp" href={`https://wa.me/${BUSINESS.primaryWa}?text=Hi, I need a vehicle from ${c.name}.`}>WhatsApp Us</a>
          </div>
        </div>
      </section>
      
      <section className="section white"><div className="shell">
        <SectionHead lang={lang} eyebrow="Available Services" title={`Travel enquiries from ${c.name}`} lead={`We accept enquiries for local, outstation, or group travel starting from or involving ${c.name}. Subject to vehicle availability.`} />
        <div className="grid grid3">
          <div className="card"><h3>Car Rental</h3><p>Local and outstation travel from {c.name}. Suitable for families and business.</p></div>
          <div className="card"><h3>Bus Service</h3><p>Group travel and event transport originating from {c.name}.</p></div>
          <div className="card"><h3>Transport & Equipment</h3><p>Utility vehicles and machinery requirements around {c.name}.</p></div>
        </div>
      </div></section>
      
      <section className="section cream"><div className="shell">
        <SectionHead lang={lang} eyebrow="Routes" title={`Popular routes involving ${c.name}`} lead="Common journeys customers enquire about." />
        <ul style={{fontSize:'1.1rem',lineHeight:'2',maxWidth:'600px',margin:'0 auto'}}>
          <li>{c.name} ↔ Tilda Newra</li>
          <li>{c.name} ↔ Raipur</li>
          <li>{c.name} ↔ Bilaspur</li>
          <li>Outstation travel across Chhattisgarh from {c.name}</li>
        </ul>
      </div></section>
      
      <Booking lang={lang} prefill={{pickup: c.name}} />
    </main>
    <Footer />
  </div>;
}

function StatewideCoverage() {
  return <section className="section white" id="coverage">
    <div className="shell">
      <SectionHead lang="en" eyebrow="Statewide Coverage" title="Travel Across Chhattisgarh" lead="Based in Tilda Newra, we accept enquiries for journeys across Chhattisgarh, subject to route and vehicle availability." />
      <div className="grid grid3">
        <div className="card">
          <h3 style={{color:'#063b70'}}>Central Chhattisgarh</h3>
          <ul style={{listStyle:'none',padding:0,lineHeight:1.8,margin:'15px 0 0 0'}}>
            <li><Link to="/travel/raipur" style={{color:'#0066cc',textDecoration:'none'}}>Raipur</Link></li>
            <li><Link to="/travel/tilda-newra" style={{color:'#0066cc',textDecoration:'none'}}>Tilda Newra (Base)</Link></li>
            <li><Link to="/travel/durg" style={{color:'#0066cc',textDecoration:'none'}}>Durg</Link></li>
            <li><Link to="/travel/bhilai" style={{color:'#0066cc',textDecoration:'none'}}>Bhilai</Link></li>
            <li>Mahasamund, Dhamtari</li>
          </ul>
        </div>
        <div className="card">
          <h3 style={{color:'#063b70'}}>North Chhattisgarh</h3>
          <ul style={{listStyle:'none',padding:0,lineHeight:1.8,margin:'15px 0 0 0'}}>
            <li><Link to="/travel/bilaspur" style={{color:'#0066cc',textDecoration:'none'}}>Bilaspur</Link></li>
            <li>Korba</li>
            <li>Raigarh</li>
            <li>Ambikapur</li>
          </ul>
        </div>
        <div className="card">
          <h3 style={{color:'#063b70'}}>South Chhattisgarh</h3>
          <ul style={{listStyle:'none',padding:0,lineHeight:1.8,margin:'15px 0 0 0'}}>
            <li>Jagdalpur</li>
            <li>Dantewada</li>
            <li>Bastar</li>
            <li>Kanker</li>
          </ul>
        </div>
      </div>
    </div>
  </section>;
}

function Home({ lang, setLang, prefill, quick, route, vehicle, destination, service }) {
  const t = TXT[lang];
  const [activeCat, setActiveCat] = useState('all');
  
  useEffect(() => {
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.slice(1));
      if (el) el.scrollIntoView();
    }
  }, []);
  
  return <>
    <Helmet>
      <title>Maa Danteshwari Tour & Travels | Car Rental, Bus & Transport in Chhattisgarh</title>
      <meta name="description" content="Enquire for car rental, bus service, transport, and equipment across Chhattisgarh. Based in Tilda Newra, serving Raipur, Bilaspur, Durg, and beyond." />
      <link rel="canonical" href="https://maadanteshwaritours.com/" />
      <meta property="og:title" content="Maa Danteshwari Tour & Travels | Car Rental, Bus & Transport in Chhattisgarh" />
      <meta property="og:description" content="Enquire for car rental, bus service, transport, and equipment across Chhattisgarh. Based in Tilda Newra, serving Raipur, Bilaspur, Durg, and beyond." />
      <meta property="og:url" content="https://maadanteshwaritours.com/" />
      <meta property="og:type" content="website" />
    </Helmet>
    <Header lang={lang} setLang={setLang}/>
    <main>
      <Hero lang={lang} onQuick={quick}/>
      <Trust/>
      <StatewideCoverage />
      <Services lang={lang} openService={service}/>
      <Fleet lang={lang} activeCat={activeCat} setActiveCat={setActiveCat} onVehicle={vehicle}/>
      <Routes lang={lang} onRoute={route}/>
      <Districts lang={lang}/>
      <Destinations lang={lang} onDestination={destination}/>
      <Tours lang={lang}/>
      <Ambulance/>
      <Gallery/>
      <About lang={lang}/>
      <How lang={lang}/>
      <Booking lang={lang} prefill={prefill}/>
      <FAQ lang={lang}/>
      <Contact lang={lang}/>
      <CTA lang={lang}/>
    </main>
    <Footer/>
  </>;
}

function App() {
  const [lang,setLang] = useState(()=>localStorage.getItem('mdtt-locale')||'en');
  const [activeCat,setActiveCat]=useState('all');
  const [modal,setModal]=useState(null);
  const [prefill,setPrefill]=useState({});
  const revealRef=useReveal();
  useEffect(()=>{ localStorage.setItem('mdtt-locale',lang); document.documentElement.lang=lang==='hi'?'hi-IN':'en-IN'; },[lang]);
  useEffect(()=>{ const onKey=e=>{if(e.key==='Escape')setModal(null);}; window.addEventListener('keydown',onKey); return()=>window.removeEventListener('keydown',onKey); },[]);
  const quick=(data)=>{setPrefill(data);scrollToId('book');};
  const route=(r)=>{setPrefill({pickup:r.from,destination:r.to});scrollToId('book');};
  const vehicle=(v)=>setModal(v);
  const destination=(d)=>setModal(d);
  const service=(s)=>setModal(s);
  return <HelmetProvider>
      <BrowserRouter>
        <div ref={revealRef} className="appRoot">
          <RouterRoutes>
            <Route path="/" element={<Home lang={lang} setLang={setLang} prefill={prefill} quick={quick} route={route} vehicle={vehicle} destination={destination} service={service} />} />
            <Route path="/travel/:city" element={<CityPage lang={lang} />} />
          </RouterRoutes>
    <div className="floatingActions"><a href={`https://wa.me/${BUSINESS.primaryWa}`} target="_blank" rel="noreferrer" className="floatWa">WhatsApp</a><a href={`tel:${BUSINESS.primaryPhone.replace(/\s/g,'')}`} className="floatCall">Call</a></div>
    <button className="topButton" onClick={()=>scrollToId('top')} aria-label="Back to top">↑</button>
    <Modal item={modal} lang={lang} onClose={()=>setModal(null)}/>
        </div>
      </BrowserRouter>
    </HelmetProvider>;
}

createRoot(document.getElementById('root')).render(<App />);
