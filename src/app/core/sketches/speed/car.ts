import { FlowPathSystem } from './flow-path-system';

export class Car {

    pos: any;
    vel: any;
    size: any;
    img: any;
    flowPathSystem: FlowPathSystem;
    speed: number;
    topSpeed: number;
    acceleration: number;
    totalDistanceInPixels = 0;
    rotate: number;
    p5: any;

    constructor(pos, size, img, flowPathSystem, speed, p5) {
        this.pos = pos;
        this.size = size;
        this.img = img;
        this.flowPathSystem = flowPathSystem;
        this.speed = speed;
        this.p5 = p5;
        this.rotate = p5.HALF_PI;
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
        this.flowPathSystem.update(this);
        const currentFollowVector = this.flowPathSystem.getCurrentVectorPoint();
        this.vel = currentFollowVector.copy().sub(this.pos);
        this.rotate = this.vel.heading() + this.p5.HALF_PI;
        this.vel.normalize();
        this.vel.mult(this.speed);
        if (this.acceleration && this.topSpeed) {
            this.speed += ((this.acceleration / 5) / 60);
            this.speed = this.p5.constrain(this.speed, 0, this.topSpeed);
        }
        this.totalDistanceInPixels += this.speed;
        this.pos.add(this.vel);
    }

    setSpeed(speed): void {
        this.speed = speed;
    }

    setTopSpeed(topSpeed): void {
        this.topSpeed = topSpeed;
    }

    setAcceleration(acceleration): void {
        this.acceleration = acceleration;
    }

}
