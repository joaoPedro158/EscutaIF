#!/usr/bin/env node
const os = require('os');

function findLocalIp() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return null;
}

const ip = findLocalIp();
if (ip) {
  console.log(ip);
  console.log(`Export command:`);
  console.log(`export API_BASE_URL=http://${ip}:8080/api`);
} else {
  console.error('No non-internal IPv4 address found.');
  process.exit(1);
}
