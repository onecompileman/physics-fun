import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirstActivitySketch } from 'src/app/core/sketches/speed/activities/first-activity-sketch';
import { BehaviorSubject, Subscription } from 'rxjs';
import { GameProgressService } from 'src/app/core/services/game-progress.service';
import { GameProgress } from 'src/app/shared/models/game-progress.model';
import swal from 'sweetalert2';
import { SecondActivitySketch } from 'src/app/core/sketches/speed/activities/second-activity-sketch';

declare const p5: any;

@Component({
  selector: 'pf-speed',
  templateUrl: './speed.component.html',
  styleUrls: ['./speed.component.scss']
})
export class SpeedComponent implements OnInit, OnDestroy {

  currentSlide = 1;
  activitySketch1: any;
  activitySketch2: any;
  speed = 0;
  distance = 0;
  speed$: BehaviorSubject<number> = new BehaviorSubject(0);
  distance$: BehaviorSubject<number> = new BehaviorSubject(0);
  subscription: Subscription;
  gameProgress: GameProgress;
  isCheckingAnswer1 = false;
  isCheckingAnswer2 = false;

  constructor(
    private gameProgressService: GameProgressService
  ) { }

  ngOnInit() {
    this.initSketch1();
    this.initSketch2();
    this.subscription = this.gameProgressService.getGameProgress$().subscribe(gameProgress => {
      this.gameProgress = gameProgress;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  next() {
    this.currentSlide++;
  }

  back() {
    this.currentSlide--;
  }

  getDisableNextButton(slide: number) {
    switch (slide) {
      case 2:
        return this.gameProgress.speed.activities.activity2;
    }
  }

  checkAnswer1() {
    this.isCheckingAnswer1 = true;
    this.speed$.next(this.speed);
  }

  checkAnswer2() {
    this.isCheckingAnswer2 = true;
    this.distance$.next(this.distance);
  }

  private initSketch1() {
    const self = this;
    const successCallback = () => {
      swal.fire({
        type: 'success',
        title: 'Good Job!',
        text: 'Correct answer: (3km / 0.05h) or 60km/h',
      });
      this.gameProgress.speed.activities.activity2 = true;
      this.gameProgressService.updateProgress(this.gameProgress);
      self.isCheckingAnswer1 = false;
    };
    const errorCallback = (distanceTravelled) => {
      swal.fire({
        type: 'error',
        title: 'Incorrect',
        text: `Distance travelled: ${distanceTravelled} km, Try again!`,
      });
      self.isCheckingAnswer1 = false;
    };
    this.activitySketch1 = new p5(p => FirstActivitySketch(p, this.speed$, successCallback, errorCallback));
  }

  private initSketch2() {
    const self = this;
    const successCallback = () => {
      swal.fire({
        type: 'success',
        title: 'Good Job!',
        text: 'Correct answer: 9km',
      });
      this.gameProgress.speed.activities.activity2 = true;
      this.gameProgressService.updateProgress(this.gameProgress);
      self.isCheckingAnswer2 = false;
    };
    const errorCallback = (distanceTravelled) => {
      swal.fire({
        type: 'error',
        title: 'Incorrect',
        text: `Distance travelled: ${distanceTravelled} km, Try again!`,
      });
      self.isCheckingAnswer2 = false;
    };
    this.activitySketch2 = new p5(p => SecondActivitySketch(p, this.distance$, successCallback, errorCallback));
  }

}
