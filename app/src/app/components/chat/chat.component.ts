import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  get chatMessages(){
    return this.chatService.chatMessages;
  }

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
  }

  submitMessage(form: any): void {
    this.chatService.submitMessage(form);
    form.reset();
  }

}
