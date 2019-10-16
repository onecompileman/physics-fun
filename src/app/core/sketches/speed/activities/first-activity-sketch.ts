export function FirstActivitySketch(p: any) {
    let racetrackImage;
    let car1Image;
    let canvas;
    let car1;
    const kmPerPixels = 10;
    const points = [];


    p.preload = () => {
        racetrackImage = p.loadImage('/assets/img/speed/race-track-1.png');
        car1Image = p.loadImage('/assets/img/speed/cars/1.png');
    };

    p.setup = () => {
        const container = document.querySelector('#pfSpeedCanvas');
        canvas = p.createCanvas(900, 450);
        canvas.parent('pfInteractiveCanvas');
    };
}
