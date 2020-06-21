import { Injectable } from '@angular/core';
import { SocketOutService } from './socket-out.service';
import { Room } from '../model/room';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class RoomService {
  room: Room = new Room();
  roomChange: Subject<Room> = new Subject<Room>();

  constructor(private socketOutService: SocketOutService) {}

  roomUpdate(room: Room){
      this.room = room;
      this.roomChange.next(this.room);
  }

  assignRoom(roomId: number) {
      this.room.id = roomId;
      this.requireUpdate();
  }

  submitId(roomId: number): void {
    this.socketOutService.joinRoom(roomId);
  }

  createRoom(): void {
    this.socketOutService.createRoom();
  }

  startGame(): void {
    this.socketOutService.startPhaseSubmitWords();
  }

  requireUpdate(): void {
    this.socketOutService.requireRoomUpdate(this.room.id);
  }
}
