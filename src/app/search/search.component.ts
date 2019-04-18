import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  songResults;

  constructor(private socket: SocketService) { }

  ngOnInit() {
    this.socket.onSongResult$().subscribe((results) => {
      this.songResults = results.map((song) => {
        const result = {
          song: song.name,
          artist: song.album.artists[0].name,
          uri: song.uri,
          votes: 0,
        };
        return result;
      });
    });
  }

  onClick(song) {
    this.socket.addToQueue(song);
    this.songResults = this.songResults.filter((songResult) => {
      if (songResult.song === song.song) {
        return false;
      } else {
        return true;
      }
    });
  }

}
