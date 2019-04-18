import { VotingService } from './../voting.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {

  songResultName = [];
  votedSongsHash = {};

  constructor(private socket: SocketService, private vote: VotingService) {
    this.socket.getQueue();
    this.socket.onUpdateQueue$().subscribe((queue) => {
      console.log(queue);
      this.songResultName = queue;
    });
    this.votedSongsHash =  this.vote.votedSongsHash;
  }

  ngOnInit() {
  }

  onUpvote(song) {
    this.vote.onUpvote(song);
    this.votedSongsHash = this.vote.votedSongsHash;
  }

  onDownvote(song) {
    this.vote.onDownvote(song);
    this.votedSongsHash = this.vote.votedSongsHash;
   }
}
