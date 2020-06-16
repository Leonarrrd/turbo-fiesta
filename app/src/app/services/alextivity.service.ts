import { Injectable } from '@angular/core';
import { RoomService } from './room.service';
import { SocketOutService } from './socket-out.service';

@Injectable({
  providedIn: 'root'
})
export class AlextivityService {

  submittedWords: string[];
  countdown: number;
  activeWord: string;
  private timeouts: any[] = [];

  constructor(private roomService: RoomService, private socketOutService: SocketOutService) { }

  get room(){
    return this.roomService.room;
  }

  // TODO: weird fix
  yourTurn() {
    this.activeWord = undefined;
  }

  newWord(word: string) {
    this.activeWord = word;
  }

  turnStarted(turnSeconds: number) {
    this.startCountdown(turnSeconds);
  }

  timesUpSubmitWords() {
    this.socketOutService.submittedWords(this.submittedWords);
  }

  startTurn() {
    this.socketOutService.startTurn();
  }

  correctGuess(){
    this.socketOutService.correctGuess();
  }

  wrongGuess(){
    this.socketOutService.wrongGuess();
  }

  submitWord(word: string){
    if (this.submittedWords.length > 2){
      // return some signal that the thing didnt work
      return;
    }
    this.submittedWords.push(word);
  }

  deleteWord(word: string){
    this.submittedWords.splice(this.submittedWords.indexOf(word), 1);
  }

  startSubmitWords(){
    this.submittedWords = [];
    this.startCountdown(1);
  }

  startCountdown(seconds: number){
    this.countdown = seconds;
    for (let i = 1; i <= seconds; i++){
      this.timeouts.push(setTimeout(() => {
        this.countdown--;
      }, i * 1000));
    }
  }

  clearCountdown() {
    this.timeouts.forEach((timeout) => {
      clearTimeout(timeout);
      }
    );
    this.countdown = 0;
  }
}
