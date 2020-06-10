class Session
{
    // games: Game[];
    // users: User[]
    games = [];
    users = [];

    constructor(){
        this.type = "Session";
    }

    getUsers() {
        return this.users;
    }

    addUser(user){
        this.users.push(user);
    }

    getGames() {
        return this.games;
    }

    getGameById(gameId){
        let foundGame;
        this.games.forEach(function(game){
            if (game.id == gameId){
                foundGame = game;
            }
        });
        return foundGame;
    }

    findGameofUser(user){
        let foundGame;
        this.games.forEach(function(game){
            game.participants.forEach(function(participant){
                if (participant.id == user.id) {
                    foundGame = game;
                }
            })
        });
        return foundGame;
    }

    addGame(game){
        this.games.push(game)
    }
}

module.exports = Session;