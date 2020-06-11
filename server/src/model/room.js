class Room {
    id;
    creator;
    participants = [];

    constructor(id, creator){
        this.id = id;
        this.creator = creator;
        this.participants.push(creator);
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
}

module.exports = Room;