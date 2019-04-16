import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {

  songResultName = [];

  constructor(private socket: SocketService) {
    this.socket.getQueue();
    this.socket.onUpdateQueue$().subscribe((queue) => {
      console.log(queue);
      this.songResultName = queue;
    });
  }

  ngOnInit() {
  }

  votedSongsHash = {}

  onUpvote(song) {
    if (this.votedSongsHash[song.uri]) {
      switch (this.votedSongsHash[song.uri]) {
        case 1: {
          this.votedSongsHash[song.uri] = 0;
          break;
        }
        case 0: {
          this.votedSongsHash[song.uri] = 1;
          break;
        }
        case -1: {
          this.votedSongsHash[song.uri] = 1;
        }
      }
    } else {
      this.votedSongsHash[song.uri] = 1;
    }
    console.log(this.votedSongsHash);


  }

  onDownvote(song) {
    if (this.votedSongsHash[song.uri]) {
      switch (this.votedSongsHash[song.uri]) {
        case 1: {
          this.votedSongsHash[song.uri] = -1;
          break;
        }
        case 0: {
          this.votedSongsHash[song.uri] = -1;
          break;
        }
        case -1: {
          this.votedSongsHash[song.uri] = 0;
        }
      }
    } else {
      this.votedSongsHash[song.uri] = -1;
    }
    console.log(this.votedSongsHash);

  }

}
