import { Sperm } from './sperm';

export const mainSketch = (p: any) => {
    let sperms = [];
    let canvas;
    p.setup = () => {
        canvas = p.createCanvas(innerWidth, innerHeight);
        canvas.parent('pfMainCanvas');
        sperms = Array(6).fill(1).map(() => new Sperm(
            p.createVector(
                p.random(100, p.width - 100),
                p.random(100, p.height - 100)
            ), p));
    };

    p.draw = () => {
        sperms.forEach(sperm => {
            sperm.update();
            sperm.render();
        });
    };

    p.mousePressed = () => {
        const pos = p.createVector(p.mouseX, p.mouseY);
        sperms.push(new Sperm(pos, p));
    };
};
