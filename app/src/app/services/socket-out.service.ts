import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import * as events from '../enum/events';

@Injectable({
  providedIn: 'root'
})
export class SocketOutService {

  constructor(private socket: Socket) {}

  chatMessage(msg: string) {
    this.socket.emit(events.CHATMESSAGE, msg);
  }

  createRoom() {
    this.socket.emit(events.CREATEROOM);
  }

  joinRoom(roomId: number) {
    this.socket.emit(events.JOINROOM, roomId);
  }

  requireRoomUpdate(roomId: number) {
    this.socket.emit(events.REQUIREROOMUPDATE);
  }

  startPhaseSubmitWords() {
    this.socket.emit(events.STARTPHASESUBMITWORDS);
  }

  submittedWords(words: string[]) {
    this.socket.emit(events.SUBMITTEDWORDS, words);
  }

  startTurn() {
    this.socket.emit(events.STARTTURN);
  }

  correctGuess() {
    this.socket.emit(events.CORRECTGUESS);
  }

  wrongGuess() {
    this.socket.emit(events.WRONGGUESS);
  }
}
