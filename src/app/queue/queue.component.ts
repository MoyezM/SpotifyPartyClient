import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {

  songResultName = []


  constructor(private socket: SocketService) {
    this.socket.getQueue();
    this.socket.onUpdateQueue$().subscribe((queue) => {
      this.songResultName = queue;
    });
  }

  ngOnInit() {
  }

}
