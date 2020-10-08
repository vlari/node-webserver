const fs = require('fs');

const getFile = (path, res) => {
  fs.readFile(`./views/${path}.html`, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    res.end(data);
  });
};

const sendView = (path, res) => {
  if (fs.existsSync(`./views/${path}.html`)) {
    getFile(path, res);
  } else {
    sendError(res);
  }
};

exports.routes = {
  get: {
    '/': (req, res) => {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });

      sendView('home', res);
    },
    '/home': (req, res) => {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });

      sendView('home', res);
    },
    '/about': (req, res) => {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });

      sendView('about', res);
    }
  }
}

const sendError = (res) => {
  res.writeHead(404, {
    'Content-Type': 'text/html'
  });

  getFile('/notfound', res);
};
