export class Particle {

    pos: any;
    vel: any;
    col: any;
    life: number;
    origLife: number;
    shape: string;
    size: any;
    opacity: number;
    force: any;
    p5: any;

    constructor(pos, vel, col, life, shape, size, opacity, force, p5) {
        this.pos = pos;
        this.vel = vel;
        this.col = col;
        this.life = life;
        this.origLife = life;
        this.shape = shape;
        this.size = size;
        this.opacity = opacity;
        this.force = force;
        this.p5 = p5;
    }

    render() {
        this.p5.push();
        this.p5.translate(this.pos.x, this.pos.y);
        this.p5.stroke(this.col, this.opacity);
        this.p5.noFill();

        const lifePercentage = this.life / this.origLife;

        if (this.shape === 'rect') {
            this.p5.rect(0, 0, this.size.x * lifePercentage, this.size.y * lifePercentage);
        } else {
            this.p5.ellipse(0, 0, this.size.x * lifePercentage, this.size.y * lifePercentage);
        }

        this.p5.pop();
    }

    update() {
        this.vel.add(this.force);
        this.pos.add(this.vel);
        this.vel.limit(3);
        this.life--;
        this.opacity = this.p5.map(this.life, 0, this.origLife, 0, 255);
    }

    isDead() {
        return this.life <= 0;
    }

}
