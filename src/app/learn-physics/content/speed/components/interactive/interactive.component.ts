import { Component, OnInit } from '@angular/core';

import { InteractiveSketch } from '../../../../../core/sketches/speed/interactive/interactive-sketch';
import { BehaviorSubject } from 'rxjs';

declare const p5: any;

@Component({
  selector: 'pf-interactive',
  templateUrl: './interactive.component.html',
  styleUrls: ['./interactive.component.scss']
})
export class InteractiveComponent implements OnInit {

  sketch: any;
  car1Speed$: BehaviorSubject<number> = new BehaviorSubject(50);
  car2Speed$: BehaviorSubject<number> = new BehaviorSubject(50);

  constructor() { }

  ngOnInit() {
    this.sketch = new p5(p => InteractiveSketch(p, this.car1Speed$, this.car2Speed$));
  }

  onCar2SpeedChange(speed): void {
    this.car2Speed$.next(speed);
  }

  onCar1SpeedChange(speed): void {
    this.car1Speed$.next(speed);
  }
}
