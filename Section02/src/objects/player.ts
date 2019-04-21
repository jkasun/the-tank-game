import { GameObject } from "../core/game-object";
import { Bullet } from "./bullet";
import { Game } from "../core/game";
import { DIRECTION } from "../core/direction";

const tankUp = new Image();
tankUp.src = './img/tank/tank-up.png';

const tankDown = new Image();
tankDown.src = './img/tank/tank-down.png';

const tankRight = new Image();
tankRight.src = './img/tank/tank-right.png';

const tankLeft = new Image();
tankLeft.src = './img/tank/tank-left.png';

export class Player extends GameObject {
    private positionX: number;
    private positionY: number;
    private tankImage;

    private bullets: Bullet[] = [];
    private direction: DIRECTION = DIRECTION.RIGHT;

    constructor(game: Game) {
        super(game);
        this.tankImage = tankRight;

        this.positionX = game.gridSize / 2;
        this.positionY = game.gridSize / 2;

        game.setCameraFunction(() => {
            const pos = {
                x1: this.getX() - 15,
                x2: this.getX() + 15,
                y1: this.getY() - 15,
                y2: this.getY() + 15
            }

            return pos;
        });
    }

    render() {
        this.game.drawImage(
            this,
            this.tankImage,
            this.positionX,
            this.positionY,
        );

        // rendering bullets 
        for (let bullet of this.bullets) {
            bullet.render();
        }
    }
    
    moveUp() {
        this.direction = DIRECTION.UP;
        this.tankImage = tankUp;

        if (this.game.hasCollision(this.positionX, this.positionY - 1)) {
            return;
        }

        this.positionY--;
    }

    moveDown() {
        this.direction = DIRECTION.DOWN;
        this.tankImage = tankDown;

        if (this.game.hasCollision(this.positionX, this.positionY + 1)) {
            return;
        }

        this.positionY++;
    }

    moveRight() {
        this.direction = DIRECTION.RIGHT;
        this.tankImage = tankRight;

        if (this.game.hasCollision(this.positionX + 1, this.positionY)) {
            return;
        }

        this.positionX++;
    }

    moveLeft() {
        this.direction = DIRECTION.LEFT;
        this.tankImage = tankLeft;

        if (this.game.hasCollision(this.positionX - 1, this.positionY)) {
            return;
        }

        this.positionX--;
    }

    getX() {
        return this.positionX;
    }

    getY() {
        return this.positionY;
    }

    fire() {
        const bullet = new Bullet(this.game, this.direction, this.positionX, this.positionY);
        this.game.addGameObject(bullet);
    }
}