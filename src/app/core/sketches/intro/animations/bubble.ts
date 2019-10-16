export class Bubble {
    constructor(
        public pos,
        public vel,
        public size,
        public c,
        public p5) { }

    render() {
        this.p5.push();
        this.p5.translate(this.pos.x, this.pos.y);
        this.p5.fill(this.c, 140);
        this.p5.ellipseMode(this.p5.CENTER);
        this.p5.noStroke();
        this.p5.ellipse(0, 0, this.size.x, this.size.y);
        this.p5.pop();
    }

    update() {
        this.pos.add(this.vel);
    }

    edges() {
        const halfSize = this.size.x / 2;
        if (this.pos.x - halfSize <= 0 || this.pos.x + halfSize >= this.p5.width) {
            this.vel.x *= -1;
        }
        if (this.pos.y - halfSize <= 0 || this.pos.y + halfSize >= this.p5.height) {
            this.vel.y *= -1;
        }
    }
}
