export class FlowPathSystem {
    private vectorPoints: any[];
    private currentPointIndex = 0;
    private p5: any;

    constructor(points: number[][], p5) {
        this.p5 = p5;
        this.vectorPoints = this.createVectorPoints(points);
    }

    update(target) {
        if (this.collided(target)) {
            this.currentPointIndex = (this.currentPointIndex === this.vectorPoints.length - 1) ?
                0 : this.currentPointIndex + 1;
        }
    }
    // For debug purpose only
    render() {
        this.vectorPoints.forEach((vector, i) => {
            this.p5.push();
            this.p5.translate(vector.x, vector.y);
            if (i === this.currentPointIndex) {
                this.p5.fill(this.p5.color(255, 50, 50));
            } else {
                this.p5.fill(255);
            }
            this.p5.ellipse(0, 0, 20, 20);
            this.p5.fill(255);
            this.p5.textSize(14);
            this.p5.text(`Point ${i + 1}: (${Math.round(vector.x)}, ${Math.round(vector.y)})`, -35, -10);
            this.p5.pop();
        });
    }

    getCurrentVectorPoint(): any {
        return this.vectorPoints[this.currentPointIndex];
    }

    private collided(target) {
        return 20 > target.pos.dist(this.vectorPoints[this.currentPointIndex]);
    }

    private createVectorPoints(points: number[][]) {
        return points.map(([x, y]) => this.p5.createVector(x, y));
    }
}
