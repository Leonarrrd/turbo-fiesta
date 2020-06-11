import { Injectable } from '@angular/core';
import { SocketIoService } from './socket-io.service';
import { Room } from '../model/room';


@Injectable({
  providedIn: 'root'
})
export class RoomService {
  room: Room = new Room();

  get socket() {
    return this.socketService.socket;
  }

  constructor(private socketService: SocketIoService) { }

  init(): void {
    const self = this;
    this.socket.on('assignRoom', (roomId: number) => {
      self.room.id = roomId;
      this.socket.emit('requireRoomUpdate', roomId);
    });

    this.socket.on('roomUpdate', (room: Room) => {
      self.room.creator = room.creator;
      self.room.participants = room.participants;
    });
  }

  submitId(id: number): void {
    this.socket.emit('joinRoom', id);
  }

  createRoom(): void {
    this.socket.emit('createRoom');
  }

  requireUpdate(): void {
    this.socket.emit('requireRoomUpdate', this.room.id);
  }
}
