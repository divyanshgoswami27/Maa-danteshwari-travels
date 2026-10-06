const fs = require('fs');
let server = fs.readFileSync('c:/Users/divya/OneDrive/Desktop/mdtt-react-app/server/index.js', 'utf8');

if (!server.includes('express.static')) {
  server = server.replace(
    /app\.listen\(PORT,/m,
    `// Serve frontend static files
const path = require('path');
app.use(express.static(path.join(__dirname, '../dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

app.listen(PORT,`
  );
  fs.writeFileSync('c:/Users/divya/OneDrive/Desktop/mdtt-react-app/server/index.js', server);
  console.log('Added SPA fallback to server/index.js');
} else {
  console.log('SPA fallback already exists');
}
