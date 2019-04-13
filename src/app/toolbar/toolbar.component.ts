import { SocketService } from './../socket.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  songName = new FormControl('');

  constructor(private router: Router, private socket: SocketService) { }

  ngOnInit() {
  }

  onHome() {
    console.log('THIS IS WORKING');
    this.router.navigate(['']);
  }

  onSubmit() {
    console.log(this.songName.value);
    this.socket.getSongs(this.songName.value);
    this.router.navigate(['search']);
  }

}
