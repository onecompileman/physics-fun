import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { InteractiveSketch } from 'src/app/core/sketches/vectors/interactive/interactive-sketch';

declare const p5: any;

@Component({
  selector: 'pf-interactive-vectors',
  templateUrl: './interactive-vectors.component.html',
  styleUrls: ['./interactive-vectors.component.scss']
})
export class InteractiveVectorsComponent implements OnInit {


  sketch: any;
  play$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  reset$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() { }

  ngOnInit() {
    this.initSketch();
  }

  play() {
    this.play$.next(true);
  }

  reset() {
    this.reset$.next(true);
  }


  private initSketch(): void {
    this.sketch = new p5(p => InteractiveSketch(p, this.play$, this.reset$));
  }

}
