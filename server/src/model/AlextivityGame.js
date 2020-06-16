const Team = require("./Team");

class AlextivityGame {
    teamRed = new Team('red');
    teamBlue = new Team('blue');
    wordPool = [];
    phase;
    wordsThisRound = [];
    activeTeam;
    activePlayer;
    activeWordIndex = 0;

    constructor(){
    }

    assignTeams(participants){
        participants.forEach((participant) => {
            let team;
            if (this.teamRed.players.length >= participants.length / 2) {
                team = this.teamBlue;
            } else if (this.teamBlue.players.length >= participants.length / 2){
                team = this.teamRed;
            } else {
                team = Math.random() > 0.5 ? this.teamRed : this.teamBlue;
            }
            team.addPlayer(participant);
            participant.team = team;
        });
        this.teamRed.initializeQueuePos();
        this.teamBlue.initializeQueuePos();
        this.activeTeam = Math.random() > 0.5 ? this.teamRed : this.teamBlue;
    }

    nextTurn(){
        this.shuffleWordsThisRound();
        this.activeWordIndex = 0;
        this.toggleActiveTeam();
        this.activePlayer = this.activeTeam.getNextPlayer();
    }

    initNewRound(){
        this.nextTurn();
        this.shuffleWordPool();
        this.wordsThisRound = [...this.wordPool];
    }

    toggleActiveTeam(){
        this.activeTeam = this.activeTeam === this.teamRed ? this.teamBlue : this.teamRed;
    }

    nextWord(isGuessed){
        if (isGuessed){
            this.activeTeam.points++;
            this.wordsThisRound.splice(this.activeWordIndex, 1);
        } else {
            this.activeWordIndex++;
            if (this.activeWordIndex === this.wordsThisRound.length){
                this.activeWordIndex = 0; // !actually here we need to notify app.js that there should be nextTurn()
            }
        }
    }

    shuffleWordsThisRound(){
        this.wordsThisRound = this.shuffleArray(this.wordsThisRound);
    }

    shuffleWordPool(){
        this.wordPool = this.shuffleArray(this.wordPool);
    }

    shuffleArray(a){
        for (let i=0;i<a.length;i++){
            let j = Math.floor(Math.random() * a.length);
            let e1 = a[i];
            let e2 = a[j];
            a[i] = e2;
            a[j] = e1;
        }
        return a;
    }

    addWords(newWords){
        this.wordPool = this.wordPool.concat(newWords)
    }

    setPhase(phase){
        this.phase = phase;
    }

    getPhase(){
        return this.phase
    }

    getActivePlayer() {
        return this.activePlayer;
    }

    getActiveWord(){
        return this.wordsThisRound[this.activeWordIndex];
    }
}

module.exports = AlextivityGame;