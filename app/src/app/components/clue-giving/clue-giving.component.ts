import { Component, OnInit } from '@angular/core';
import { AlextivityService } from 'src/app/services/alextivity.service';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-clue-giving',
  templateUrl: './clue-giving.component.html',
  styleUrls: ['./clue-giving.component.scss']
})
export class ClueGivingComponent implements OnInit {

  constructor(private alextivityService: AlextivityService, private roomService: RoomService) { }

  get team(){
    return this.roomService.team;
  }

  get activeWord() {
    return this.alextivityService.activeWord;
  }

  get countdown() {
    return this.alextivityService.countdown;
  }

  ngOnInit(): void {
  }

  startTurn(){
    this.alextivityService.startTurn();
  }

  correctGuess(): void {
    this.alextivityService.correctGuess();
  }

  wrongGuess(): void {
    this.alextivityService.wrongGuess();
  }



}
