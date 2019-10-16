import { Particle } from './particle';

export class ParticleSystem {
    pos: any;
    life: number;
    origLife: number;
    size: any;
    opacity: number;
    force: any;
    count: number;
    generationSpeed: number;
    particles: Particle[] = [];
    p5: any;

    constructor(pos, life, size, opacity, force, count, generationSpeed, p5) {
        this.pos = pos;
        this.life = life;
        this.origLife = life;
        this.size = size;
        this.opacity = opacity;
        this.force = force;
        this.count = count;
        this.generationSpeed = generationSpeed;
        this.particles = [];
        this.p5 = p5;
        this.generateParticles();
    }

    generateParticles() {
        this.particles = [
            ...Array(this.count).fill(1).map(n => new Particle(
                this.pos.copy(),
                this.p5.createVector(this.p5.random(-1, 1), this.p5.random(-1, 1)),
                this.p5.color(
                    this.p5.random(180, 255),
                    this.p5.random(100, 255),
                    this.p5.random(100, 255)),
                this.life,
                this.p5.random(['rect', 'ellipse']),
                this.size,
                this.opacity,
                this.force,
                this.p5
            )),
            ...this.particles
        ];
    }

    update() {
        this.particles = this.particles.filter(p => !p.isDead());
        if (this.p5.frameCount % this.generationSpeed === 0) {
            this.generateParticles();
        }
    }

    render() {
        this.particles.forEach(p => {
            p.update();
            p.render();
        });
    }
}
