import { Component, OnInit } from '@angular/core';
import { FirstActivitySketch } from 'src/app/core/sketches/vectors/activities/first-activity-sketch';
import { Subject, Subscription } from 'rxjs';
import swal from 'sweetalert2';
import { map } from 'rxjs/operators';

declare const p5: any;

@Component({
  selector: 'pf-vectors',
  templateUrl: './vectors.component.html',
  styleUrls: ['./vectors.component.scss']
})
export class VectorsComponent implements OnInit {

  currentSlide = 1;
  activitySketch1: any;
  isCheckingAnswer1: boolean;
  x: number;
  y: number;
  p5: any;
  destinationVector: any;
  currentVector: any;
  destinationVector$: Subject<any> = new Subject();
  currentVector$: Subject<any> = new Subject();
  answer$: Subject<any> = new Subject();
  subscriptions: Subscription[] = [];

  constructor() { }

  ngOnInit() {
    this.initSketch1();
    this.getCurrentVector();
    this.getDestinationVector();
  }

  next() {
    this.currentSlide++;
  }

  back() {
    this.currentSlide--;
  }

  checkAnswer() {
    this.isCheckingAnswer1 = true;
    this.answer$.next(this.p5.createVector(this.x, this.y));
  }

  private getCurrentVector() {
    this.currentVector$.pipe(
      map(this.roundOffCoordinates)
    ).subscribe(currentVector => this.currentVector = currentVector);
  }

  private getDestinationVector() {
    this.destinationVector$.pipe(
      map(this.roundOffCoordinates)
    ).subscribe(destinationVector => this.destinationVector = destinationVector);
  }

  private roundOffCoordinates({ x, y }): any {
    return { x: Math.round(x), y: Math.round(y) };
  }

  private initSketch1() {
    const rightAnswerCallback = (correctAnswer) => {
      this.isCheckingAnswer1 = false;
      this.x = 0;
      this.y = 0;
      swal.fire({
        type: 'success',
        title: 'Good Job!',
        text: `Correct answer: (${correctAnswer.x}, ${correctAnswer.y})`,
      });
    };
    const wrongAnswerCallback = () => {
      this.isCheckingAnswer1 = false;
      swal.fire({
        type: 'error',
        title: 'Incorrect',
        text: 'The ship must reached the point!',
      });
    };

    const completedAnswerCallback = () => {
      this.isCheckingAnswer1 = false;
      swal.fire({
        type: 'success',
        title: 'Good Job!',
        text: 'Congratulations you have help the pirate ship reached the treasure island!',
      });
    };

    this.activitySketch1 = new p5(p => {
      this.p5 = p;
      return FirstActivitySketch(
        p,
        this.answer$,
        this.currentVector$,
        this.destinationVector$,
        rightAnswerCallback,
        wrongAnswerCallback,
        completedAnswerCallback
      );
    });
  }

}
