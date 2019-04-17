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
          this.socket.vote({
            uri: song.uri,
            vote:  -1,
          });
          break;
        }
        case 0: {
          this.votedSongsHash[song.uri] = 1;
          this.socket.vote({
            uri: song.uri,
            vote:  1,
          });
          break;
        }
        case -1: {
          this.votedSongsHash[song.uri] = 1;
          this.socket.vote({
            uri: song.uri,
            vote:  2,
          });
          break;
        }
      }
    } else {
      this.votedSongsHash[song.uri] = 1;
    }
    console.log(this.votedSongsHash);

    this.socket.vote({
      uri: song.uri,
      vote:  this.votedSongsHash[song.uri],
    });

  }

  onDownvote(song) {
    if (this.votedSongsHash[song.uri]) {
      switch (this.votedSongsHash[song.uri]) {
        case 1: {
          this.votedSongsHash[song.uri] = -1;
          this.socket.vote({
            uri: song.uri,
            vote:  -2,
          });
          break;
        }
        case 0: {
          this.votedSongsHash[song.uri] = -1;
          this.socket.vote({
            uri: song.uri,
            vote:  -1,
          });
          break;
        }
        case -1: {
          this.votedSongsHash[song.uri] = 0;
          this.socket.vote({
            uri: song.uri,
            vote:  1,
          });
          break;
        }
      }
    } else {
      this.votedSongsHash[song.uri] = -1;
    }
    console.log(this.votedSongsHash);
   }
}
