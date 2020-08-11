const express = require('express');

const server = express();
const port = 4000

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {}

server.listen(port, () => {
  console.log(`[ Server running at http://localhost${port} ... ]`)
})

module.exports = server;
