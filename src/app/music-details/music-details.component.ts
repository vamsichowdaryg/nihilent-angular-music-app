import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MusicService } from '../music.service';

@Component({
  selector: 'app-music-details',
  templateUrl: './music-details.component.html',
  styleUrls: ['./music-details.component.scss']
})
export class MusicDetailsComponent {
  genres = [
    { label: 'Action', value: 'ACTION' },
    { label: 'Adventure', value: 'ADVENTURE' },
    { label: 'Animation', value: 'ANIMATION' },
    { label: 'Comedy', value: 'COMEDY' },
    { label: 'Crime', value: 'CRIME' },
    { label: 'Drama', value: 'DRAMA' },
    { label: 'Fantasy', value: 'FANTASY' },
    { label: 'Historical', value: 'HISTORICAL' },
    { label: 'Horror', value: 'HORROR' },
    { label: 'Musical', value: 'MUSICAL' },
    { label: 'Mystery', value: 'MYSTERY' },
    { label: 'Romance', value: 'ROMANCE' },
    { label: 'Science Fiction', value: 'SCI_FI' },
    { label: 'Thriller', value: 'THRILLER' },
    { label: 'War', value: 'WAR' },
    { label: 'Western', value: 'WESTERN' },
  ];
  languages = [
    { label: 'English', value: 'EN' },
    { label: 'Hindi', value: 'HI' },
    { label: 'Bengali', value: 'BN' },
    { label: 'Telugu', value: 'TE' },
    { label: 'Marathi', value: 'MR' },
    { label: 'Kannada', value: 'KN' },
    { label: 'Gujarati', value: 'GU' },
    { label: 'Malayalam', value: 'ML' },
    { label: 'Tamil', value: 'TA' },
  ];
  id: string = '';
  music: any;
  constructor(private router: ActivatedRoute, private musicservice: MusicService, private sanitizer: DomSanitizer) {
    const { id } = this.router.snapshot.params;
    this.id = id;
    // this.movie = movieservice.getMovieList().find((movie) => movie.id == this.id)
    // this.movie.trailer = this.sanitizer.bypassSecurityTrustResourceUrl(
    //   this.movie.trailer);
  }
  ngOnInit() {
    this.musicservice.getMusicById(this.id).subscribe((mu: any) => {
      this.music = mu;
      this.music.videosong = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.music.videosong);
    })
  }
  getLabelLanguages(music: any) {
    return music.languages?.map(
      (lang: string) => this.languages.find((data) => data.value === lang)?.label
    );
  }

  getLabelGenres(music: any) {
    return music.genres?.map(
      (lang: string) => this.genres.find((data) => data.value === lang)?.label
    );
  }
  show = true;
  toggle() {
    this.show = !this.show
  }
}
