const AlextivityGame = require('../model/AlextivityGame');
const ioController = require('./ioController');
const roomController = require('./roomController');

const config = {
    submitWordsTime: 5,
    turnTime: 10,
}

let timeout;

module.exports = {
    startPhaseSubmitWords: (room) => {
        room.game = new AlextivityGame();
        room.game.assignTeams(room.participants);
        ioController.assignTeam(room);
        room.game.setPhase("submitWords");
        roomController.sendRoomUpdate(room);
        console.log("Room with ID <" + room.id + "> has entered phase <" + room.game.phase + ">" );

        setTimeout(() => {
            ioController.timesUpSubmitWords(room);
        }, config.submitWordsTime * 1000);

        setTimeout(()=>{
            startPhase(room, 'explain');
        }, config.submitWordsTime * 1000 + 1000);
    },

    submittedWords: (user, words) => {
        if (words.length < 1 ){
            words = ['Magermilch', 'Pumuckl', 'Kiwi']; // sample words
        }
        user.submittedWords = words;
        user.room.game.addWords(words);
    },

    startTurn: (user) => {
        console.log("Turn Starting....");
        ioController.newWord(user.room.game.getActivePlayer(), user.room.game.getActiveWord()); // TODO: check if getActivePlayer is necessary
        ioController.turnStarted(user.room, config.turnTime);
        timeout = setTimeout(()=> {
            nextTurn(user.room);
        }, config.turnTime * 1000);
    },

    correctGuess: (user) => {
        let game = user.room.game;
        console.log("Word <" + game.getActiveWord() + "> was guessed correctly!");
        game.nextWord(true);
        if (game.wordsThisRound.length > 0) {
            sendNextWord(user.room);
        } else {
            console.log("All words guessed.");
            ioController.clearCountdown(user.room);
            ioController.notYourTurn(game.getActivePlayer());
            clearTimeout(timeout);
            switch (game.phase) { // oh god
                case 'explain':
                    startPhase(user.room, 'mime');
                    break;
                case 'mime':
                    startPhase(user.room, 'singleWord');
                    break;
                case 'singleWord':
                    startPhase(user.room, 'results');
                    break;
            }
        }
    },

    wrongGuess: (user) => {
        user.room.game.nextWord(false);
        sendNextWord(user.room);
    },
}

function nextTurn(room){
    ioController.notYourTurn(room.game.getActivePlayer());
    room.game.nextTurn();
    ioController.yourTurn(room.game.getActivePlayer());
    roomController.sendRoomUpdate(room);
}

function sendNextWord(room) {
    ioController.newWord(room.game.getActivePlayer(), room.game.getActiveWord());
    roomController.sendRoomUpdate(room);
}

function startPhase(room, phase){
    room.game.initNewRound();
    ioController.yourTurn(room.game.getActivePlayer());
    room.game.setPhase(phase);
    roomController.sendRoomUpdate(room);
    console.log(phase + ' Phase starting...');
}