import { ParticleSystem } from './particle-system';
import { BehaviorSubject } from 'rxjs';

export function ParticleSystemSketch(p: any, particleSystems$: BehaviorSubject<ParticleSystem[]>) {
    let particleSystems = [];
    let canvas;
    p.disableFriendlyErrors = true;

    particleSystems$.subscribe(particleSystemArray => particleSystems = particleSystemArray);

    p.setup = () => {
        const container = document.querySelector('#pfParticleCanvas');
        canvas = p.createCanvas(container.clientWidth, container.clientHeight);
        canvas.parent('pfParticleCanvas');
    };

    p.draw = () => {
        p.background(p.color(50, 50, 50));
        renderParticleSystem();
    };

    p.mousePressed = () => {
        const particleSystemArray = particleSystems$.getValue();
        particleSystemArray.push(
            new ParticleSystem(
                p.createVector(p.mouseX, p.mouseY),
                80,
                p.createVector(10, 10),
                255,
                p.createVector(0, -0.05),
                10,
                10,
                p
            )
        );
        particleSystems$.next(particleSystemArray);
    };

    const renderParticleSystem = () => {
        particleSystems.forEach(pS => {
            pS.update();
            pS.render();
        });
    };
}
