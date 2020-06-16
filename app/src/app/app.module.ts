import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { NgModule } from '@angular/core';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import {AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { HomeComponent } from './components/home/home.component';
import { ChatComponent } from './components/chat/chat.component';
import { RoomselectComponent } from './components/roomselect/roomselect.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { SubmitWordsComponent } from './components/submit-words/submit-words.component';
import { ClueGivingComponent } from './components/clue-giving/clue-giving.component';
import { GuessingComponent } from './components/guessing/guessing.component';
import { ResultsComponent } from './components/results/results.component';
const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChatComponent,
    RoomselectComponent,
    LobbyComponent,
    SubmitWordsComponent,
    ClueGivingComponent,
    GuessingComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
