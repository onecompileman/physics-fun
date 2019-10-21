import { FlowPathSystem } from '../flow-path-system';
import { BehaviorSubject } from 'rxjs';
import { skip } from 'rxjs/operators';
import { Ship } from '../ship';

export function InteractiveSketch(p: any, start$: BehaviorSubject<boolean>, reset$: BehaviorSubject<boolean>) {
    let shipImage;
    let canvas;
    let ship;
    let points = [];
    p.disableFriendlyErrors = true;


    p.preload = () => {
        shipImage = p.loadImage('/assets/img/vector/ship.png');
    };

    p.setup = () => {
        const container = document.querySelector('#pfInteractiveVectorCanvas');
        canvas = p.createCanvas(900, 450);
        canvas.parent('pfInteractiveVectorCanvas');
        canvas.mousePressed(mousePressed);
        initShip();
        listenForEventChanges();
    };

    p.draw = () => {
        p.background(p.color(51, 153, 218));
        displayPoints();
        renderShip();
    };

    const mousePressed = () => {
        points.push([p.mouseX, p.mouseY]);
        // console.log(points.reduce((acc, { x, y }) => acc + `\n[${x}, ${y}],`), '');
    };

    const displayPoints = () => {
        points.forEach(([x, y]) => {
            p.push();
            p.translate(x, y);
            p.fill(255);
            p.ellipse(0, 0, 20, 20);
            p.pop();
        });
    };

    const renderShip = () => {
        ship.render();
        ship.update();
    };

    const listenForEventChanges = () => {
        start$.pipe(
            skip(1)
        ).subscribe(() => {
            ship.setFlowPathSystem(new FlowPathSystem(points, p));
        });

        reset$.pipe(
            skip(1)
        ).subscribe(() => {
            initShip();
        });
    };

    const initShip = () => {
        // Ship
        points = [];
        ship = new Ship(
            p.createVector(350, 85),
            p.createVector(50, 50),
            shipImage,
            new FlowPathSystem([[350, 85]], p),
            2,
            p
        );
    };
}
