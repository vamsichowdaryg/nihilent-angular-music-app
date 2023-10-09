import { Component } from '@angular/core';
import { Music } from '../app.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { catchError, Subscription, debounceTime, distinctUntilChanged, switchMap, Observable, startWith, map } from 'rxjs';
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
  filteredOptions!: Observable<string[]>
  get search() {
    return this.searchForm.get('search');
  }
  constructor(private musicService: MusicService, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      search: '',
    });
  }
  ngOnInit() {
    this.filteredOptions = this.searchForm.get('search')!.valueChanges.pipe(
      startWith(''),
      debounceTime(1000), // Reduced debounce time for a more responsive search
      distinctUntilChanged(),
      switchMap((name) => {
        this.searchTerm = name;
        this.applySorting();
        return this.musicService.searchMusicList(name || '');
      }),
      map((mulist) => mulist.map((mu) => mu.songname))
    );
    // this.loadMusicData()
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
    this.applySorting();
  }

  onOrderChange(event: MatSelectChange): void {
    this.order = event.value;
    this.applySorting();
  }

  applySorting() {
    this.musiclist = this.musiclist.filter(music => {
      const matchesSearch = !this.searchTerm || music.songname.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesSearch;
    });
    if (this.sortType && this.order) {
      this.musiclist.sort((a: Music, b: Music) => {
        const sortOrder = this.order === 'asc' ? 1 : -1;
        if (this.sortType === 'songname') {
          return a.songname.localeCompare(b.songname) * sortOrder;
        } else if (this.sortType === 'songrating') {
          return (a.songrating - b.songrating) * sortOrder;
        } else if (this.sortType === 'releasedYear') {
        }
        return 0;
      });
    }
  }
  onLoadingChange(isLoading: boolean): void {
    this.isLoading = isLoading;
  }

  onNewItems(newItems: Music[]): void {
    const existingsongs = new Set(this.musiclist.map((mu) => mu.id))
    if (newItems.length === 0) {
      return;
    }
    const uniqueNewItems = newItems.filter(
      (newItem) => !existingsongs.has(newItem.id)
    );
    // const uniqueNewItems = newItems.filter(newItem => !this.musiclist.some(existingItem => existingItem.id === newItem.id));

    this.musiclist = [...this.musiclist, ...uniqueNewItems];
    this.applySorting();
  }

  removemusic(idx: number) {
    console.log("del")

    this.musiclist.splice(idx, 1);
  }

}
