import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Music } from '../app.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MusicService } from '../music.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, debounceTime, switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-music-page',
  templateUrl: './music-page.component.html',
  styleUrls: ['./music-page.component.scss']
})
export class MusicPageComponent {

  @Input() music: Music = {
    id: '',
    src: "",
    songname: "",
    songrating: 0,
    songlyrics: "",
    videosong: "",
    like: 0,
    dislike: 0,
    releaseYear: "",
    MostWatched: false,
    censorRating: "",
    genres: [''],
    languages: [''],
    cast: ['']
  }
  @Input() idx: number = 0;
  @Output() rmmovieidx = new EventEmitter<number>();
  likeSubject = new Subject<number>()
  dislikeSubject = new Subject<number>()
  musiclist: Object | undefined;
  constructor(private http: HttpClient, private dialog: MatDialog, private router: Router, private musicService: MusicService, private fb: FormBuilder) {
    this.likeSubject.pipe(debounceTime(1000), switchMap((count) => {
      this.music = { ...this.music, like: count };
      return this.musicService.updateMusic(this.music)
    })
    ).subscribe()
    this.dislikeSubject.pipe(debounceTime(1000), switchMap((count) => {
      this.music = { ...this.music, dislike: count };
      return this.musicService.updateMusic(this.music)
    })).subscribe()

  }
  musicForm = this.fb.group({
    id: '1000',
    songname: ['', [Validators.required, Validators.minLength(5)]],
    songrating: [0, [Validators.required, Validators.min(1), Validators.max(10)]],
    src: '',
    songlyrics: '',
    videosong: ['', [Validators.required, Validators.minLength(5), Validators.pattern("^http.*")]],
  })
  // deleteMusicById() {
  //   this.musicService.deleteMusicById(this.music.id).subscribe(() => {
  //     this.rmmovieidx.emit(this.idx);
  //   })

  // }
  show = true;
  toggle() {
    this.show = !this.show
  }

  gotoMusicDetail() {
    this.router.navigate([`/music/${this.music.id}`]);
  }
  updatedMusic() {
    // this.router.navigate([`/edit/${this.music.id}`])
    this.router.navigate(['/music/edit', this.music.id])
  }
  updateLike(count: number) {
    // console.log(this.movie)
    // this.movie = { ...this.movie, like: count }
    // this.musicService.updateMovie(this.movie).subscribe()
    this.likeSubject.next(count)
  }
  updateDislike(count1: number) {
    // this.movie = { ...this.movie, dislike: count1 }
    // this.musicService.updateMovie(this.movie).subscribe()
    this.dislikeSubject.next(count1)
  }
  openConfirmDialog() {
    return this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '450px',
      data: { message: 'Are you sure you want to delete this movie?' },
    });
  }

  // Delete -> Refresh data
  deleteMusic() {
    this.openConfirmDialog()
      .afterClosed()
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.performDelete();
        }
      });
  }

  performDelete() {
    this.musicService.deleteMusicById(this.music.id).subscribe(() => {
      console.log('Movie deleted successfully');
      this.rmmovieidx.emit();
    });
  }

}