import { Injectable } from '@angular/core';
import { RoomService } from './room.service';
import { SocketOutService } from './socket-out.service';
import * as config from './../../../../common/constants/config';

@Injectable({
  providedIn: 'root'
})
export class AlextivityService {

  submittedWords: string[];
  countdown: number;
  activeWord: string;
  team: string;
  isMyTurn: boolean = false;
  private timeouts: any[] = [];

  constructor(private roomService: RoomService, private socketOutService: SocketOutService) { }

  get room(){
    return this.roomService.room;
  }

  assignTeam(teamColor: string){
    this.team = teamColor;
  }

  notYourTurn(){
    this.isMyTurn = false;
  }

  // TODO: weird fix
  yourTurn() {
    this.activeWord = undefined;
    this.isMyTurn = true;
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
    this.startCountdown(config.submitWordsTime);
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
