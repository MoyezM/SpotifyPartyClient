import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class VotingService {

  votedSongsHash = {}

  constructor(private socket: SocketService) { }

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
      this.socket.vote({
        uri: song.uri,
        vote: 1,
      });
    }
    console.log(this.votedSongsHash);
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
            vote:  1,
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
      this.socket.vote({
        uri: song.uri,
        vote:  -1,
      });
    }
    console.log(this.votedSongsHash);
   }
}
