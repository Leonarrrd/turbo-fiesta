import { Component, OnInit } from '@angular/core';
import { ChatService } from './services/chat.service';
import { RoomService } from './services/room.service';
import { AlextivityService } from './services/alextivity.service';
import { SocketInService } from './services/socket-in.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'app';

  constructor(private socketInService: SocketInService){}

  ngOnInit() {
    this.socketInService.init();
  }
}
