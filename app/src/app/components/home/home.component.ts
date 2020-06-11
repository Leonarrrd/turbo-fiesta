import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  constructor(private roomService: RoomService) { }

  get room(){
    return this.roomService.room;
  }

  ngOnInit(): void {  }
}
