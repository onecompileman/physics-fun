export class Bird {
    pos: any;
    vel: any;
    gravity: any;
    size: any;
    p5: any;

    constructor(pos, size, p5) {
        this.pos = pos;
        this.size = size;
        this.p5 = p5;
        this.vel = p5.createVector(0, 0);
        this.gravity = p5.createVector(0, 0.3);
    }

    render() {
        this.p5.push();
        this.p5.translate(this.pos.x, this.pos.y);
        this.p5.fill(255);
        this.p5.ellipse(0, 0, this.size.x, this.size.y);
        this.p5.pop();
    }

    update() {
        this.pos.add(this.vel);
        this.vel.add(this.gravity);
        this.vel.limit(4);
    }

    fly() {
        this.vel.y -= 6;
    }

    isOutOfBounds(): boolean {
        return this.pos.y - 40 >= this.p5.height;
    }
}
