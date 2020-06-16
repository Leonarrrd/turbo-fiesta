const AlextivityGame = require("./AlextivityGame");

class Room {
    id;
    creator;
    participants = [];
    game;

    constructor(id, creator){
        this.id = id;
        this.creator = creator;
        this.addParticipant(creator);
    }

    addParticipant(user){
        this.participants.push(user);
    }

    removeParticipant(user){
        this.participants.splice(this.participants.indexOf(user),1);
    }

    getParticipants(){
        return this.participants;
    }

    startNewAlextivityGame(){
        this.game = new AlextivityGame();
        this.game.assignTeams(this.participants);
    }
}

module.exports = Room;