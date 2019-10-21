import { Car } from '../../speed/car';
import { Car1Points } from '../interactive/car1-points.data';
import { FlowPathSystem } from '../../speed/flow-path-system';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export function FirstActivitySketch(
    p: any,
    acceleration$: BehaviorSubject<number>,
    rightAnswerCallback: any,
    wrongAnswerCallback: any
) {
    let racetrackImage;
    let car1Image;
    let canvas;
    let car1;
    let answerAcceleration = null;
    let topSpeed = null;

    const kmPerPixels = 10;
    const rightAnswer = 3;
    const secondsToAccelerate = 3;
    const rightTopSpeed = 82.4;
    const speed = 50;
    const points = [];


    p.preload = () => {
        racetrackImage = p.loadImage('/assets/img/speed/race-track-2.png');
        car1Image = p.loadImage('/assets/img/speed/cars/3.png');
    };

    p.setup = () => {
        const container = document.querySelector('#pfAccelerationCanvas');
        canvas = p.createCanvas(950, 600);
        canvas.parent('pfAccelerationCanvas');
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
        const roundedSpeed = Math.round(car1.speed * 100) / 100;
        if (answerAcceleration) {
            if (roundedSpeed * kmPerPixels === topSpeed) {
                answerAcceleration = null;
                if (topSpeed === rightTopSpeed) {
                    setTimeout(() => {
                        initCars();
                        rightAnswerCallback();
                    }, 1500);
                } else {
                    setTimeout(() => {
                        initCars();
                        wrongAnswerCallback(topSpeed);
                    }, 1500);
                }
            }
        }
    };

    const listenForSpeedChanges = () => {
        acceleration$.subscribe(acceleration => {
            answerAcceleration = acceleration;
            topSpeed = speed + (acceleration * 3.6 * secondsToAccelerate);
            car1.setSpeed(speed / kmPerPixels);
            car1.setAcceleration(acceleration);
            car1.setTopSpeed(topSpeed / kmPerPixels);
        });
    };

    const initCars = () => {
        // Car 1
        car1 = new Car(
            p.createVector(400, 543),
            p.createVector(70, 70),
            car1Image,
            new FlowPathSystem(Car1Points, p),
            speed / kmPerPixels,
            p
        );

        car1.setTopSpeed(speed / kmPerPixels);
    };

    const displayCarSpeed = () => {
        const roundedSpeed = Math.round(car1.speed * 100) / 100;
        p.push();
        p.fill(255);
        p.textSize(18);
        p.translate(50, 50);
        p.text(`Speed: ${roundedSpeed * kmPerPixels} km/h`, 0, 0);
    };
}
