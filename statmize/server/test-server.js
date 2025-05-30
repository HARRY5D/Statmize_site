// Simple script to test if server is running
const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/',
  method: 'GET'
};

console.log('Testing connection to server at http://localhost:3000...');

const req = http.request(options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  
  if (res.statusCode === 200) {
    console.log('✓ Server is running correctly!');
  } else {
    console.log('⚠ Server responded with non-200 status code');
  }
  
  res.on('data', (chunk) => {
    console.log('Response body: ' + chunk);
  });
});

req.on('error', (error) => {
  console.error('✗ Connection error: ' + error.message);
  console.log('\nThe server does not appear to be running.');
  console.log('Please start the server with: node server.js');
});

req.end();
