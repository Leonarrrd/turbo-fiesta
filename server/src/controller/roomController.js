const ioController = require('./ioController');

module.exports = {
    sendRoomUpdate: (room) => {
        let processedRoom = getProcessedRoomCopy(room);
        ioController.roomUpdate(room, processedRoom);
    },
}

function getProcessedRoomCopy(room){
    let processedRoom = {};
    let participants = [];
    // let teamRed = [];
    // let teamBlue = [];
    room.participants.forEach(function(participant) {
        participants.push(participant.name);
    });
    // room.game.teamRed.players.forEach(function(participant) {
    //   teamRed.push(participant.name);
    // });
    // room.game.teamBlue.players.forEach(function(participant) {
    //   teamBlue.push(participant.name);
    // });
    processedRoom.id = room.id;
    processedRoom.creator = room.creator.name;
    processedRoom.participants = participants;

    if(room.game){
        processedRoom.game = {};
        processedRoom.game.teamBluePoints = room.game.teamBlue.points;
        processedRoom.game.teamRedPoints = room.game.teamRed.points;
        processedRoom.game.wordPoolSize = room.game.wordPool.length;
        processedRoom.game.phase = room.game.phase;
        processedRoom.game.remainingWordsThisRound = room.game.wordsThisRound.length;
        if (room.game.activePlayer) {
            processedRoom.game.activePlayer = room.game.activePlayer.name;
        }
    }
    return processedRoom;
}