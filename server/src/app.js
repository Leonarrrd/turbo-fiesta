var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var Game = require('./model/game.js').Game;
var Session = require('./model/session.js');
var User = require('./model/user.js');
app.use('/', express.static('public'));

let userId = 1;
let gameId = 1;

let session = new Session();

io.on('connection', function(socket){
  let user = new User(userId, socket);
  session.addUser(user);
  console.log("New Client with Id <" + userId + ">");
  userId++;

  socket.on('chatMessage', function(msg){
    console.log("New Message: " + msg);
    switch(msg.charAt(0)){
      case "!":
        user.name = msg.substring(1)
        socket.emit('chatUpdate', "Your name was changed to: <" + user.name + ">");
        break;
      default:
        io.emit('chatUpdate', user.name + ": " + msg);
    }
  });

  socket.on('createGame', function() {
      var game = session.findGameofUser(user);
      if (game){
        game.removeParticipant(user);
        sendUpdate(game.id);
      } 
      session.addGame(new Game(gameId, user));
      socket.emit('assignGame', gameId);
      console.log("New Game created with ID <" + gameId + ">");
      gameId++;
  });

  socket.on('joinGame', function(_gameId) {
    let game = session.getGameById(_gameId);
    if (game != null && !game.getParticipants().filter(e => e.id == user.id).length > 0) {
      game.addParticipant(user);
      socket.emit('assignGame', _gameId);
      console.log("User " + user.name + " entered the Game with ID " + "<" + _gameId + ">");
    }
});

  socket.on('requireGameUpdate', function(_gameId) {
    sendUpdate(_gameId)
  });

  function sendUpdate(_gameId){
    let game = session.getGameById(_gameId);
    let participantsCopy = [];
    game.participants.forEach(function(participant) {
      participantsCopy.push(participant.name);
    });
    game.participants.forEach(function(participant) {
      participant.socket.emit('gameUpdate', participantsCopy);
    });
  }
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});