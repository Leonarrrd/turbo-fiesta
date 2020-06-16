import { Injectable } from '@angular/core';
import { SocketOutService } from './socket-out.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  chatMessages: string[] = ['Welcome to the Chat!', 'enter "!<name> to set your name.'];


  constructor(private socketOutService: SocketOutService) { }

  init(): void {
  }

  chatUpdate(msg: string){
    this.chatMessages.push(msg);
  }

  submitMessage(form: any): void {
    this.socketOutService.chatMessage(form.value.msg);
  }
}
