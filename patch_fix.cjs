const fs = require('fs');
let main = fs.readFileSync('c:/Users/divya/OneDrive/Desktop/mdtt-react-app/src/main.jsx', 'utf8');

// Fix duplicate Routes name
main = main.replace(
  "import { BrowserRouter, Routes, Route, Link, useParams, useLocation } from 'react-router-dom';",
  "import { BrowserRouter, Routes as RouterRoutes, Route, Link, useParams, useLocation } from 'react-router-dom';"
);

main = main.replace(
  /<Routes>/g,
  "<RouterRoutes>"
);

main = main.replace(
  /<\/Routes>/g,
  "</RouterRoutes>"
);

// Fix trailing </div>
main = main.replace(
  /<\/RouterRoutes>\s*<div className="floatingActions">[\s\S]*?<\/HelmetProvider>\s*<\/div>;/m,
  `</RouterRoutes>
    <div className="floatingActions"><a href={\`https://wa.me/\${BUSINESS.primaryWa}\`} target="_blank" rel="noreferrer" className="floatWa">WhatsApp</a><a href={\`tel:\${BUSINESS.primaryPhone.replace(/\\s/g,'')}\`} className="floatCall">Call</a></div>
    <button className="topButton" onClick={()=>scrollToId('top')} aria-label="Back to top">↑</button>
    <Modal item={modal} lang={lang} onClose={()=>setModal(null)}/>
        </div>
      </BrowserRouter>
    </HelmetProvider>;`
);

fs.writeFileSync('c:/Users/divya/OneDrive/Desktop/mdtt-react-app/src/main.jsx', main);
console.log('Fixed main.jsx');
