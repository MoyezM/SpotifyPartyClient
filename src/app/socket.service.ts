import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import * as Rx from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;

  // queue;

  constructor() {
    this.connect();
    this.onSongResult$().subscribe((result) => {
      console.log(result);
    });
    // this.onUpdateQueue$().subscribe((queue) => {
    //   this.queue = queue;
    // })
  }


  onSongResult$() {
    const observable = new Observable(observer => {
      this.socket.on('songResults', (songResults) => {
        observer.next(songResults);
      });
    });

    let observer =  {
      next: (songResults) => {
        return songResults;
      }
    };
    return Rx.Subject.create(observer, observable);
  }

  onUpdateQueue$() {
    const observable = new Observable(observer => {
      this.socket.on('queueUpdated', (queue) => {
        observer.next(queue);
      });
    });

    const observer =  {
      next: (queue) => {
        return queue;
      }
    };
    return Rx.Subject.create(observer, observable);
  }

  connect() {
    const url = window.location.host;
    const urlLength = url.length;
    let socketURL = url.slice(0, urlLength - 4);
    socketURL = socketURL + '8888/';
    this.socket = io(socketURL);
  }

  getSongs(songQuery) {
    this.socket.emit('getSong', songQuery);
  }

  addToQueue(song) {
    this.socket.emit('addToQueue', song);
  }

  vote(voteData) {
    this.socket.emit('vote', voteData);
  }

  getQueue() {
    this.socket.emit('getQueue');
  }
}
