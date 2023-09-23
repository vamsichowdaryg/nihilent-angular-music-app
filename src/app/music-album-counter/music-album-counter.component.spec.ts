import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicAlbumCounterComponent } from './music-album-counter.component';

describe('MusicAlbumCounterComponent', () => {
  let component: MusicAlbumCounterComponent;
  let fixture: ComponentFixture<MusicAlbumCounterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MusicAlbumCounterComponent]
    });
    fixture = TestBed.createComponent(MusicAlbumCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
