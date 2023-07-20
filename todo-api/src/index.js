const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const routes = require('./app/routes.js');

// Disable TLS/SSL certificate validation (only in development!)
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

// JSON body parser
app.use(bodyParser.json());
app.use(cors());

// Initialize routes
routes(app);

// Serve static files
app.use(express.static(path.join(__dirname, '../../dist/forgerock-poc')));

// Serve index.html for all routes
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/forgerock-poc/index.html'));
});

// Configure HTTPS options
const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, '../certs/key.pem')),
  cert: fs.readFileSync(path.join(__dirname, '../certs/cert.pem'))
};

// Create HTTPS server
const server = https.createServer(httpsOptions, app);

// Start the server
server.listen(9443, () => {
  console.log('HTTPS Server running on port 9443');
});
