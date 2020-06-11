import { Injectable } from '@angular/core';
import { SocketIoService } from './socket-io.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  chatMessages: string[] = ['Welcome to the Chat!', 'enter "!<name> to set your name.'];

  get socket(){
    return this.socketService.socket;
  }

  constructor(private socketService: SocketIoService) { }

  init(): void{
    const self = this;
    this.socket.on('chatUpdate', (msg: string) => {
      self.chatMessages.push(msg);
    });
  }

  submitMessage(form: any): void {
    this.socket.emit('chatMessage', form.value.msg);
  }


}
