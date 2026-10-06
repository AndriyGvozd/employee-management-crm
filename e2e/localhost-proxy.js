// Forwards localhost ports inside the Playwright container to other Docker services,
// so the browser opens the app exactly like on the host: frontend on :5173, API on :3000.
const net = require('net');

const routes = { 5173: 'frontend', 3000: 'app' };

for (const [port, host] of Object.entries(routes)) {
  net
    .createServer((client) => {
      const upstream = net.connect(Number(port), host);
      client.pipe(upstream).pipe(client);
      upstream.on('error', () => client.destroy());
      client.on('error', () => upstream.destroy());
    })
    .listen(Number(port), '127.0.0.1');
}
