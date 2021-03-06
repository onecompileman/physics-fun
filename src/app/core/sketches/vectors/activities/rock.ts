export class Rock {

    pos: any;
    vel: any;
    size: any;
    img: any;
    p5: any;

    constructor(pos, size, img, p5) {
        this.pos = pos;
        this.size = size;
        this.img = img;
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

    }

}
