import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeDislikeCounterComponent } from './like-dislike-counter.component';

describe('LikeDislikeCounterComponent', () => {
  let component: LikeDislikeCounterComponent;
  let fixture: ComponentFixture<LikeDislikeCounterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LikeDislikeCounterComponent]
    });
    fixture = TestBed.createComponent(LikeDislikeCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
