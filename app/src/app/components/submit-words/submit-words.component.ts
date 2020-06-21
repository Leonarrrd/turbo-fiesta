import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { Router } from '@angular/router';
import { AlextivityService } from 'src/app/services/alextivity.service';

@Component({
  selector: 'app-submit-words',
  templateUrl: './submit-words.component.html',
  styleUrls: ['./submit-words.component.scss']
})
export class SubmitWordsComponent implements OnInit {

  wordInput: string = '';

  constructor(private alextivityService: AlextivityService) { }

  get team(){
    return this.alextivityService.team;
  }

  get submittedWords(){
    return this.alextivityService.submittedWords;
  }

  get countdown(){
    return this.alextivityService.countdown;
  }

  ngOnInit(): void {
    this.alextivityService.startSubmitWords();
  }

  submitWord(form: any){
    this.alextivityService.submitWord(form.value.word);
    form.reset();
  }

  deleteWord(word: string){
    this.alextivityService.deleteWord(word);
  }
}
