const http = require('http');
const url = require('url');

const server = http.createServer();

server.on('request', (req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (req.method === 'GET') {

  } else if (req.method === 'POST' && parsedUrl.pathname === '/users') {
  }
});

server.on('error', (err) => {
  console.log(err);
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
