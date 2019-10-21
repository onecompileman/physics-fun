export class Ball {

    pos: any;
    size: any;
    img: any;
    speed = 0;
    bounce = 5;
    mass: number;
    elasticity: number;
    airDirection: number;
    acceleration: number;
    color: any;
    p5: any;

    constructor(pos, size, mass, elasticity, airDirection, acceleration, p5) {
        this.pos = pos;
        this.size = size;
        this.mass = mass;
        this.elasticity = elasticity;
        this.airDirection = airDirection;
        this.acceleration = acceleration;
        this.bounce *= elasticity;
        this.color = p5.color(
            p5.random(100, 255),
            p5.random(100, 255),
            p5.random(100, 255)
        );
        this.p5 = p5;
    }

    render(): void {
        this.p5.push();
        this.p5.translate(this.pos.x, this.pos.y);
        this.p5.fill(this.p5.color(this.color));
        this.p5.ellipse(0, 0, this.size.x, this.size.y);
        this.p5.pop();
    }

    update(): void {
        if (this.pos.y >= this.p5.height - (this.size.x / 2)) {
            this.bounce = this.bounce * 0.6;
            this.speed -= this.bounce;
        }
        this.speed += (this.acceleration * +this.mass);
        this.pos.add(this.p5.createVector((this.bounce > 1) ? this.airDirection : 0, this.speed));
        this.pos.y = this.p5.constrain(this.pos.y, -1000, this.p5.height - (this.size.x / 2));
    }

    setAirDirection(airDirection) {
        this.airDirection = airDirection;
    }
}
