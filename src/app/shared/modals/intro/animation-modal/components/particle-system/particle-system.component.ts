import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ParticleSystem } from 'src/app/core/sketches/intro/animations/particle-system';
import { ParticleSystemSketch } from 'src/app/core/sketches/intro/animations/particle-system-sketch';
import { tap, map } from 'rxjs/operators';

declare const p5: any;
@Component({
  selector: 'pf-particle-system',
  templateUrl: './particle-system.component.html',
  styleUrls: ['./particle-system.component.scss']
})
export class ParticleSystemComponent implements OnInit, OnDestroy {

  @Output() completed = new EventEmitter();

  sketch: any;
  particles$: BehaviorSubject<ParticleSystem[]> = new BehaviorSubject([]);
  particleCount = 0;
  particleSubscription: Subscription;
  tasks1Complete = false;
  tasks2Complete = false;
  tasks3Complete = false;

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      p5.disableFriendlyErrors = true;
      this.sketch = new p5(p => ParticleSystemSketch(p, this.particles$));
      this.checkParticleCount();
    }, 100);
  }

  ngOnDestroy(): void {
    this.particleSubscription.unsubscribe();
  }

  private checkParticleCount(): void {
    this.particleSubscription = this.particles$.pipe(
      tap(particles => this.particleCount = particles.length),
      map(particles => particles.length)
    ).subscribe((particleCount) => {
      this.checkTaskCompletion(particleCount);
    });
  }

  private checkTaskCompletion(particleCount: number): void {
    this.tasks1Complete = particleCount >= 1;
    this.tasks2Complete = particleCount >= 5;
    this.tasks3Complete = particleCount >= 10;
    if (particleCount >= 10) {
      this.completeParticles();
    }
  }

  private completeParticles() {
    this.completed.emit(true);
  }

}
