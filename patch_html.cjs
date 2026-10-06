const fs = require('fs');

let html = fs.readFileSync('c:/Users/divya/OneDrive/Desktop/mdtt-react-app/index.html', 'utf8');

const jsonld = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "LocalBusiness",
          "name": "Maa Danteshwari Tour & Travels",
          "image": "https://maadanteshwaritours.com/logo.png",
          "url": "https://maadanteshwaritours.com/",
          "telephone": "+917970228089",
          "email": "maadanteshwaritravel@gmail.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Vrindavan Colony Ke Pass",
            "addressLocality": "Tilda Newra",
            "addressRegion": "Chhattisgarh",
            "postalCode": "493114",
            "addressCountry": "IN"
          },
          "areaServed": [
            { "@type": "State", "name": "Chhattisgarh" },
            { "@type": "City", "name": "Raipur" },
            { "@type": "City", "name": "Bilaspur" },
            { "@type": "City", "name": "Durg" },
            { "@type": "City", "name": "Bhilai" },
            { "@type": "City", "name": "Tilda Newra" }
          ],
          "priceRange": "₹₹",
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "00:00",
            "closes": "23:59"
          }
        },
        {
          "@type": "WebSite",
          "name": "Maa Danteshwari Tour & Travels",
          "url": "https://maadanteshwaritours.com/",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://maadanteshwaritours.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }
      ]
    }
    </script>
`;

html = html.replace('</head>', jsonld + '</head>');
fs.writeFileSync('c:/Users/divya/OneDrive/Desktop/mdtt-react-app/index.html', html);
console.log('Updated index.html');
