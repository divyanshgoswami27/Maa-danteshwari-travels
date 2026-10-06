const fs = require('fs');

const mainJsxPath = 'c:/Users/divya/OneDrive/Desktop/mdtt-react-app/src/main.jsx';
let mainJsx = fs.readFileSync(mainJsxPath, 'utf8');

// Replace buildWhatsAppMessage
mainJsx = mainJsx.replace(
/function buildWhatsAppMessage[\s\S]*?function openWhatsApp/m,
`const SERVICE_VEHICLE_MAP = {
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
    \`Hello \${BUSINESS.name},\`, '',
    'I would like to enquire about a journey in Chhattisgarh.', '',
    \`Reference: \${data.reference || 'Not generated yet'}\`,
    \`Name: \${data.name}\`,
    \`Mobile: \${data.phone}\`,
    data.email ? \`Email: \${data.email}\` : null,
    \`Pickup: \${data.pickup}\`,
    \`Destination: \${data.destination}\`,
    \`Travel Date: \${data.date}\`,
    data.time ? \`Travel Time: \${data.time}\` : null,
    \`Service: \${data.service}\`,
    data.vehicle ? \`Vehicle: \${data.vehicle}\` : null,
    data.passengers ? \`Passengers: \${data.passengers}\` : null,
    data.tripType ? \`Trip Type: \${data.tripType}\` : null,
    data.returnDate ? \`Return Date: \${data.returnDate}\` : null,
    data.returnTime ? \`Return Time: \${data.returnTime}\` : null,
    data.days ? \`Days Needed: \${data.days}\` : null,
    data.hours ? \`Hours Needed: \${data.hours}\` : null,
    data.message ? \`Additional Requirement: \${data.message}\` : null,
    '', 'Please check availability and share the quotation.', '', 'Thank you.'
  ].filter(Boolean);
  return lines.join('\\n');
}

function openWhatsApp`
);

// Replace initialForm and Booking
mainJsx = mainJsx.replace(
/const initialForm = \{ pickup:[\s\S]*?function Field\(\{/m,
`const initialForm = { pickup:'', destination:'', date:'', time:'', tripType:'One Way', service:'', vehicle:'', passengers:'', name:'', phone:'', email:'', message:'', returnDate:'', returnTime:'', days:'', hours:'' };

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
      if(showPassengers && form.passengers && (!/^\\d+$/.test(form.passengers)||Number(form.passengers)<1||Number(form.passengers)>99))e.passengers=lang==='hi'?'1-99 यात्री दर्ज करें।':'How many people are travelling?';
      if(form.service && availableVehicles.length > 1 && form.vehicle && form.vehicle !== NOT_SURE_VEHICLE && !availableVehicles.includes(form.vehicle)) {
         e.vehicle='Please choose a vehicle suitable for the selected service.';
      }
    }
    if(s===3){if(form.name.trim().length<2)e.name=lang==='hi'?'अपना पूरा नाम दर्ज करें।':'Please provide your name.';if(!validPhone(form.phone))e.phone=lang==='hi'?'वैध 10 अंकों का मोबाइल नंबर दर्ज करें।':'Please enter a valid 10-digit mobile number.';if(form.email&&!/^\\S+@\\S+\\.\\S+$/.test(form.email))e.email=lang==='hi'?'वैध ईमेल पता दर्ज करें।':'Please provide a valid email address.';}
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
        <a className="button red" href={\`tel:\${BUSINESS.primaryPhone.replace(/\\s/g,'')}\`} style={{background:'#d32f2f',color:'#fff'}}>CALL NOW +91 79702 28089</a>
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
        <a className="button navy hideMobile" href={\`tel:\${BUSINESS.primaryPhone.replace(/\\s/g,'')}\`}>Call Now</a>
      </div>
    </div></div>}
    {result&&<div className={\`result \${result.ok?'success':'error'}\`} role="status">{result.ok?<><strong>{lang==='hi'?'एन्क्वायरी प्राप्त हुई':'Enquiry Received'}</strong><p>Your enquiry has been prepared successfully.<br/>Reference: {result.reference}<br/>Our team will check vehicle availability and contact you with a quotation.</p><div className="btnRow"><button className="button whatsapp" onClick={()=>openWhatsApp(result.data)}>WhatsApp Us</button><a className="button navy" href={\`tel:\${BUSINESS.primaryPhone.replace(/\\s/g,'')}\`}>Call Now</a><button className="button outline" onClick={()=>{setForm(initialForm);setStep(1);setResult(null);}}>Send Another Enquiry</button></div></>:<><strong>We couldn't send the enquiry right now.</strong><p>Your details are still here. Please try WhatsApp or call us directly.</p><div className="btnRow"><button className="button whatsapp" onClick={()=>openWhatsApp({...form,reference:makeReference()})}>Send via WhatsApp</button><a className="button navy" href={\`tel:\${BUSINESS.primaryPhone.replace(/\\s/g,'')}\`}>Call Now</a><button className="button outline" onClick={()=>setResult(null)}>Try Again</button></div></>}</div>}
    <p className="formFooterNote">Not sure what to select? Don't worry. Send us your requirement and our team will help you choose the right vehicle.</p>
  </div></div></section>;
}

function Field({`
);

fs.writeFileSync(mainJsxPath, mainJsx);
console.log('Updated main.jsx');
