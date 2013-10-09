var WebSocketServer = require('ws').Server
	, express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , port = process.env.PORT || 5000;

server.listen(port);

console.log('http server listening on %d', port);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.get('/app.js', function(req, res) {
  res.sendfile(__dirname + '/app.js');
});

io.sockets.on('connection', function (socket) {
  socket.emit('new:msg', 'Welcome to Talkie!');

  socket.on('broadcast:msg', function(data) {
    // Tell all the other clients (except self) about the new message
    socket.broadcast.emit('new:msg', data.message);
  });
});
