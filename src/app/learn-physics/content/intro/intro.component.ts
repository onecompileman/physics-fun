import { Component, OnInit } from '@angular/core';
import { GameProgress } from 'src/app/shared/models/game-progress.model';
import { Observable } from 'rxjs';
import { GameProgressService } from 'src/app/core/services/game-progress.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AnimationModalComponent } from 'src/app/shared/modals/intro/animation-modal/animation-modal.component';
import { GameModalComponent } from 'src/app/shared/modals/intro/game-modal/game-modal.component';

@Component({
  selector: 'pf-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

  gameProgress$: Observable<GameProgress>;
  private bsModalRef: BsModalRef;
  constructor(
    private gameProgressService: GameProgressService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.gameProgress$ = this.gameProgressService.getGameProgress$();
  }

  openAnimationModal() {
    this.bsModalRef = this.modalService.show(AnimationModalComponent, { class: 'modal-lg', ignoreBackdropClick: true });
  }

  openGameModal() {
    this.bsModalRef = this.modalService.show(GameModalComponent, { class: 'modal-lg', ignoreBackdropClick: true });
  }

}
