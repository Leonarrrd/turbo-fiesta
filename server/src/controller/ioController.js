const events = require('../enum/events');
var _io;

module.exports = {
  init: (io) => {
    _io = io;

    const sessionController = require('./sessionController');
    const chatController = require('./chatController');
    const roomController = require('./roomController');
    const alextivityController = require('./alextivityController');

    io.on(events.CONNECTION, (socket) => {
        console.log('New Connection');
        let user = sessionController.newUser(socket);

        socket.on(events.CHATMESSAGE, (data) => {
          chatController.newMessage(user, data);
        });

        socket.on(events.CREATEROOM, () => {
          sessionController.createRoom(user);
        });

        socket.on(events.JOINROOM, (roomId) => {
          sessionController.joinRoom(user, roomId);
        });

        socket.on(events.REQUIREROOMUPDATE, () => {
          roomController.sendRoomUpdate(user.room);
        });

        socket.on(events.STARTPHASESUBMITWORDS, () => {
          alextivityController.startPhaseSubmitWords(user.room);
        });

        socket.on(events.SUBMITTEDWORDS, (words) => {
          alextivityController.submittedWords(user, words);
        });

        socket.on(events.STARTTURN, () => {
          alextivityController.startTurn(user);
        });

        socket.on(events.CORRECTGUESS, () => {
          alextivityController.correctGuess(user);
        });

        socket.on(events.WRONGGUESS, () => {
          alextivityController.wrongGuess(user);
        });
    });
  },
  
  chatUpdate: (message) => {
    broadCast(events.CHATUPDATE, message);
  },

  assignRoom: (user, roomId) => {
    unicast(user, events.ASSIGNROOM, roomId);
  },

  roomUpdate: (room, processedRoomCopy) => {
    broadcastToRoom(room, events.ROOMUPDATE, processedRoomCopy);
  },

  assignTeam: (room) => {
    broadcastToRoomIndividualData(room, events.ASSIGNTEAM);
  },

  timesUpSubmitWords: (room) => {
    broadcastToRoom(room, events.TIMESUPSUBMITWORDS);
  },

  turnStarted: (room, turnTime) => {
    broadcastToRoom(room, events.TURNSTARTED, turnTime);
  },
  
  newWord: (user, word) => {
    unicast(user, events.NEWWORD, word);
  },

  yourTurn: (user) => {
    unicast(user, events.YOURTURN);
  },

  notYourTurn: (user) => {
    unicast(user, events.NOTYOURTURN);
  },

  clearCountdown: (room) => {
    broadcastToRoom(room, events.CLEARCOUNTDOWN);
  }
}

function unicast(user, event, data) {
  user.socket.emit(event, data);
}

function broadCast(event, data) {
  _io.emit(event, data);
}

function broadcastToRoom(room, event, data) {
  room.participants.forEach((participant) => {
    participant.socket.emit(event, data);
  });
}

function broadcastToRoomIndividualData(room, event){
  room.participants.forEach((participant) => {
    switch (event) {
      case 'assignTeam':
        participant.socket.emit(event, participant.team.color);
        break;
      default:
        console.log("Unknown Event");
    }
  });
}