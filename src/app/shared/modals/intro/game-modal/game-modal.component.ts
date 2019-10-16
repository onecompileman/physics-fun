import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameProgress } from 'src/app/shared/models/game-progress.model';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { GameProgressService } from 'src/app/core/services/game-progress.service';

@Component({
  selector: 'pf-game-modal',
  templateUrl: './game-modal.component.html',
  styleUrls: ['./game-modal.component.scss']
})
export class GameModalComponent implements OnInit, OnDestroy {

  currentSlide = 1;
  gameProgressSubscription: Subscription;
  gameProgress: GameProgress;
  nextDisabled = false;

  constructor(
    private gameProgressService: GameProgressService,
    public bsModalRef: BsModalRef
  ) { }

  ngOnDestroy(): void {
    this.gameProgressSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getGameProgress();
    this.getCurrentSlide();
  }

  next(): void {
    this.currentSlide++;
    this.nextDisabled = !this.getNextButtonDisableState();
  }

  back(): void {
    this.currentSlide--;
    this.nextDisabled = !this.getNextButtonDisableState();
  }

  onFlappyBirdCompleted(): void {
    this.gameProgress.intro.games.activities.catchTheApple = true;
    this.gameProgressService.updateProgress(this.gameProgress);
  }

  private getCurrentSlide(): void {
    if (this.gameProgress.intro.games.activities.catchTheApple) {
      this.currentSlide = 4;
    }
  }

  private getNextButtonDisableState() {
    switch (this.currentSlide) {
      case 1:
        return true;
      case 2:
        return true;
      case 3:
        return this.gameProgress.intro.games.activities.catchTheApple;
    }
  }

  private getGameProgress(): void {
    this.gameProgressSubscription = this.gameProgressService.getGameProgress$().subscribe(gameProgress => {
      this.gameProgress = gameProgress;
      this.nextDisabled = !this.getNextButtonDisableState();
    });
  }

}
