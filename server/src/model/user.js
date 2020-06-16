class User
{
    id;
    socket;
    name;
    room;
    submittedWords;
    team;

    constructor(id, socket){
        this.type = "User";
        this.id = id;
        this.name = "#" + id;
        this.socket = socket;
    }
}

module.exports = User;