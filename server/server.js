'use strict';

const app = require('./app');
const http = require('http');
const chalk = require('chalk');

let port = process.env.PORT || 9000;

app.set('port', port);

let httpServer = http.createServer(app);

httpServer.on('error', (err) => {
  console.log(err)
});

httpServer.on('listening',  () => {
  console.log(chalk.blue(`Express server is listening on ${httpServer.address().port}`))
});

httpServer.listen(port);
