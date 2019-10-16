import { BehaviorSubject } from 'rxjs';
import { Bird } from './bird';
import { Pipe } from './pipe';

export function FlappyBirdSketch(p: any, score$: BehaviorSubject<number>) {
    let bird;
    let pipes = [];
    let canvas;
    let score = 0;

    p.disableFriendlyErrors = true;

    score$.subscribe(s => score = s);

    p.setup = () => {
        const container = document.querySelector('#pfFlappyBirdCanvas');
        canvas = p.createCanvas(container.clientWidth, container.clientHeight);
        canvas.parent('pfFlappyBirdCanvas');
        gameInit();
    };

    p.draw = () => {
        p.background(50);
        renderBird();
        if (p.frameCount % 180 === 0) {
            generatePipes();
        }
        renderPipes();
        drawScore();
    };

    p.keyPressed = () => {
        if (p.keyCode === 32) {
            bird.fly();
        }
    };

    const gameInit = () => {
        const pos = p.createVector((p.width / 2) - 50, p.height / 2);
        const size = p.createVector(30, 30);
        bird = new Bird(pos, size, p);
        pipes = [];
        score$.next(0);
    };

    const drawScore = () => {
        p.push();
        p.translate((p.width / 2) - 70, 40);
        p.textSize(20);
        p.fill(255);
        p.text(`Score: ${score}`, 0, 0);
    };

    const renderBird = () => {
        bird.update();
        bird.render();
        if (bird.isOutOfBounds()) {
            gameInit();
        }
    };

    const generatePipes = () => {
        const heightAllowance = p.random(55, 150);
        const pipeMinHeight = 80;
        const topPipeHeight = p.random(pipeMinHeight, p.height - 80 - heightAllowance);
        const bottomPipeHeight = p.height - heightAllowance - topPipeHeight;
        const topPipe = {
            pos: p.createVector(p.width + 100, 0),
            size: p.createVector(45, topPipeHeight)
        };
        const bottomPipe = {
            pos: p.createVector(p.width + 100, topPipeHeight + heightAllowance),
            size: p.createVector(45, bottomPipeHeight)
        };
        pipes.push(
            new Pipe(bottomPipe.pos.x, 3, topPipe, bottomPipe, p)
        );
    };

    const renderPipes = () => {
        pipes.forEach(pipe => {
            pipe.render();
            pipe.update();
            if (pipe.isCollided(bird)) {
                gameInit();
            }
            if (pipe.positionX < p.width / 2 && !pipe.scored) {
                const s = score$.getValue();
                pipe.scored = true;
                score$.next(s + 1);
            }
        });
        pipes = pipes.filter(pipe => !pipe.isOutOfBounds());
    };
}
