var express = require('express')
var app = express();
var http = require('http').Server(app);
var port = process.env.PORT || 3000;
var io = require('socket.io')(http);
var ioController = require('./controller/ioController');

app.use('/', express.static('public'));

ioController.init(io);

http.listen(port, function(){
  console.log('listening on *:' + port);
});