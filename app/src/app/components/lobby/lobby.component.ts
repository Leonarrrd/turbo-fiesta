import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

  constructor(private roomService: RoomService, private router: Router) { }

  get room(){
    return this.roomService.room;
  }

  ngOnInit(): void {
  }

  startGame(){
    this.roomService.startGame();
  }
}
