import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { AlextivityService } from 'src/app/services/alextivity.service';

@Component({
  selector: 'app-guessing',
  templateUrl: './guessing.component.html',
  styleUrls: ['./guessing.component.scss']
})
export class GuessingComponent implements OnInit {

  constructor(private roomService: RoomService, private alextivityService : AlextivityService) { }

  get room(){
    return this.roomService.room;
  }

  get team(){
    return this.roomService.team;
  }

  get countdown(){
    return this.alextivityService.countdown;
  }

  ngOnInit(): void {
  }

}
