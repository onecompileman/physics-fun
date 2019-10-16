import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';

import { BubbleSketch } from 'src/app/core/sketches/intro/animations/bubble-sketch';
import { Bubble } from 'src/app/core/sketches/intro/animations/bubble';
import { BehaviorSubject, Subscription } from 'rxjs';
import { tap, map } from 'rxjs/operators';

declare const p5;
@Component({
  selector: 'pf-bubble',
  templateUrl: './bubble.component.html',
  styleUrls: ['./bubble.component.scss']
})
export class BubbleComponent implements OnInit, OnDestroy {

  @Output() completed = new EventEmitter();

  sketch: any;
  bubbles$: BehaviorSubject<Bubble[]> = new BehaviorSubject([]);
  bubbleCount = 0;
  bubbleSubscription: Subscription;
  tasks1Complete = false;
  tasks2Complete = false;
  tasks3Complete = false;

  constructor() { }

  ngOnInit() {
    this.sketch = new p5(p => BubbleSketch(p, this.bubbles$));
    this.checkBubbleCount();
  }

  ngOnDestroy(): void {
    this.bubbleSubscription.unsubscribe();
  }

  private checkBubbleCount(): void {
    this.bubbleSubscription = this.bubbles$.pipe(
      tap(bubbles => this.bubbleCount = bubbles.length),
      map(bubbles => bubbles.length)
    ).subscribe((bubbleCount) => {
      this.checkTaskCompletion(bubbleCount);
    });
  }

  private checkTaskCompletion(bubbleCount: number): void {
    this.tasks1Complete = bubbleCount >= 1;
    this.tasks2Complete = bubbleCount >= 10;
    this.tasks3Complete = bubbleCount >= 20;
    if (bubbleCount >= 20) {
      this.completeBubbles();
    }
  }

  private completeBubbles() {
    this.completed.emit(true);
  }
}
