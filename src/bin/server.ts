import * as http from 'http';
import debug from 'debug';

import app from './app';

// Setup application port
const port = process.env.PORT || 3000;
app.set('port', port);

// Setup server instance and listener
const server = http.createServer(app);

// Setup server address with port
const getAddressBind = () => {
  const addr = server.address();

  return typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
}

// Event listener for HTTP server "error" event.
const onError = (error: any) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  // Handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      debug(`${getAddressBind()} requires elevated privileges.`);
      process.exit(1);
      break;

    case 'EADDRINUSE':
      debug(`${getAddressBind()} is already in use.`);
      process.exit(1);
      break;

    default:
      throw error;
  }
}

// Event listener for HTTP server "listening" event.
const onListening = () => {
  debug(`Server is up and running on ${getAddressBind()}`);
}

// Listen server to a configured port
server.listen(port);

// Setup server listeners
server.on('error', onError);
server.on('listening', onListening);

export default server;

