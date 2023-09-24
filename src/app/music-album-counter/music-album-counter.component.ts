import { Component } from '@angular/core';
import { Music } from '../app.component';
import { FormBuilder } from '@angular/forms';
import { Subscription, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { MusicService } from '../music.service';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-music-album-counter',
  templateUrl: './music-album-counter.component.html',
  styleUrls: ['./music-album-counter.component.scss']
})
export class MusicAlbumCounterComponent {
  musiclist: Array<Music> = [];
  getMusiclist: Subscription | any;

  searchForm = this.fb.group({
    search: '',
  })
  get search() {
    return this.searchForm.get('search');
  }
  constructor(private musicService: MusicService, private fb: FormBuilder) { }
  ngOnInit() {
    this.search?.valueChanges.pipe(debounceTime(1000), distinctUntilChanged(), switchMap((name) => this.musicService.searchMusicList(name || '')))
      .subscribe((mulist) => {
        this.musiclist = mulist;
      })
    this.loadMusicData();
  }
  loadMusicData() {
    this.getMusiclist = this.musicService
      .getMusicListFromMockAPI()
      .subscribe((muList: Music[]) => {
        this.musiclist = muList;
      });
  }

  ngOnDestroy() {
    // this.getMovielist.unSubscribe();
  }

  removemusic(idx: number) {
    console.log("del")

    this.musiclist.splice(idx, 1);
  }
}
