import { GameObject } from "../core/game-object";
import pn from '../util/perlin-noise';
import { Player } from "./player";
import { Game } from "../core/game";

const brick = new Image();
brick.src = './img/brick.jpg';

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
        for (let x = 1; x < 5; x++) {
            for (let y = 1; y < 5; y++) {
                arena[x][y] = 1;
            }
        }

        this.arena = arena;
    }

    private drawBrick(x, y) {
        this.game.drawImage(this, brick, x, y);
    }

    render() {
        for (let x = 0; x < this.game.gridSize; x++) {
            for (let y = 0; y < this.game.gridSize; y++) {
                // if out of area
                if (this.arena[x] === undefined || this.arena[x][y] === undefined) {
                    this.drawBrick(x, y);
                    continue;
                }

                if (this.arena[x][y] === 0) {
                    this.drawBrick(x, y);
                }
            }
        }
    }

    onCollision(x, y) {
        this.arena[x][y] = 1;
    }
}