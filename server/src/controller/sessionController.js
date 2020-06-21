const Session = require("../model/session");
const Room = require("../model/room");
const User = require("./../model/User");
const ioController = require('./ioController');


let session = new Session();

module.exports = {
    newUser: (socket) => {
        let user = new User(session.userIdCounter, socket);
        session.userIdCounter++;
        session.addUser(user);
        return user;
    },

    createRoom: (user) => {
        if (user.room) {
            user.room.removeParticipant(user);
            ioController.roomUpdate(user.room);
        }
        let room = new Room(session.roomIdCounter, user);
        session.addRoom(room);
        session.roomIdCounter++;
        user.room = room;
        ioController.assignRoom(user, room.id)
        console.log("New Room created by User <" + user.name +"> with ID <" + room.id + ">");
    },

    joinRoom: (user, roomId) => {
        let room = session.findRoomById(roomId);
        if (!room){
            return;
        }
        if (!user.room || !room.getParticipants().filter(e => e.id == user.id).length > 0) {
          room.addParticipant(user);
          user.room = room;
          ioController.assignRoom(user, room.id);
          console.log("User <" + user.name + "> entered the Room with ID " + "<" + roomId + ">");
        }
    }
}