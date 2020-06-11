import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  socket: Socket;
  constructor(private s: Socket) {
    this.socket = s;
  }
}
