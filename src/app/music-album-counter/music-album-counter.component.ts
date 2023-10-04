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
  sortType: string = 'songname';
  order: string = 'asc';
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
        this.applySorting();
      })
    this.loadMusicData();
  }
  loadMusicData() {
    this.getMusiclist = this.musicService
      .getMusicListFromMockAPI()
      .subscribe((muList: Music[]) => {
        this.musiclist = muList;
        this.applySorting()
      });
  }
  show = true;
  toggle() {
    this.show = !this.show
  }


  onSortChange(event: MatSelectChange): void {
    this.sortType = event.value;
    this.applySorting(); // Apply sorting when sort type changes
  }

  onOrderChange(event: MatSelectChange): void {
    this.order = event.value;
    this.applySorting(); // Apply sorting when order changes
  }

  applySorting() {
    if (this.sortType && this.order) {
      // Implement sorting logic based on this.sortType and this.order
      this.musiclist.sort((a: Music, b: Music) => {
        const sortOrder = this.order === 'asc' ? 1 : -1;
        if (this.sortType === 'songname') {
          return a.songname.localeCompare(b.songname) * sortOrder;
        } else if (this.sortType === 'songrating') {
          return (a.songrating - b.songrating) * sortOrder;
        } else if (this.sortType === 'releasedYear') {
          // You might need to parse dates and compare them appropriately
          // Example:
          // return new Date(a.uploadedDate).getTime() - new Date(b.uploadedDate).getTime() * sortOrder;
        }
        return 0;
      });
    }
  }
  onLoadingChange(isLoading: boolean): void {
    this.isLoading = isLoading;
  }
  onNewItems(newItems: Music[]): void {
    if (newItems.length === 0) {
      this.musiclist = []; // Reset the list if an empty array is received
    } else {
      this.musiclist = [...this.musiclist, ...newItems];
      this.applySorting()
    }
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
