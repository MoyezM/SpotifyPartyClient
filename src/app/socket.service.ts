import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;

  constructor() {
    this.connect();
  }

  connect() {
    console.log(window.location.host);
    const url = window.location.host;
    const urlLength = url.length;
    console.log(urlLength)
    let socketURL = url.slice(0, urlLength - 4);
    socketURL = socketURL + '8888/';
    console.log(socketURL);

    this.socket = io(socketURL);
  }

  getSongs(songQuery) {
    this.socket.emit('getSong', songQuery)
  }
}
