import { Car } from '../../speed/car';
import { Car1Points } from './car1-points.data';
import { FlowPathSystem } from '../../speed/flow-path-system';
import { Car2Points } from './car2-points.data';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

export function InteractiveSketch(
    p: any,
    car1Speed$: BehaviorSubject<number>,
    car2Speed$: BehaviorSubject<number>,
    car1Acceleration$: BehaviorSubject<number>,
    car2Acceleration$: BehaviorSubject<number>,
    car1TopSpeed$: BehaviorSubject<number>,
    car2TopSpeed$: BehaviorSubject<number>
) {
    let racetrackImage;
    let car1Image;
    let car2Image;
    let canvas;
    let car1;
    let car2;
    const kmPerPixels = 10;
    const points = [];


    p.preload = () => {
        racetrackImage = p.loadImage('/assets/img/speed/race-track-2.png');
        car1Image = p.loadImage('/assets/img/speed/cars/3.png');
        car2Image = p.loadImage('/assets/img/speed/cars/2.png');
    };

    p.setup = () => {
        const container = document.querySelector('#pfInteractiveAccelerationCanvas');
        canvas = p.createCanvas(950, 600);
        canvas.parent('pfInteractiveAccelerationCanvas');
        initCars();
        listenForSpeedChanges();
    };

    p.draw = () => {
        p.background(p.color(0, 152, 136));
        p.image(racetrackImage, 0, 0, p.width + 20, p.height);
        renderCar();
        displayCarSpeed();
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
            p.ellipse(0, 0, 20, 20);
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
        const car1ConfigChanges$ = combineLatest(
            car1Speed$,
            car1Acceleration$,
            car1TopSpeed$
        ).pipe(
            map(([speed, acceleration, topSpeed]) => [speed / kmPerPixels, acceleration, topSpeed / kmPerPixels])
        );
        const car2ConfigChanges$ = combineLatest(
            car2Speed$,
            car2Acceleration$,
            car2TopSpeed$
        ).pipe(
            map(([speed, acceleration, topSpeed]) => [speed / kmPerPixels, acceleration, topSpeed / kmPerPixels])
        );
        car1ConfigChanges$.subscribe(([speed, acceleration, topSpeed]) => {
            car1.setSpeed(speed);
            car1.setAcceleration(+acceleration);
            car1.setTopSpeed(topSpeed);
        });
        car2ConfigChanges$.subscribe(([speed, acceleration, topSpeed]) => {
            car2.setSpeed(speed);
            car2.setAcceleration(+acceleration);
            car2.setTopSpeed(topSpeed);
        });

    };

    const initCars = () => {
        // Car 1
        car1 = new Car(
            p.createVector(400, 543),
            p.createVector(70, 70),
            car1Image,
            new FlowPathSystem(Car1Points, p),
            0,
            p
        );
        // Car 2
        car2 = new Car(
            p.createVector(400, 507),
            p.createVector(70, 70),
            car2Image,
            new FlowPathSystem(Car2Points, p),
            0,
            p
        );
    };

    const displayCarSpeed = () => {
        p.push();
        p.fill(255);
        p.textSize(18);
        p.translate(50, 50);
        p.text(`Chervolet Camaro Speed: ${Math.round(car1.speed * kmPerPixels)} km/h`, 0, 0);
        p.text(`Dodge Viper Speed: ${Math.round(car2.speed * kmPerPixels)} km/h`, 0, 30);
        p.pop();
    };
}
