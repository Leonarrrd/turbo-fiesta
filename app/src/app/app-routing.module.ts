import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { SubmitWordsComponent } from './components/submit-words/submit-words.component';
import { GuessingComponent } from './components/guessing/guessing.component';
import { ClueGivingComponent } from './components/clue-giving/clue-giving.component';
import { ResultsComponent } from './components/results/results.component';
import { HomeNEWComponent } from './components/home-new/home-new.component';


const routes: Routes = [
  // { path: '', component: HomeNEWComponent },
  { path: '', component: HomeComponent },
  { path: 'lobby', component: LobbyComponent },
  { path: 'submitWords', component: SubmitWordsComponent },
  { path: 'guessing', component: GuessingComponent},
  { path: 'clueGiving', component: ClueGivingComponent},
  { path: 'results', component: ResultsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
