import { Car } from '../car';
import { FlowPathSystem } from '../flow-path-system';
import { Car1Points } from '../interactive/car1-points.data';
import { BehaviorSubject } from 'rxjs';
import { tap, filter, debounceTime, map } from 'rxjs/operators';

export function FirstActivitySketch(p: any, speed$: BehaviorSubject<number>, rightAnswerCallback, wrongAnswerCallback) {
    let racetrackImage;
    let car1Image;
    let canvas;
    let car1;
    let car1Speed = 0;
    let speed = 0;
    let vectorDestination;
    let expectedDistanceInPixels = null;
    let expectedDistance = null;
    const rightAnswer = 60;
    const distanceToDestination = 1696;
    const kmPerPixels = 10;
    const points = [];

    speed$.pipe(
        filter(s => s > 0),
        tap((s: number) => {
            speed = s;
            car1Speed = s / kmPerPixels;
            expectedDistance = s * 0.05;
            expectedDistanceInPixels = p.map(expectedDistance, 0, 3, 0, 1696);
        })
    ).subscribe();

    p.preload = () => {
        racetrackImage = p.loadImage('/assets/img/speed/race-track-1.png');
        car1Image = p.loadImage('/assets/img/speed/cars/1.png');
    };

    p.setup = () => {
        const container = document.querySelector('#pfSpeedCanvas');
        canvas = p.createCanvas(900, 450);
        canvas.parent('pfSpeedCanvas');
        initCars();
        vectorDestination = p.createVector(350, 85);
    };

    p.draw = () => {
        p.background(p.color(0, 172, 156));
        p.image(racetrackImage, 0, 0, p.width + 20, p.height);
        renderCars();
        drawCarDestination();
    };

    const initCars = () => {
        // Car 1
        car1 = new Car(
            p.createVector(450, 85),
            p.createVector(70, 70),
            car1Image,
            new FlowPathSystem(Car1Points, p),
            car1Speed,
            p
        );
    };

    const drawCarDestination = () => {
        p.push();
        p.translate(vectorDestination.x, vectorDestination.y);
        p.fill(255);
        p.rect(-25, -50, 50, 25);
        p.textSize(14);
        p.fill(0);
        p.text('3km', -15, -35);
        p.imageMode(p.CENTER);
        p.tint(255, 127);
        p.rotate(p.HALF_PI);
        p.image(car1Image, 0, 0, 70, 70);
        p.pop();
    };

    const renderCars = () => {
        car1.render();
        car1.setSpeed(car1Speed);
        car1.update();
        const distanceThreshold = car1.speed / 2;
        if (expectedDistanceInPixels) {
            if (expectedDistanceInPixels - distanceThreshold <= car1.totalDistanceInPixels &&
                expectedDistanceInPixels + distanceThreshold >= car1.totalDistanceInPixels) {
                car1Speed = 0;
                expectedDistanceInPixels = null;
                if (rightAnswer === speed) {
                    setTimeout(() => {
                        rightAnswerCallback();
                        initCars();
                    }, 1500);
                } else {
                    setTimeout(() => {
                        wrongAnswerCallback(expectedDistance);
                        initCars();
                    }, 1500);
                }
            }
        }
    };
}
