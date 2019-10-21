import { Car } from '../car';
import { Car1Points } from './car1-points.data';
import { FlowPathSystem } from '../flow-path-system';
import { Car2Points } from './car2-points.data';
import { BehaviorSubject } from 'rxjs';

export function InteractiveSketch(p: any, car1Speed$: BehaviorSubject<number>, car2Speed$: BehaviorSubject<number>) {
    let racetrackImage;
    let car1Image;
    let car2Image;
    let canvas;
    let car1;
    let car2;
    const kmPerPixels = 10;
    const points = [];
    p.disableFriendlyErrors = true;


    p.preload = () => {
        racetrackImage = p.loadImage('/assets/img/speed/race-track-1.png');
        car1Image = p.loadImage('/assets/img/speed/cars/1.png');
        car2Image = p.loadImage('/assets/img/speed/cars/2.png');
    };

    p.setup = () => {
        const container = document.querySelector('#pfInteractiveCanvas');
        canvas = p.createCanvas(900, 450);
        canvas.parent('pfInteractiveCanvas');
        initCars();
        listenForSpeedChanges();
    };

    p.draw = () => {
        p.background(p.color(0, 172, 156));
        p.image(racetrackImage, 0, 0, p.width + 20, p.height);
        renderCar();
        displayPoints();
    };

    p.mousePressed = () => {
        // points.push(p.createVector(p.mouseX, p.mouseY));
        // console.log(points.reduce((acc, { x, y }) => acc + `\n[${x}, ${y}],`), '');
    };

    const displayPoints = () => {
        points.forEach(point => {
            p.push();
            p.translate(point.x, point.y);
            p.fill(255);
            p.ellipse(0, 0, 30, 30);
            p.pop();
        });
    };

    const renderCar = () => {
        car1.render();
        car1.update();
        car2.render();
        car2.update();
    };

    const listenForSpeedChanges = () => {
        car1Speed$.subscribe(speed => car1.setSpeed(speed / kmPerPixels));
        car2Speed$.subscribe(speed => car2.setSpeed(speed / kmPerPixels));
    };

    const initCars = () => {
        // Car 1
        car1 = new Car(
            p.createVector(350, 85),
            p.createVector(70, 70),
            car1Image,
            new FlowPathSystem(Car1Points, p),
            5,
            p
        );
        // Car 2
        car2 = new Car(
            p.createVector(350, 50),
            p.createVector(70, 70),
            car2Image,
            new FlowPathSystem(Car2Points, p),
            5,
            p
        );
    };
}
