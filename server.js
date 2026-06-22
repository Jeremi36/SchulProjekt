const express = require('express');
const path = require('path');

const app = express();
const publicDir = path.join(__dirname, 'public');
const port = process.env.PORT || 3000;

app.disable('x-powered-by');
app.use(express.static(publicDir, { extensions: ['html'] }));

app.get('/health', (_req, res) => {
  res.json({ status: 'online', app: 'Know your Schoolday' });
});

// Alle Prototyp-Routen werden clientseitig dargestellt.
app.get('*', (_req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Know your Schoolday läuft auf Port ${port}`);
});
