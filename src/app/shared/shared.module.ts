import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as fromDirectives from './directives';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AnimationModalComponent } from './modals/intro/animation-modal/animation-modal.component';
import { BubbleComponent } from './modals/intro/animation-modal/components/bubble/bubble.component';
import { ParticleSystemComponent } from './modals/intro/animation-modal/components/particle-system/particle-system.component';
import { GameModalComponent } from './modals/intro/game-modal/game-modal.component';
import { FlappyBirdComponent } from './modals/intro/game-modal/components/flappy-bird/flappy-bird.component';

@NgModule({
  declarations: [
    ...fromDirectives.directives,
    AnimationModalComponent,
    BubbleComponent,
    ParticleSystemComponent,
    GameModalComponent,
    FlappyBirdComponent
  ],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    FormsModule
  ],
  exports: [
    ...fromDirectives.directives,
    ModalModule,
    FormsModule
  ],
  entryComponents: [
    AnimationModalComponent,
    GameModalComponent
  ]
})
export class SharedModule { }
