import { Component, OnInit } from '@angular/core';
import { ChatService } from './services/chat.service';
import { RoomService } from './services/room.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'app';

  constructor(private chatService: ChatService, private roomService : RoomService){}

  ngOnInit(){
    this.chatService.init();
    this.roomService.init();
  }
}
