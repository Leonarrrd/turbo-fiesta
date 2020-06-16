class Team {
    color;
    queuePos;
    points = 0;
    players = [];

    constructor(color){
        this.color = color;
    }

    addPlayer(user){
        this.players.push(user);
    }

    initializeQueuePos(){
        this.queuePos = Math.floor(Math.random() * this.players.length);
    }

    getNextPlayer(){
        this.queuePos++
        if (this.queuePos === this.players.length){
            this.queuePos = 0
        }
        return this.players[this.queuePos];
    }
}


module.exports = Team;