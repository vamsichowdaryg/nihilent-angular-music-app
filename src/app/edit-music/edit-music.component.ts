import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component } from '@angular/core';
import { Validators, FormBuilder, FormArray } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router, ActivatedRoute } from '@angular/router';
import { MusicService } from '../music.service';
import { Music } from '../app.component';

@Component({
  selector: 'app-edit-music',
  templateUrl: './edit-music.component.html',
  styleUrls: ['./edit-music.component.scss']
})
export class EditMusicComponent {
  separatorKeysCodes: number[] = [ENTER, COMMA];
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


  musicForm = this.fb.group({
    id: '1000',
    songname: ['', [Validators.required, Validators.minLength(5)]],
    releaseYear: ['', [Validators.required]],
    MostWatched: false,
    songrating: [0, [Validators.required, Validators.min(1), Validators.max(10)]],
    src: '',
    songlyrics: '',
    censorRating: ['', [Validators.required]],
    genres: [[" "], [Validators.required]],
    languages: [[" "], [Validators.required]],
    cast: this.fb.array([]),
    like: [0],
    dislike: [0],
    videosong: ['', [Validators.required, Validators.minLength(5), Validators.pattern("^http.*")]],
  });

  constructor(private musicService: MusicService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute) {
    const { id } = this.route.snapshot.params;
    this.id = id;
  }
  ngOnInit() {
    this.musicService.getMusicById(this.id).subscribe((mu) => {
      this.musicForm.patchValue(mu as Music)

      mu.cast.forEach((element: string) => {
        this.cast.push(this.fb.control(element))

      });
    });
  }
  get songlyrics() {
    return this.musicForm?.get('songlyrics')
  }
  get songrating() {
    return this.musicForm?.get('songrating')
  }
  get songname() {
    return this.musicForm?.get('name');
  }
  get videosong() {
    return this.musicForm?.get('trailer')
  }
  get censorRating() {
    return this.musicForm?.get('censorRating')
  }

  get cast() {
    return this.musicForm.get('cast') as FormArray;
  }
  addCastName(event: MatChipInputEvent) {
    const name = (event.value || '').trim();
    if (name) {
      this.cast.push(this.fb.control(name));
    }

    event.chipInput!.clear();
  }

  removeCastName(index: number) {
    this.cast.removeAt(index);
  }
  updatedMusic() {
    console.log(this.musicForm.status);

    if (this.musicForm.valid) {
      const updatedMusic = this.musicForm.value;
      console.log(updatedMusic);
      this.musicService.updateMusic(updatedMusic as Music).subscribe(() => {
        this.router.navigate(['/music']);
      })
    }
  }
}
