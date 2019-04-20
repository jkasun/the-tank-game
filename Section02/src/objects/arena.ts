import { GameObject } from "../core/game-object";
import pn from '../util/perlin-noise';
import { Player } from "./player";

export class Arena extends GameObject {
    private width: number = 100;
    private height: number = 100;
    private scaler = 0.1;
    private arena;
    private boxSize = 25;
    private brickImage;
    private drawX;
    private drawY;

    constructor(
        ctx: CanvasRenderingContext2D,
        private player: Player
    ) {
        super(ctx);

        this.initializeArena();

        const brick = new Image(this.boxSize, this.boxSize);
        brick.src = './img/brick.jpg';
        this.brickImage = brick;

        this.drawX = 800 / this.boxSize;
        this.drawY = 800 / this.boxSize;
    }

    private initializeArena() {
        const arena: Array<Array<Number>> = [];

        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                const c = pn.noise(x * this.scaler, y * this.scaler);

                if (!arena[x]) {
                    arena[x] = [];
                }

                if (c < 0.4) {
                    arena[x][y] = 1;
                } else {
                    arena[x][y] = 0;
                }
            }
        }

        // filling top
        for (let x = 0; x < this.width; x++) {
            arena[0][x] = 0;
            arena[this.width - 1][x] = 0;
        }

        for (let y = 0; y < this.height; y++) {
            arena[y][0] = 0;
            arena[y][this.height - 1] = 0;
        }

        // clean up space for spawn
        for (let x = 1; x < 5; x++) {
            for (let y = 1; y < 5; y++) {
                arena[x][y] = 1;
            }
        }

        this.arena = arena;
    }

    private drawBrick(x, y) {
        const boxSize = this.boxSize;
        this.ctx.drawImage(this.brickImage, x * boxSize, y * boxSize, boxSize, boxSize);
    }

    render() {
        this.ctx.clearRect(0, 0, 1000, 1000);

        const offsetX = this.player.getX();
        const offsetY = this.player.getY();

        for (let x = 0 + offsetX; x < this.drawX + offsetX; x++) {
            for (let y = 0 + offsetY; y < this.drawY + offsetY; y++) {
                // if out of area
                if (this.arena[x] === undefined || this.arena[x][y] === undefined) {
                    return;
                }

                if (this.arena[x][y] === 0) {
                    this.drawBrick(x - offsetX, y - offsetY);
                }
            }
        }
    }
}