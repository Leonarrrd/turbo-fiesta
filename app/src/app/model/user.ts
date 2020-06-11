import { Socket } from 'ngx-socket-io';

class User {
    id: number;
    name: string;
    socket: Socket;

    constructor(id: number, socket: Socket){
        this.id = id;
        this.socket = socket;
    }
}

module.exports = User;
