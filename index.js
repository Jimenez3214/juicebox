const PORT = 3000;
const express = require('express');
const server = express();
const apiRouter = require('./api');
const morgan = require('morgan');
require('dotenv').config();

server.get('/background/:color', (req, res, next )=> {
  res.send(`
  <body style="background: ${req.params.color };">
  <h1>Hello world</h1>
  </body>
  `);
});

server.get('/add/:first/to/:second', (req, res, next)=> {
  res.send(`<h1>${req.params.first } + ${req.params.second } = ${Number(req.params.first) + Number(req.params.second)}
  <h1>`);
})
server.use(morgan('dev'));
server.use(express.json());
server.use('/api', apiRouter);




const { client } = require('./db');
client.connect();

server.listen(PORT, () => {
  console.log('The server is up on port', PORT)
});