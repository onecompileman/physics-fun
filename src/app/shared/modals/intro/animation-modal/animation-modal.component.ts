import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameProgressService } from 'src/app/core/services/game-progress.service';
import { Subscription } from 'rxjs';
import { GameProgress } from 'src/app/shared/models/game-progress.model';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'pf-animation-modal',
  templateUrl: './animation-modal.component.html',
  styleUrls: ['./animation-modal.component.scss']
})
export class AnimationModalComponent implements OnInit, OnDestroy {

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

  ngOnInit() {
    this.getGameProgress();
    this.getCurrentSlide();
  }

  next() {
    this.currentSlide++;
    this.nextDisabled = !this.getNextButtonDisableState();
  }

  back() {
    this.currentSlide--;
    this.nextDisabled = !this.getNextButtonDisableState();
  }

  private getCurrentSlide(): void {
    if (this.gameProgress.intro.animation.activities.particleSystem) {
      this.currentSlide = 3;
    }
    if (this.gameProgress.intro.games.enabled) {
      this.currentSlide = 4;
    }
  }

  private getNextButtonDisableState() {
    switch (this.currentSlide) {
      case 1:
        return true;
      case 2:
        return this.gameProgress.intro.animation.activities.particleSystem;
      case 3:
        return this.gameProgress.intro.games.enabled;
    }
  }

  onBubbleCompleted() {
    this.gameProgress.intro.animation.activities.particleSystem = true;
    this.gameProgressService.updateProgress(this.gameProgress);
  }

  onParticleSystemCompleted() {
    this.gameProgress.intro.games.enabled = true;
    this.gameProgressService.updateProgress(this.gameProgress);
  }

  private getGameProgress(): void {
    this.gameProgressSubscription = this.gameProgressService.getGameProgress$().subscribe(gameProgress => {
      this.gameProgress = gameProgress;
      this.nextDisabled = !this.getNextButtonDisableState();
    });
  }


}
