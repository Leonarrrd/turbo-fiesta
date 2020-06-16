const ioController = require('./ioController');
const roomController = require('./roomController');

module.exports = {
    newMessage: (user, message) => {
        switch(message.charAt(0)){
            case "!":
                let previousName = user.name;
                user.name = message.substring(1);
                ioController.chatUpdate('<' + previousName + '> changed his name to: <' + user.name + '>');
                if (user.room) {
                    roomController.sendRoomUpdate(user.room);
                }
                break;
            default:
                ioController.chatUpdate(message);
        }
    }
}