import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { InteractiveSketch } from 'src/app/core/sketches/force/interactive/interactive-sketch';

declare const p5: any;

@Component({
  selector: 'pf-interactive-force',
  templateUrl: './interactive-force.component.html',
  styleUrls: ['./interactive-force.component.scss']
})
export class InteractiveForceComponent implements OnInit {

  sketch: any;
  mass = 1;
  gravity = 9.8;
  mass$: BehaviorSubject<number> = new BehaviorSubject(1);

  constructor() { }

  ngOnInit() {
    this.initSketch();
  }

  changeMass() {
    this.mass$.next(this.mass);
  }

  private initSketch() {
    this.sketch = new p5(p => InteractiveSketch(p, this.mass$));
  }

}
