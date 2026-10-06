const fs = require('fs');

let server = fs.readFileSync('c:/Users/divya/OneDrive/Desktop/mdtt-react-app/server/index.js', 'utf8');

server = server.replace(
  /app\.get\('\*',\s*\(req,\s*res\)\s*=>\s*\{\s*res\.sendFile\(path\.join\(__dirname,\s*'\.\.\/dist',\s*'index\.html'\)\);\s*\}\);/m,
  `app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});`
);

fs.writeFileSync('c:/Users/divya/OneDrive/Desktop/mdtt-react-app/server/index.js', server);
console.log('Fixed SPA fallback in server/index.js');
