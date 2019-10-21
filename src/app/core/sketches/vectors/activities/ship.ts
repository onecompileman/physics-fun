import { FlowPathSystem } from '../flow-path-system';

export class Ship {

    pos: any;
    vel: any;
    origVel: any;
    size: any;
    img: any;
    speed: number;
    rotate: number;
    p5: any;

    constructor(pos, size, img, speed, p5) {
        this.pos = pos;
        this.size = size;
        this.img = img;
        this.vel = p5.createVector(0, 0);
        this.origVel = this.vel.copy();
        this.speed = speed;
        this.p5 = p5;
        this.rotate = -p5.HALF_PI;
    }

    render(): void {
        this.p5.push();
        this.p5.translate(this.pos.x, this.pos.y);
        this.p5.rotate(this.rotate);
        this.p5.imageMode(this.p5.CENTER);
        this.p5.image(this.img, 0, 0, this.size.x, this.size.y);
        this.p5.pop();
    }

    update(): void {
        this.pos.add(this.vel);
    }

    setSpeed(speed): void {
        this.speed = speed;
    }

    goToLocation(location: any) {
        const distanceThreshold = 3;
        if (distanceThreshold > this.pos.dist(location)) {
            this.vel = this.p5.createVector(0, 0);
        } else {
            const velocity = location.copy().sub(this.pos);
            this.rotate = velocity.heading() + -this.p5.HALF_PI;
            velocity.normalize();
            velocity.mult(this.speed);
            this.vel = velocity;
        }
    }

}
