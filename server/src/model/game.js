class Game {
    id;
    creator;
    participants = []

    constructor(id, creator){
        this.id = id;
        this.creator = creator;
        this.participants.push(creator);
    }

    addParticipant(user){
        this.participants.push(user);
    }

    removeParticipant(user){
        console.log(this.participants.length)
        // this.participants.filter(participant => participant.id == user.id);
        this.participants.splice(this.participants.indexOf(user),1);
        console.log(this.participants.length)
    }

    getParticipants(){
        return this.participants;
    }
}

module.exports = {Game : Game}