import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import * as events from '../../../../common/constants/events';
import { ChatService } from './chat.service';
import { RoomService } from './room.service';
import { AlextivityService } from './alextivity.service';
import { Room } from './../model/Room';

@Injectable({
  providedIn: 'root'
})
export class SocketInService {

  constructor(
    private socket: Socket,
    private chatService: ChatService,
    private roomService: RoomService,
    private alextivityService: AlextivityService) {
  }

  init(): void {
    this.socket.on(events.CHATUPDATE, (msg: string) => {
        this.chatService.chatUpdate(msg);
    });

    this.socket.on(events.NEWWORD, (word: string) => {
      this.alextivityService.newWord(word);
    });

    this.socket.on(events.ASSIGNROOM, (roomId: number) => {
      this.roomService.assignRoom(roomId);
    });

    this.socket.on(events.ASSIGNTEAM, (teamColor: string) => {
      this.alextivityService.assignTeam(teamColor);
    });

    this.socket.on(events.YOURTURN, () => {
      this.alextivityService.yourTurn();
    });

    this.socket.on(events.NOTYOURTURN, () => {
      this.alextivityService.notYourTurn();
    });

    this.socket.on(events.ROOMUPDATE, (room: Room) => {
      this.roomService.roomUpdate(room);
    });

    this.socket.on(events.TIMESUPSUBMITWORDS, () => {
      this.alextivityService.timesUpSubmitWords();
    });

    this.socket.on(events.TURNSTARTED, (turnSeconds: number) => {
      this.alextivityService.turnStarted(turnSeconds);
    });

    this.socket.on(events.CLEARCOUNTDOWN, ()=> {
      this.alextivityService.clearCountdown();
    });
  }
}
