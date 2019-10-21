import { FlowPathSystem } from './flow-path-system';

export class Ship {

    pos: any;
    vel: any;
    origVel: any;
    size: any;
    img: any;
    flowPathSystem: FlowPathSystem;
    speed: number;
    totalDistanceInPixels = 0;
    rotate: number;
    p5: any;

    constructor(pos, size, img, flowPathSystem, speed, p5) {
        this.pos = pos;
        this.size = size;
        this.img = img;
        this.flowPathSystem = flowPathSystem;
        this.vel = p5.createVector(0, 0);
        this.origVel = this.vel.copy();
        this.speed = speed;
        this.p5 = p5;
        this.rotate = p5.HALF_PI;
    }

    render(): void {
        this.flowPathSystem.render();
        this.p5.push();
        this.p5.translate(this.pos.x, this.pos.y);
        this.p5.fill(255);
        this.p5.text(`Pos: (${Math.round(this.pos.y)}, ${Math.round(this.pos.y)})`, -30, -55);
        this.p5.textSize(12);
        this.p5.text(`Sub: (${Math.round(this.origVel.y)}, ${Math.round(this.origVel.y)})`, -30, -39);
        this.p5.rotate(this.rotate);
        this.p5.imageMode(this.p5.CENTER);
        this.p5.image(this.img, 0, 0, this.size.x, this.size.y);

        this.p5.pop();
    }

    update(): void {
        this.flowPathSystem.update(this);
        const currentFollowVector = this.flowPathSystem.getCurrentVectorPoint();
        this.vel = currentFollowVector.copy().sub(this.pos);
        this.origVel = this.p5.createVector(currentFollowVector.x - this.pos.x, currentFollowVector.y - this.pos.y);
        this.rotate = this.vel.heading() + this.p5.HALF_PI;
        this.vel.normalize();
        this.vel.mult(this.speed);
        this.totalDistanceInPixels += this.speed;
        this.pos.add(this.vel);
    }

    setSpeed(speed): void {
        this.speed = speed;
    }

    setFlowPathSystem(flowPathSystem) {
        this.flowPathSystem = flowPathSystem;
    }

}
