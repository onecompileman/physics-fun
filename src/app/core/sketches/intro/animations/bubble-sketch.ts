import { Bubble } from './bubble';
import { BehaviorSubject } from 'rxjs';

export function BubbleSketch(p: any, bubbles$: BehaviorSubject<Bubble[]>) {
    let bubbles = [];
    let canvas;
    p.disableFriendlyErrors = true;

    bubbles$.subscribe(bubbleArray => bubbles = bubbleArray);

    p.setup = () => {
        const container = document.querySelector('#pfBubbleCanvas');
        canvas = p.createCanvas(container.clientWidth, container.clientHeight);
        canvas.parent('pfBubbleCanvas');
    };

    p.draw = () => {
        p.background(p.color(50, 50, 50));
        bubbles.forEach(bubble => {
            bubble.update();
            bubble.edges();
            bubble.render();
        });
    };

    p.mousePressed = () => {
        const pos = p.createVector(p.mouseX, p.mouseY);
        const vel = p.createVector(p.random(-4, 4), p.random(-4, 4));
        const size = p.random(20, 60);
        const c = p.color(
            p.random(0, 255),
            p.random(0, 255),
            p.random(0, 255)
        );
        const bubblesArray = bubbles$.getValue();
        bubblesArray.push(new Bubble(pos, vel, p.createVector(size, size), c, p));
        bubbles$.next(bubblesArray);
    };
}
