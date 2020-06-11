import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-roomselect',
  templateUrl: './roomselect.component.html',
  styleUrls: ['./roomselect.component.scss']
})
export class RoomselectComponent implements OnInit {

  constructor(private roomService: RoomService) { }

  get room(){
    return this.roomService.room;
  }

  ngOnInit(): void {
  }

  submitId(id: number): void {
    this.roomService.submitId(id);
  }

  createRoom(): void {
    this.roomService.createRoom();
  }

  requireUpdate(): void {
    this.roomService.requireUpdate();
  }

}
