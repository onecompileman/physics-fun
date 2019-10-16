import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearnPhysicsRoutingModule } from './learn-physics-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentComponent } from './content/content.component';
import { IntroComponent } from './content/intro/intro.component';
import { SpeedComponent } from './content/speed/speed.component';
import { AccelerationComponent } from './content/acceleration/acceleration.component';
import { VectorsComponent } from './content/vectors/vectors.component';
import { ForceComponent } from './content/force/force.component';
import { BallPhysicsComponent } from './content/ball-physics/ball-physics.component';
import { LearnPhysicsComponent } from './learn-physics.component';
import { SharedModule } from '../shared/shared.module';
import { InteractiveComponent } from './content/speed/components/interactive/interactive.component';

@NgModule({
  declarations: [
    SidebarComponent,
    ContentComponent,
    IntroComponent,
    SpeedComponent,
    AccelerationComponent,
    VectorsComponent,
    ForceComponent,
    BallPhysicsComponent,
    LearnPhysicsComponent,
    InteractiveComponent],
  imports: [
    CommonModule,
    LearnPhysicsRoutingModule,
    SharedModule
  ]
})
export class LearnPhysicsModule { }
