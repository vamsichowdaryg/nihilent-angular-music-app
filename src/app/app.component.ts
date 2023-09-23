import { Component } from '@angular/core';
type Music = {
  id: string,
  songname: string,
  releaseYear: string,
  MostWatched: boolean,
  songrating: number,
  src: string,
  songlyrics: string,
  censorRating: string,
  genres: [''],
  languages: [''],
  cast: [''],
  videosong: '',
  like: number,
  dislike: number
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
class AppComponent {
  title = ' ';

}

export { Music, AppComponent }
