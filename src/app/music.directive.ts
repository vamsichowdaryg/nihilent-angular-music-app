import { Music } from './app.component';
import { Directive, Output, EventEmitter, OnInit, Input, HostListener } from '@angular/core';
import { MusicService } from './music.service';
import { finalize } from 'rxjs';
@Directive({
  selector: '[appMusic]'
})
export class MusicDirective implements OnInit {
  @Output() items: EventEmitter<Music[]> = new EventEmitter();
  @Output() loading: EventEmitter<boolean> = new EventEmitter();
  // @Input() apiEndpoint: string;
  @Input() pageSize!: number;
  private _searchTerm!: string;
  private currentPage: number = 1;
  private isLoading: boolean = false;
  private hasMoreItems: boolean = true;
  private _order: string = 'asc';
  private _sortType: string = 'default';


  @Input()
  set sortType(type: string) {
    if (this._sortType !== type) {
      this._sortType = type;
      this.resetAndLoad();
    }
  }

  get sortType(): string {
    return this._sortType;
  }
  // @Input()
  // set searchTerm(term: string) {
  //   if (this._searchTerm !== term) {
  //     this._searchTerm = term;
  //     this.currentPage = 1;
  //     this.hasMoreItems = true; // Reset the flag when search term changes
  //     this.items.emit([]);
  //     this.loadMoreData();
  //   }
  // }

  // get searchTerm(): string {
  //   return this._searchTerm;
  // }

  constructor(private musicService: MusicService) { }
  ngOnInit(): void {
    this.resetAndLoad();
  }
  @Input()
  set searchTerm(term: string) {
    if (this._searchTerm !== term) {
      this._searchTerm = term;
      this.resetAndLoad();
    }
  }

  @Input()
  set order(value: string) {
    if (this._order !== value) {
      this._order = value;
      this.resetAndLoad();
    }
  }

  get order(): string {
    return this._order;
  }
  @HostListener('window:scroll')
  onScroll(): void {
    const isBottom =
      document.documentElement.scrollTop +
      document.documentElement.offsetHeight >=
      document.documentElement.scrollHeight - 100;
    if (isBottom && !this.isLoading && this.hasMoreItems) {
      this.loadMoreData();
    }
  }

  private resetAndLoad(): void {
    this.currentPage = 1;
    this.hasMoreItems = true;
    this.items.emit([]);
    this.loadMoreData();
  }

  private loadMoreData(): void {
    if (!this.hasMoreItems) return;

    this.isLoading = true;
    this.loading.emit(true);

    this.musicService
      .getMusicListPagination(
        this.currentPage,
        this.pageSize,
        this._searchTerm,
        this._sortType,
        this._order
      )
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.loading.emit(false);
        })
      )
      .subscribe((data) => {
        this.hasMoreItems = data.length >= this.pageSize;
        this.items.emit(data);
        this.currentPage++;
      });
  }
}
//   ngOnInit(): void {
//     this.loadInitialData();
//     this.listenForScroll();
//   }

//   private loadInitialData(): void {
//     this.loadMoreData();
//   }

//   private listenForScroll(): void {
//     window.addEventListener('scroll', () => {
//       const pos =
//         (document.documentElement.scrollTop || document.body.scrollTop) +
//         document.documentElement.offsetHeight;
//       const max = document.documentElement.scrollHeight;

//       if (pos >= max - 100 && !this.isLoading && this.hasMoreItems) {
//         this.loadMoreData();
//       }
//     });
//   }

//   private loadMoreData(): void {
//     if (!this.hasMoreItems) return; // Don't load more data if flag is false

//     this.isLoading = true;
//     this.loading.emit(this.isLoading);

//     this.musicService
//       .getMusicListPagination(this.currentPage, this.pageSize, this.searchTerm)
//       .subscribe((data) => {
//         if (data.length < this.pageSize) {
//           this.hasMoreItems = false; // Set flag to false if fewer items are returned
//         }
//         this.items.emit(data);
//         this.currentPage++;
//         this.isLoading = false;
//         this.loading.emit(this.isLoading);
//       });
//   }

// }
// import {
//   Directive,
//   Output,
//   EventEmitter,
//   OnInit,
//   Input,
//   HostListener,
// } from '@angular/core';
// import { MusicService } from './music.service';
// import { Music } from './app.component';
// import { finalize } from 'rxjs/operators';

// @Directive({
//   selector: '[appMusic]',
// })
// export class MusicDirective implements OnInit {
//   @Output() items = new EventEmitter<Music[]>();
//   @Output() loading = new EventEmitter<boolean>();
//   @Input() pageSize!: number;
//   private _searchTerm!: string;
//   private currentPage = 1;
//   private isLoading = false;
//   private hasMoreItems = true;
//   private _order: string = 'asc'; // asc or desc
//   private _sortType: string = 'default'; // default, title, or date

//   @Input()
//   set sortType(type: string) {
//     if (this._sortType !== type) {
//       this._sortType = type;
//       this.resetAndLoad();
//     }
//   }

//   get sortType(): string {
//     return this._sortType;
//   }

//   @Input()
//   set searchTerm(term: string) {
//     if (this._searchTerm !== term) {
//       this._searchTerm = term;
//       this.resetAndLoad();
//     }
//   }

//   @Input()
//   set order(value: string) {
//     if (this._order !== value) {
//       this._order = value;
//       this.resetAndLoad();
//     }
//   }

//   get order(): string {
//     return this._order;
//   }

//   constructor(private musicService: MusicService) { }

//   ngOnInit(): void {
//     this.resetAndLoad();
//   }

//   @HostListener('window:scroll')
//   onScroll(): void {
//     const isBottom =
//       document.documentElement.scrollTop +
//       document.documentElement.offsetHeight >=
//       document.documentElement.scrollHeight - 100;
//     if (isBottom && !this.isLoading && this.hasMoreItems) {
//       this.loadMoreData();
//     }
//   }

//   private resetAndLoad(): void {
//     this.currentPage = 1;
//     this.hasMoreItems = true;
//     this.items.emit([]);
//     this.loadMoreData();
//   }

//   private loadMoreData(): void {
//     if (!this.hasMoreItems) return;

//     this.isLoading = true;
//     this.loading.emit(true);

//     this.musicService
//       .getMusicListPagination(
//         this.currentPage,
//         this.pageSize,
//         this._searchTerm,
//         this._sortType,
//         this._order
//       )
//       .pipe(
//         finalize(() => {
//           this.isLoading = false;
//           this.loading.emit(false);
//         })
//       )
//       .subscribe((data) => {
//         this.hasMoreItems = data.length >= this.pageSize;
//         this.items.emit(data);
//         this.currentPage++;
//       });
//   }
// }