import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { InteractiveSketch } from 'src/app/core/sketches/ball-physics/interactive-sketch';

declare const p5: any;

@Component({
  selector: 'pf-interactive-ball',
  templateUrl: './interactive-ball.component.html',
  styleUrls: ['./interactive-ball.component.scss']
})
export class InteractiveBallComponent implements OnInit {

  sketch: any;
  elastic = 1;
  mass = 1;
  airDirection = 0;
  size = 50;
  elastic$: BehaviorSubject<number> = new BehaviorSubject(1);
  mass$: BehaviorSubject<number> = new BehaviorSubject(1);
  airDirection$: BehaviorSubject<number> = new BehaviorSubject(0);
  size$: BehaviorSubject<number> = new BehaviorSubject(50);

  constructor() { }

  ngOnInit() {
    this.initSketch();
  }

  changeElastic() {
    this.elastic$.next(this.elastic);
  }

  changeMass() {
    this.mass$.next(this.mass);
  }

  changeAirDirection() {
    this.airDirection$.next(this.airDirection);
  }

  changeSize() {
    this.size$.next(this.size);
  }

  private initSketch() {
    this.sketch = new p5(p => {
      return InteractiveSketch(p, this.elastic$, this.mass$, this.airDirection$, this.size$);
    });
  }

}
