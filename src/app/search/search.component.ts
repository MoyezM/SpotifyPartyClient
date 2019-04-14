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
        let result = {
          song: song.name,
          artist: song.album.artists[0].name,
          uri: song.uri
        };
        return result;
      });
      console.log(this.songResults);
    });
  }

  onClick(event) {
    console.log(event);
  }

}
