import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { IntroComponent } from './content/intro/intro.component';
import { AccelerationComponent } from './content/acceleration/acceleration.component';
import { SpeedComponent } from './content/speed/speed.component';
import { VectorsComponent } from './content/vectors/vectors.component';
import { ForceComponent } from './content/force/force.component';
import { BallPhysicsComponent } from './content/ball-physics/ball-physics.component';
import { LearnPhysicsComponent } from './learn-physics.component';

const routes: Routes = [
  {
    path: '',
    component: LearnPhysicsComponent,
    children: [
      {
        path: '',
        component: IntroComponent,
        pathMatch: 'full'
      },
      {
        path: 'speed',
        component: SpeedComponent
      },
      {
        path: 'acceleration',
        component: AccelerationComponent
      },
      {
        path: 'vectors',
        component: VectorsComponent
      },
      {
        path: 'force',
        component: ForceComponent
      },
      {
        path: 'ball-physics',
        component: BallPhysicsComponent
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearnPhysicsRoutingModule { }
