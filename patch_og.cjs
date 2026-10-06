const fs = require('fs');
let main = fs.readFileSync('c:/Users/divya/OneDrive/Desktop/mdtt-react-app/src/main.jsx', 'utf8');

// Update CityPage to include Open Graph tags
main = main.replace(
  /<Helmet>\s*<title>\{title\}<\/title>\s*<meta name="description" content=\{desc\} \/>\s*<link rel="canonical" href=\{\`https:\/\/maadanteshwaritours\.com\/travel\/\$\{city\}\`\} \/>\s*<\/Helmet>/m,
  `<Helmet>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={\`https://maadanteshwaritours.com/travel/\${city}\`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={\`https://maadanteshwaritours.com/travel/\${city}\`} />
      <meta property="og:type" content="website" />
    </Helmet>`
);

// Update Home to include Open Graph tags
main = main.replace(
  /<Helmet>\s*<title>Maa Danteshwari Tour & Travels \| Car Rental, Bus & Transport in Chhattisgarh<\/title>\s*<meta name="description" content="Enquire for car rental, bus service, transport, and equipment across Chhattisgarh. Based in Tilda Newra, serving Raipur, Bilaspur, Durg, and beyond." \/>\s*<\/Helmet>/m,
  `<Helmet>
      <title>Maa Danteshwari Tour & Travels | Car Rental, Bus & Transport in Chhattisgarh</title>
      <meta name="description" content="Enquire for car rental, bus service, transport, and equipment across Chhattisgarh. Based in Tilda Newra, serving Raipur, Bilaspur, Durg, and beyond." />
      <link rel="canonical" href="https://maadanteshwaritours.com/" />
      <meta property="og:title" content="Maa Danteshwari Tour & Travels | Car Rental, Bus & Transport in Chhattisgarh" />
      <meta property="og:description" content="Enquire for car rental, bus service, transport, and equipment across Chhattisgarh. Based in Tilda Newra, serving Raipur, Bilaspur, Durg, and beyond." />
      <meta property="og:url" content="https://maadanteshwaritours.com/" />
      <meta property="og:type" content="website" />
    </Helmet>`
);

fs.writeFileSync('c:/Users/divya/OneDrive/Desktop/mdtt-react-app/src/main.jsx', main);
console.log('Updated main.jsx with OG tags');
