import { Apple } from '../apple';

import { BehaviorSubject } from 'rxjs';

export function InteractiveSketch(p: any, mass$: BehaviorSubject<number>) {
    let backgroundImage;
    let appleImage;
    let canvas;
    let mass = 1;
    let apples = [];
    const gravityScaled = 0.098;
    p.disableFriendlyErrors = true;


    p.preload = () => {
        backgroundImage = p.loadImage('/assets/img/force/forest.jpg');
        appleImage = p.loadImage('/assets/img/force/apple.png');
    };

    p.setup = () => {
        const container = document.querySelector('#pfInteractiveAppleCanvas');
        canvas = p.createCanvas(900, 550);
        canvas.parent('pfInteractiveAppleCanvas');
        canvas.mousePressed(createApple);
        listenForEventChanges();
    };

    p.draw = () => {
        p.background(p.color(0, 172, 156));
        p.image(backgroundImage, 0, 0, p.width + 20, p.height);
        renderApples();
    };

    const listenForEventChanges = () => {
        mass$.subscribe(m => mass = m);
    };

    const createApple = () => {
        const apple = new Apple(
            p.createVector(p.mouseX, p.mouseY),
            p.createVector(35, 35),
            appleImage,
            mass,
            p
        );
        apple.setAcceleration(gravityScaled);

        apples.push(apple);
    };

    const renderApples = () => {
        apples.forEach(apple => {
            apple.update();
            apple.render();
        });
    };

}
