import { Injectable } from '@angular/core';
import { RoomService } from './room.service';
import { AlextivityService } from './alextivity.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(private roomService: RoomService, private alextivityService: AlextivityService, private router: Router) { }

  get room() {
    return this.roomService.room;
  }

  init(): void {
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
        url = this.alextivityService.isMyTurn ? 'clueGiving' : 'guessing';
        break;
      case 'results':
        url = 'results';
    }
    this.router.navigateByUrl(url);
  }
}
