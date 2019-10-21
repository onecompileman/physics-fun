import { BehaviorSubject } from 'rxjs';
import { Ball } from './ball';

export function InteractiveSketch(
    p: any,
    elastic$: BehaviorSubject<number>,
    mass$: BehaviorSubject<number>,
    airDirection$: BehaviorSubject<number>,
    size$: BehaviorSubject<number>
) {

    let canvas;
    let elastic;
    let mass;
    let airDirection;
    let size;
    const balls = [];
    const gravityScaled = 0.098;


    p.setup = () => {
        const container = document.querySelector('#pfInteractiveBallCanvas');
        canvas = p.createCanvas(900, 450);
        canvas.parent('pfInteractiveBallCanvas');
        canvas.mousePressed(createBall);
        listenEventChanges();
    };

    p.draw = () => {
        p.background(p.color(50, 50, 50));
        renderBalls();
    };

    const listenEventChanges = () => {
        elastic$.subscribe(e => elastic = e);
        mass$.subscribe(m => mass = m);
        airDirection$.subscribe(a => airDirection = a);
        size$.subscribe(s => size = s);
    };

    const createBall = () => {
        const ball = new Ball(
            p.createVector(p.mouseX, p.mouseY),
            p.createVector(size, size),
            mass,
            elastic,
            airDirection,
            gravityScaled,
            p
        );

        balls.push(ball);
    };

    const renderBalls = () => {
        balls.forEach(b => {
            b.render();
            b.update();
        });
    };

}
