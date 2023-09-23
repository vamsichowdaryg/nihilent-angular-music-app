import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-like-dislike-counter',
  templateUrl: './like-dislike-counter.component.html',
  styleUrls: ['./like-dislike-counter.component.scss']
})
export class LikeDislikeCounterComponent {
  @Input() count = 0;
  @Input() count1 = 0;
  @Output() LikeCount = new EventEmitter<number>()
  @Output() DislikeCount = new EventEmitter<number>()
  get awesome() {
    return this.count - this.count1 >= 10;
  }
  Increment() {
    console.log("like is clicked 👍");
    this.count++;
    this.LikeCount.emit(this.count)
  }
  Decrement() {
    console.log("Dislike is clicked 👍");
    this.count1++;
    this.DislikeCount.emit(this.count1)
  }
}
