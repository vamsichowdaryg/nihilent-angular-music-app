import { Component } from '@angular/core';
import { Music } from '../app.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError, Subscription, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { MusicService } from '../music.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-music-album-counter',
  templateUrl: './music-album-counter.component.html',
  styleUrls: ['./music-album-counter.component.scss']
})
export class MusicAlbumCounterComponent {
  musiclist: Array<Music> = [];
  getMusiclist: Subscription | any;
  isLoading: boolean = false;
  searchTerm!: string;

  searchForm: FormGroup;
  sortType: string = 'default';
  order: string = '';
  previousSearches: string[] = [];
  get search() {
    return this.searchForm.get('search');
  }
  constructor(private musicService: MusicService, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      search: '',
    });
  }
  ngOnInit() {
    this.searchForm.get('search')?.valueChanges.pipe(debounceTime(1000),
      distinctUntilChanged(),
      switchMap((name) => this.musicService.searchMusicList(name || '')))
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
  onNewItems(newItems: Music[]): void {
    // if (newItems.length === 0) {
    //   this.musiclist = []; // Reset the list if an empty array is received
    // } else {
    this.musiclist = [...this.musiclist, ...newItems];
    // }
  }
  onSortChange(event: MatSelectChange): void {
    this.sortType = event.value;
  }
  show = true;
  toggle() {
    this.show = !this.show
  }

  onOrderChange(event: MatSelectChange): void {
    this.order = event.value;
  }
  onLoadingChange(isLoading: boolean): void {
    this.isLoading = isLoading;
  }
  ngOnDestroy() {
    // this.getMovielist.unSubscribe();
  }

  removemusic(idx: number) {
    console.log("del")

    this.musiclist.splice(idx, 1);
  }
  // clearSearch() {
  //   const searchValue = this.searchForm.get('search')?.value;
  //   if (searchValue) {
  //     this.previousSearches.push(searchValue);
  //   }
  //   this.searchForm.get('search')?.setValue('')
  // }
  // removemusic(music: Music, idx: number) {
  //   const deletedMusic = this.musiclist[idx];
  //   this.musiclist.splice(idx, 1);

  //   this.musicService.deleteMusicById(music.id).subscribe(
  //     () => {
  //       console.log('Song deleted successfully');
  //     },
  //     (error) => {
  //       this.musiclist.splice(idx, 0, deletedMusic);
  //       console.error('Delete failed, restoring song', error);
  //     }
  //   );
  // }
}
