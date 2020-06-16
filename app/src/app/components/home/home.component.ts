import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  constructor(private roomService: RoomService, private router: Router) { }

  get room() {
    return this.roomService.room;
  }

  ngOnInit(): void {
    const self = this;
    this.roomService.roomChange.subscribe(room => {
      self.handleRoomUpdate();
    });
  }

  handleRoomUpdate(){
    if (!this.room.game){
      return;
    }
    let url;
    switch (this.room.game.phase){
      case 'submitWords':
        url = 'submitWords';
        break;
      case 'explain':
      case 'mime':
      case 'singleWord':
        url = this.roomService.isMyTurn ? 'clueGiving' : 'guessing';
        break;
      case 'results':
        url = 'results';
    }
    this.router.navigateByUrl(url);
  }
}
