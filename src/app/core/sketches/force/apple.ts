export class Apple {

    pos: any;
    size: any;
    img: any;
    speed: number;
    acceleration: number;
    mass: number;
    p5: any;

    constructor(pos, size, img, mass, p5) {
        this.pos = pos;
        this.size = size;
        this.img = img;
        this.mass = mass;
        this.speed = 0;
        this.p5 = p5;
    }

    render(): void {
        this.p5.push();
        this.p5.translate(this.pos.x, this.pos.y);
        this.p5.imageMode(this.p5.CENTER);
        this.p5.image(this.img, 0, 0, this.size.x, this.size.y);
        this.p5.pop();
    }

    update(): void {
        this.speed += (this.acceleration * +this.mass);
        this.pos.add(this.p5.createVector(0, this.speed));
        this.pos.y = this.p5.constrain(this.pos.y, 0, this.p5.height - 50);
    }


    setMass(mass): void {
        this.mass = mass;
    }

    setAcceleration(acceleration): void {
        this.acceleration = acceleration;
    }

}
