export class Sperm {

    pos: any;
    p5: any;
    c: any;

    constructor(pos, p5) {
        this.pos = pos;
        this.p5 = p5;
        this.c = p5.color(
            p5.random(100, 255),
            p5.random(100, 255),
            p5.random(100, 255)
        );
    }

    update() {
        this.pos.add(this.p5.createVector(
            this.p5.random(-6.5, 6.5),
            this.p5.random(-6.5, 6.5)
        ));
    }

    render() {
        this.p5.push();
        this.p5.translate(this.pos.x, this.pos.y);
        this.p5.stroke(0);
        this.p5.fill(this.c);
        this.p5.strokeWeight(0.5);
        this.p5.ellipse(0, 0, 50, 50);
        this.p5.pop();
    }
}
