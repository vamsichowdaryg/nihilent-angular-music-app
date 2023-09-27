import { Component } from '@angular/core';
import { Music } from '../app.component';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MusicService } from '../music.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-music',
  templateUrl: './add-music.component.html',
  styleUrls: ['./add-music.component.scss']
})
export class AddMusicComponent {
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
  musicForm = this.fb.group({
    id: '1000',
    songname: ['', [Validators.required, Validators.minLength(5)]],
    releaseYear: ['', [Validators.required]],
    MostWatched: false,
    songrating: [0, [Validators.required, Validators.min(1), Validators.max(10)]],
    src: '',
    songlyrics: '',
    censorRating: ['', [Validators.required]],
    genres: [[], [Validators.required]],
    languages: [[], [Validators.required]],
    cast: this.fb.array([]),
    like: [0],
    dislike: [0],
    videosong: ['', [Validators.required, Validators.minLength(5), Validators.pattern("^http.*")]],
  });



  musiclist;
  constructor(private snackBar: MatSnackBar, private musicService: MusicService, private Router: Router, private fb: FormBuilder) {
    this.musiclist = musicService.getMusicList();
  }

  get songname() {
    return this.musicForm?.get('songname');
  }
  get videosong() {
    return this.musicForm?.get('videosong')
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
  addMusic() {
    if (this.musicForm.valid) {
      const newMusic = this.musicForm.value;
      console.log(newMusic);
      this.musicService.addMusic(newMusic as unknown as Music).subscribe(() => {
        this.snackBar.open('Place added successfully', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success'],
          verticalPosition: 'top',
          horizontalPosition: 'end',
        });
        this.Router.navigate(["/music"])
      })

    }
  }
}
