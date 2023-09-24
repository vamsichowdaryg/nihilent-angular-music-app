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
    { label: 'Upbeat', value: 'UPBEAT' },
    { label: 'Mellow', value: 'MELLOW' },
    { label: 'Energetic', value: 'ENERGETIC' },
    { label: 'Soothing', value: 'SOOTHING' },
    { label: 'Melancholic', value: 'MELANCHOLIC' },
    { label: 'Lively', value: 'LIVELY' },
    { label: 'Calm', value: 'CALM' },
    { label: 'Romantic', value: 'ROMANTIC' },
    { label: 'Groovy', value: 'GROOVY' },
    { label: 'Experimental', value: 'EXPERIMENTAL' },
    { label: 'Uplifting', value: 'UPLIFTING' },
    { label: 'Sensual', value: 'SENSUAL' },
    { label: 'Jazzy', value: 'JAZZY' },
    { label: 'Funky', value: 'FUNKY' },
    { label: 'Soulful', value: 'SOULFUL' },
    { label: 'Chill', value: 'CHILL' },
  ];

  // You can use this 'genres' array to categorize music based on their melodic characteristics.

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
