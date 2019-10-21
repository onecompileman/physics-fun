import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import swal from 'sweetalert2';
import { FirstActivitySketch } from 'src/app/core/sketches/acceleration/actvities/first-activity-sketch';

declare const p5: any;

@Component({
  selector: 'pf-acceleration',
  templateUrl: './acceleration.component.html',
  styleUrls: ['./acceleration.component.scss']
})
export class AccelerationComponent implements OnInit {

  currentSlide = 1;
  acceleration1$: BehaviorSubject<number> = new BehaviorSubject(0);
  acceleration: number;
  isCheckingAnswer1: boolean;
  activitySketch1: any;

  constructor() { }

  ngOnInit() {
    this.initActivitySketch();
  }

  next(): void {
    this.currentSlide++;
  }

  back(): void {
    this.currentSlide--;
  }

  checkAnswer1(): void {
    this.isCheckingAnswer1 = true;
    this.acceleration1$.next(this.acceleration);
  }

  private initActivitySketch() {
    const self = this;
    const rightAnswerCallback = () => {
      swal.fire({
        type: 'success',
        title: 'Good Job!',
        text: 'Correct answer: 3 m/s 2',
      });
      self.isCheckingAnswer1 = false;
    };

    const wrongAnswerCallback = (topSpeed) => {
      swal.fire({
        type: 'error',
        title: 'Incorrect',
        text: `End Speed: ${topSpeed} km/h, should be : 82.4 km/h`,
      });
      self.isCheckingAnswer1 = false;
    };

    this.activitySketch1 = new p5(p => {
      return FirstActivitySketch(p, this.acceleration1$, rightAnswerCallback, wrongAnswerCallback);
    });
  }

}
