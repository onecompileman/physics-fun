import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { FlappyBirdSketch } from 'src/app/core/sketches/intro/games/flappy-bird-sketch';

declare const p5: any;

@Component({
  selector: 'pf-flappy-bird',
  templateUrl: './flappy-bird.component.html',
  styleUrls: ['./flappy-bird.component.scss']
})
export class FlappyBirdComponent implements OnInit, OnDestroy {

  @Output() completed = new EventEmitter();

  sketch: any;
  score$: BehaviorSubject<number> = new BehaviorSubject(0);
  score = 0;
  scoreSubscription: Subscription;
  tasks1Complete = false;
  tasks2Complete = false;
  tasks3Complete = false;

  constructor() { }

  ngOnInit() {
    this.sketch = new p5(p => FlappyBirdSketch(p, this.score$));
    this.checkScoreCompletion();
  }

  ngOnDestroy(): void {
    this.scoreSubscription.unsubscribe();
  }

  private checkScoreCompletion(): void {
    this.scoreSubscription = this.score$.subscribe((score) => {
      this.score = score;
      if (!this.tasks3Complete) {
        this.checkTaskCompletion(score);
      }
    });
  }

  private checkTaskCompletion(score: number): void {
    this.tasks1Complete = score >= 1;
    this.tasks2Complete = score >= 3;
    this.tasks3Complete = score >= 5;
    if (score >= 5) {
      this.completeGame();
    }
  }

  private completeGame() {
    this.completed.emit(true);
  }
}
