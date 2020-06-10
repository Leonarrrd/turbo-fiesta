import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SocketIoService } from 'src/app/services/socket-io.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  messageInput: string = '';
  gameId: number = null;
  gameParticipants: string[];
  chatMessages: string[] = ['Welcome to the Chat!', 'enter "!<name> to set your name.'];
  socket: Socket;

  constructor(private socketService: SocketIoService) { }

  // !leave this here for later reference
  // get leonard(){
  //   return this.socketService.leonard;
  // }

  ngOnInit(): void {
    const self = this;
    const socket = this.socketService.socket;

    socket.on('chatUpdate', (msg: string) => {
      self.chatMessages.push(msg);
    });

    socket.on('assignGame', (gameId: number) => {
      self.gameId = gameId;
      console.log(this.gameId);
      socket.emit('requireGameUpdate', gameId);
    });

    socket.on('gameUpdate', (gameParticipants: string[]) => {
      self.gameParticipants = gameParticipants;
    });
  }

  submitMessage(msg: string): void {
    this.socketService.socket.emit('chatMessage', msg);
    this.messageInput = '';
  }

  submitId(id: number): void {
    this.socketService.socket.emit('joinGame', id);
  }

  createGame(): void {
    this.socketService.socket.emit('createGame');
  }

  requireUpdate(): void {
    this.socketService.socket.emit('requireGameUpdate', this.gameId);
  }
}
