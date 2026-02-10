import { createBareServer } from '@tomphttp/bare-server-node';
import http from 'node:http';

const bare = createBareServer('/bare/');
const server = http.createServer();

server.on('request', (req, res) => {
    if (bare.shouldRoute(req)) {
        bare.routeRequest(req, res);
    } else {
        res.writeHead(200);
        res.end('Bare Server v3 is active.');
    }
});

server.on('upgrade', (req, socket, head) => {
    if (bare.shouldRoute(req)) {
        bare.routeUpgrade(req, socket, head);
    } else {
        socket.end();
    }
});

// Render automatically provides the PORT environment variable
const PORT = process.env.PORT || 10000;

server.listen(PORT, () => {
    console.log(`Bare Server v3 listening on port ${PORT}`);
});
