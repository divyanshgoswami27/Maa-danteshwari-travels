const fs = require('fs');
let main = fs.readFileSync('c:/Users/divya/OneDrive/Desktop/mdtt-react-app/src/main.jsx', 'utf8');

// Imports
main = main.replace(
  "import React, { useEffect, useMemo, useRef, useState } from 'react';",
  "import React, { useEffect, useMemo, useRef, useState } from 'react';\nimport { BrowserRouter, Routes, Route, Link, useParams, useLocation } from 'react-router-dom';\nimport { Helmet, HelmetProvider } from 'react-helmet-async';"
);

// Add City Page and Home wrapper
const cityPageCode = `
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
  
  const title = \`Car Rental & Travel Services in \${c.name}, Chhattisgarh | Maa Danteshwari\`;
  const desc = \`Looking for a vehicle from \${c.name}? Enquire with Maa Danteshwari Tour & Travels for car, bus and transport services across Chhattisgarh. Call or WhatsApp.\`;
  
  return <div className="appRoot">
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={\`https://maadanteshwaritours.com/travel/\${city}\`} />
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
             <a className="button whatsapp" href={\`https://wa.me/\${BUSINESS.primaryWa}?text=Hi, I need a vehicle from \${c.name}.\`}>WhatsApp Us</a>
          </div>
        </div>
      </section>
      
      <section className="section white"><div className="shell">
        <SectionHead lang={lang} eyebrow="Available Services" title={\`Travel enquiries from \${c.name}\`} lead={\`We accept enquiries for local, outstation, or group travel starting from or involving \${c.name}. Subject to vehicle availability.\`} />
        <div className="grid grid3">
          <div className="card"><h3>Car Rental</h3><p>Local and outstation travel from {c.name}. Suitable for families and business.</p></div>
          <div className="card"><h3>Bus Service</h3><p>Group travel and event transport originating from {c.name}.</p></div>
          <div className="card"><h3>Transport & Equipment</h3><p>Utility vehicles and machinery requirements around {c.name}.</p></div>
        </div>
      </div></section>
      
      <section className="section cream"><div className="shell">
        <SectionHead lang={lang} eyebrow="Routes" title={\`Popular routes involving \${c.name}\`} lead="Common journeys customers enquire about." />
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
`;

main = main.replace("function App() {", cityPageCode + "\nfunction App() {");

main = main.replace(
  /<div ref=\{revealRef\} className="appRoot">[\s\S]*?<Footer\/>/m,
  `<HelmetProvider>
      <BrowserRouter>
        <div ref={revealRef} className="appRoot">
          <Routes>
            <Route path="/" element={<Home lang={lang} setLang={setLang} prefill={prefill} quick={quick} route={route} vehicle={vehicle} destination={destination} service={service} />} />
            <Route path="/travel/:city" element={<CityPage lang={lang} />} />
          </Routes>`
);

main = main.replace(
  /<Modal item=\{modal\} lang=\{lang\} onClose=\{\(\)=>setModal\(null\)\}\/>/m,
  `<Modal item={modal} lang={lang} onClose={()=>setModal(null)}/>
        </div>
      </BrowserRouter>
    </HelmetProvider>`
);

fs.writeFileSync('c:/Users/divya/OneDrive/Desktop/mdtt-react-app/src/main.jsx', main);
console.log('Updated main.jsx');
