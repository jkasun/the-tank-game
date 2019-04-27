import { GameObject } from "../core/game-object";
import { Pos } from "../core/position";
import { DIRECTION } from "../core/direction";
import { Bullet } from "./bullet";
import { Game } from "../core/game";

export abstract class Tank extends GameObject {
    protected position: Pos = {
        x: 0,
        y: 0
    };

    protected direction: DIRECTION = DIRECTION.RIGHT;
    protected tankImage;
    protected bullets: Bullet[] = [];

    constructor(
        game: Game,
        private tankUp, private tankDown,
        private tankLeft,
        private tankRight
    ) {
        super(game);
    }

    moveUp() {
        this.direction = DIRECTION.UP;
        this.tankImage = this.tankUp;

        if (this.game.hasCollision(this.position.x, this.position.y - 1)) {
            console.log('cannot move up');
            return;
        }

        this.position.y--;
    }

    moveDown() {
        this.direction = DIRECTION.DOWN;
        this.tankImage = this.tankDown;

        if (this.game.hasCollision(this.position.x, this.position.y + 1)) {
            console.log('cannot move down');
            return;
        }

        this.position.y++;
    }

    moveRight() {
        this.direction = DIRECTION.RIGHT;
        this.tankImage = this.tankRight;

        if (this.game.hasCollision(this.position.x + 1, this.position.y)) {
            console.log('cannot move right');
            return;
        }

        this.position.x++;
    }

    moveLeft() {
        this.direction = DIRECTION.LEFT;
        this.tankImage = this.tankLeft;

        if (this.game.hasCollision(this.position.x - 1, this.position.y)) {
            console.log('cannot move left');
            return;
        }

        this.position.x--;
    }
}