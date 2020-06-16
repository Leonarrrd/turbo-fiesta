var Room = require('./Room.js');
const AlextivityGame = require("./AlextivityGame");
const User = require('./user.js');


class Session
{   
    roomIdCounter = 1;
    userIdCounter = 1;
    rooms = [];
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

    addRoom(room){
        this.rooms.push(room);
    }

    getRooms() {
        return this.rooms;
    }

    findRoomById(roomId){
        let foundRoom;
        this.rooms.forEach(function(room){
            if (room.id == roomId){
                foundRoom = room;
                room.id;
            }
        });
        return foundRoom;
    }

    findRoomOfUser(user){
        let foundRoom;
        this.rooms.forEach(function(room){
            room.participants.forEach(function(participant){
                if (participant.id == user.id) {
                    foundRoom = room;
                }
            })
        });
        return foundRoom;
    }

    
}

module.exports = Session;