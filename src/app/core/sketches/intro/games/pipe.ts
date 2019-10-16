export class Pipe {
    topPipe: {
        pos,
        size
    };
    bottomPipe: {
        pos,
        size
    };
    positionX: number;
    velocityX: number;
    p5: any;

    constructor(positionX, velocityX, topPipe, bottomPipe, p5) {
        this.positionX = positionX;
        this.velocityX = velocityX;
        this.topPipe = topPipe;
        this.bottomPipe = bottomPipe;
        this.p5 = p5;
    }

    update() {
        this.positionX -= this.velocityX;
        this.topPipe.pos.x = this.positionX;
        this.bottomPipe.pos.x = this.positionX;
    }

    render() {
        // Top pipe
        this.p5.push();
        this.p5.translate(this.topPipe.pos.x, this.topPipe.pos.y);
        // this.p5.rectMode(this.p5.CENTER);
        this.p5.fill(this.p5.color(240, 100, 100));
        this.p5.rect(0, 0, this.topPipe.size.x, this.topPipe.size.y);
        this.p5.pop();
        // Bottom Pipe
        this.p5.push();
        this.p5.translate(this.bottomPipe.pos.x, this.bottomPipe.pos.y);
        // this.p5.rectMode(this.p5.CENTER);
        this.p5.fill(this.p5.color(240, 100, 100));
        this.p5.rect(0, 0, this.bottomPipe.size.x, this.bottomPipe.size.y);
        this.p5.pop();
    }

    isOutOfBounds(): boolean {
        return this.positionX < -40;
    }

    isCollided(target: any): boolean {
        if (this.topPipe.pos.x < target.pos.x + target.size.x &&
            this.topPipe.pos.x + (this.topPipe.size.x / 2) > target.pos.x &&
            this.topPipe.pos.y < target.pos.y + target.size.y &&
            this.topPipe.pos.y + this.topPipe.size.y > target.pos.y) {
            return true;
        }

        return (this.bottomPipe.pos.x < target.pos.x + target.size.x &&
            this.bottomPipe.pos.x + (this.bottomPipe.size.x / 2) > target.pos.x &&
            this.bottomPipe.pos.y < (target.pos.y + target.size.y / 2) &&
            this.bottomPipe.pos.y + this.bottomPipe.size.y > target.pos.y);
    }
}
