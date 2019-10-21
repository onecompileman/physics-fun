import { FlowPathSystem } from '../flow-path-system';
import { Subject } from 'rxjs';
import { skip } from 'rxjs/operators';
import { Ship } from './ship';
import { RocksPoints } from './rocks-points.data';
import { Rock } from './rock';
import { PathPoints } from './path-points.data';

export function FirstActivitySketch(
    p: any,
    answer$: Subject<number>,
    currentVector$: Subject<number>,
    destinationVector$: Subject<number>,
    rightAnswerCallback: any,
    wrongAnswerCallback: any,
    completedAnswerCallback: any
) {
    let shipImage;
    let destinationImage;
    let rockImage;
    let canvas;
    let ship;
    let rocks = [];
    let currentPointIndex = 0;
    let oldShipLocation: any = null;
    let location: any = null;

    const points = PathPoints;
    const distanceThreshold = 3;
    p.disableFriendlyErrors = true;


    p.preload = () => {
        shipImage = p.loadImage('/assets/img/vector/ship.png');
        destinationImage = p.loadImage('/assets/img/vector/destination.png');
        rockImage = p.loadImage('/assets/img/vector/rock (1).png');
    };

    p.setup = () => {
        const container = document.querySelector('#pfVectorCanvas');
        canvas = p.createCanvas(900, 450);
        canvas.parent('pfVectorCanvas');
        canvas.mousePressed(mousePressed);
        init();
    };

    p.draw = () => {
        p.background(p.color(51, 153, 218));
        displayPoints();
        renderDestination();
        renderRocks();
        renderShip();
    };

    const mousePressed = () => {
        // points.push([p.mouseX, p.mouseY]);
        // console.log(points.reduce((acc, [x, y]) => acc + `\n[${x}, ${y}],`), '');
    };

    const displayPoints = () => {
        points.forEach(([x, y], i) => {
            p.push();
            p.translate(x, y);
            if (currentPointIndex === i) {
                p.fill(p.color(255, 50, 50));
            } else {
                p.fill(255);
            }
            p.ellipse(0, 0, 20, 20);
            p.fill(255);
            p.textSize(11);
            p.text(`Point ${i + 1}`, -15, -10);
            p.pop();
        });
    };

    const renderShip = () => {
        if (location) {
            ship.goToLocation(location);
            if (distanceThreshold > ship.pos.dist(location)) {
                shipLocationReached();
            }
        }

        ship.update();
        ship.render();
    };

    const shipLocationReached = () => {
        const rightLocation = p.createVector(...points[currentPointIndex].map(point => Math.round(point)));
        location = null;
        if (distanceThreshold > ship.pos.dist(rightLocation)) {
            if (currentPointIndex === points.length - 1) {
                setTimeout(() => {
                    completedAnswerCallback();
                    init();
                }, 1500);
            } else {
                setTimeout(() => {
                    rightAnswerCallback(rightLocation);
                    oldShipLocation = ship.pos.copy();
                    currentPointIndex++;
                    getCurrentProblem();
                }, 1500);
            }
        } else {
            setTimeout(() => {
                wrongAnswerCallback();
                ship.pos = oldShipLocation;
                ship.rotate = -p.HALF_PI;
            }, 1500);
        }
    };

    const renderRocks = () => {
        rocks.forEach(rock => rock.render());
    };

    const renderDestination = () => {
        p.push();
        p.translate(p.width - 75, 75);
        p.imageMode(p.CENTER);
        p.image(destinationImage, 0, 0, 150, 150);
        p.pop();
    };

    const listenForEventChanges = () => {
        answer$.subscribe(answer => {
            location = ship.pos.copy().add(answer);
            console.log(location);
        });
    };

    const getCurrentProblem = () => {
        const [x, y] = points[currentPointIndex];
        currentVector$.next(ship.pos);
        destinationVector$.next(p.createVector(x, y));
    };

    const init = () => {
        initShip();
        createRocks();
        listenForEventChanges();
        getCurrentProblem();
    };

    const initShip = () => {
        // Ship
        ship = new Ship(
            p.createVector(40, p.height - 50),
            p.createVector(40, 40),
            shipImage,
            1,
            p
        );

        oldShipLocation = ship.pos.copy();
    };

    const createRocks = () => {
        rocks = RocksPoints.map(([x, y]) => new Rock(p.createVector(x, y), p.createVector(50, 50), rockImage, p));
    };
}
