import { GameObject } from "../core/game-object";
import pn from '../util/perlin-noise';
import { Game } from "../core/game";

const brick = new Image();
brick.src = './img/material/brick.jpg';

const iron = new Image();
iron.src = './img/material/iron.jpg';

export class Arena extends GameObject {
    private width: number = 100;
    private height: number = 100;
    private scaler = 0.1;
    private arena;

    constructor(
        game: Game,
    ) {
        super(game);

        this.initializeArena();
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
        const middleX = Math.floor(this.width / 2);
        const middleY = Math.floor(this.width / 2);

        for (let x = middleX - 5; x < middleX + 5; x++) {
            for (let y = middleY - 5; y < middleY + 5; y++) {
                arena[x][y] = 1;
            }
        }

        this.arena = arena;
    }

    private drawIron(x, y) {
        this.game.drawImage(this, iron, x, y);
    }

    private drawBrick(x, y) {
        this.game.drawImage(this, brick, x, y);
    }

    onRender() {
        for (let x = 0; x < this.game.gridSize; x++) {
            for (let y = 0; y < this.game.gridSize; y++) {
                // Corner tiles, game area
                if (x === 0 || y === 0 || x === this.width - 1 || y === this.height - 1) {
                    this.drawIron(x, y);
                    continue;
                }

                // Normal Maze tiles
                if (this.arena[x][y] === 0) {
                    this.drawBrick(x, y);
                }
            }
        }
    }

    onCollision(x, y) {
        // does not destroy if corner tile
        if (x === 0 || y === 0 || x === this.width - 1 || y === this.height - 1) {
            return;
        }

        this.arena[x][y] = 1;
    }
}