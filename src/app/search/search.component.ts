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
      console.log(results);
      this.songResults = results.map((song) => {
        const result = {
          song: song.name,
          artist: song.album.artists[0].name,
          uri: song.uri
        };
        return result;
      });
      console.log(this.songResults);
    });
  }

  onClick(song) {
    this.socket.addToQueue(song);
    this.songResults = this.songResults.filter((songResult) => {
      console.log(songResult.song);
      console.log(song.song)
      if (songResult.song === song.song) {
        return false;
      } else {
        return true;
      }
    });
    console.log(this.songResults);
    console.log(song);
  }

}
