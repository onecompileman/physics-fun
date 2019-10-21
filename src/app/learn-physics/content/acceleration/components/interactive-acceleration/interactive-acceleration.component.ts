import { Component, OnInit } from '@angular/core';

import { InteractiveSketch } from '../../../../../core/sketches/acceleration/interactive/interactive-sketch';
import { BehaviorSubject } from 'rxjs';

declare const p5: any;

@Component({
  selector: 'pf-interactive-acceleration',
  templateUrl: './interactive-acceleration.component.html',
  styleUrls: ['./interactive-acceleration.component.scss']
})
export class InteractiveAccelerationComponent implements OnInit {

  sketch: any;
  car1Speed$: BehaviorSubject<number> = new BehaviorSubject(20);
  car2Speed$: BehaviorSubject<number> = new BehaviorSubject(20);
  car1Acceleration$: BehaviorSubject<number> = new BehaviorSubject(1);
  car2Acceleration$: BehaviorSubject<number> = new BehaviorSubject(1);
  car1TopSpeed$: BehaviorSubject<number> = new BehaviorSubject(100);
  car2TopSpeed$: BehaviorSubject<number> = new BehaviorSubject(100);

  constructor() { }

  ngOnInit() {
    this.sketch = new p5(p => {
      p.disableFriendlyErrors = true;
      return InteractiveSketch(
        p,
        this.car1Speed$,
        this.car2Speed$,
        this.car1Acceleration$,
        this.car2Acceleration$,
        this.car1TopSpeed$,
        this.car2TopSpeed$
      );
    });
  }

  onCar2SpeedChange(speed: number): void {
    this.car2Speed$.next(speed);
  }

  onCar1SpeedChange(speed: number): void {
    this.car1Speed$.next(speed);
  }
  onCar2AccelerationChange(acceleration: number): void {
    this.car2Acceleration$.next(acceleration);
  }

  onCar1AccelerationChange(acceleration: number): void {
    this.car1Acceleration$.next(acceleration);
  }
  onCar2TopSpeedChange(topSpeed: number): void {
    this.car2TopSpeed$.next(topSpeed);
  }

  onCar1TopSpeedChange(topSpeed: number): void {
    this.car1TopSpeed$.next(topSpeed);
  }

}
