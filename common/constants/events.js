module.exports = {
    // on
    CONNECTION: 'connection',
    CHATMESSAGE: 'chatMessage',
    CREATEROOM: 'createRoom',
    JOINROOM: 'joinRoom',
    REQUIREROOMUPDATE: 'requireRoomUpdate',
    STARTPHASESUBMITWORDS: 'startPhaseSubmitWords',
    SUBMITTEDWORDS: 'submittedWords',
    STARTTURN: 'startTurn',
    CORRECTGUESS: 'correctGuess',
    WRONGGUESS: 'wrongGuess',
    
    // broadcast
    CHATUPDATE: 'chatUpdate',

    // unicast
    NEWWORD: 'newWord',
    ASSIGNROOM: 'assignRoom',
    ASSIGNTEAM: 'assignTeam',
    YOURTURN: 'yourTurn',
    NOTYOURTURN: 'notYourTurn',

    // cast to room
    ROOMUPDATE: 'roomUpdate',
    TIMESUPSUBMITWORDS: 'timesUpSubmitWords',
    TURNSTARTED: 'turnStarted',
    CLEARCOUNTDOWN: 'clearCountdown',
}
