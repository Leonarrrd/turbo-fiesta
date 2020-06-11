var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var Room = require('./model/room.js');
var Session = require('./model/session.js');
var User = require('./model/user.js');
app.use('/', express.static('public'));

let userIdCounter = 1;
let roomIdCounter = 1;

let session = new Session();

io.on('connection', function(socket){
  let user = new User(userIdCounter, socket);
  session.addUser(user);
  console.log("New Client with Id <" + userIdCounter + ">");
  userIdCounter++;

  socket.on('chatMessage', function(msg){
    console.log("New Message: " + msg);
    switch(msg.charAt(0)){
      case "!":
        user.name = msg.substring(1)
        socket.emit('chatUpdate', "Your name was changed to: <" + user.name + ">");
        if (session.findRoomOfUser(user)){
          sendUpdate(session.findRoomOfUser(user).id)
        }
        break;
      default:
        io.emit('chatUpdate', user.name + ": " + msg);
    }
  });

  socket.on('createRoom', function() {
      var room = session.findRoomOfUser(user);
      if (room){
        room.removeParticipant(user);
        sendUpdate(room.id);
      } 
      session.addRoom(new Room(roomIdCounter, user));
      socket.emit('assignRoom', roomIdCounter);
      console.log("New Room created by User <" + user.name +"> with ID <" + roomIdCounter + ">");
      roomIdCounter++;
  });

  socket.on('joinRoom', function(roomId) {
    let room = session.getRoomById(roomId);
    if (room != null && !room.getParticipants().filter(e => e.id == user.id).length > 0) {
      room.addParticipant(user);
      socket.emit('assignRoom', roomId);
      console.log("User <" + user.name + "> entered the Room with ID " + "<" + roomId + ">");
    }
});

  socket.on('requireRoomUpdate', function(Room) {
    sendUpdate(Room);
  });

  function sendUpdate(roomId){
    // if we try to send room.participants over the socket, the server will crash, hence we make a shallow copy
    // here we want to send over a room object/json in the future
    let room = session.getRoomById(roomId);
    let processedRoom = getProcessedRoomCopy(room);
    room.participants.forEach(function(participant) {
      participant.socket.emit('roomUpdate', processedRoom);
    });
  }
});

function getProcessedRoomCopy(room){
  let processedRoom = {};
  let participants = [];
  room.participants.forEach(function(participant) {
    participants.push(participant.name);
  });
  processedRoom.participants = participants;
  processedRoom.creator = room.creator.name;
  return processedRoom;
}

http.listen(port, function(){
  console.log('listening on *:' + port);
});