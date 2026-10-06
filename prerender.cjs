const puppeteer = require('puppeteer');
const express = require('express');
const path = require('path');
const fs = require('fs');

const ROUTES = [
  '/',
  '/travel/tilda-newra',
  '/travel/raipur',
  '/travel/bilaspur',
  '/travel/durg',
  '/travel/bhilai'
];

async function prerender() {
  console.log('Starting local server for prerendering...');
  const app = express();
  app.use(express.static(path.join(__dirname, 'dist')));
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });

  const server = app.listen(3000, '127.0.0.1', async () => {
    console.log('Server running on port 3000');
    console.log('Launching puppeteer...');
    
    let browser;
    try {
       browser = await puppeteer.launch({ headless: 'new' });
    } catch (err) {
       console.log('Fallback to old headless...');
       browser = await puppeteer.launch({ headless: true });
    }
    
    for (const route of ROUTES) {
      console.log('Prerendering ' + route + '...');
      const page = await browser.newPage();
      await page.goto('http://127.0.0.1:3000' + route, { waitUntil: 'networkidle0' });
      
      // Wait for helmet to do its thing (it usually updates title very quickly)
      await new Promise(r => setTimeout(r, 2000)); 

      const html = await page.content();
      
      let filePath = path.join(__dirname, 'dist', route);
      if (route !== '/') {
        fs.mkdirSync(filePath, { recursive: true });
        filePath = path.join(filePath, 'index.html');
      } else {
        filePath = path.join(filePath, 'index.html');
      }
      
      fs.writeFileSync(filePath, html);
      console.log('Saved ' + filePath);
      await page.close();
    }
    
    await browser.close();
    server.close();
    console.log('Prerendering complete!');
  });
}

prerender().catch(console.error);
