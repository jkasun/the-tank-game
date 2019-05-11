import { GameObject } from "../core/game-object";
import { DIRECTION } from "../core/direction";
import { Game } from "../core/game";

const bulletRight = new Image();
bulletRight.src = './img/bullet/bullet-right.png';

const bulletLeft = new Image();
bulletLeft.src = './img/bullet/bullet-left.png';

const bulletUp = new Image();
bulletUp.src = './img/bullet/bullet-up.png';

const bulletDown = new Image();
bulletDown.src = './img/bullet/bullet-down.png';

export class Bullet extends GameObject {
    private velocity: number = 15; // grids per second
    private bulletImage;

    constructor(
        game: Game,
        private direction: DIRECTION,
        private x: number,
        private y: number,
        private owner: GameObject
    ) {
        super(game);

        switch (this.direction) {
            case DIRECTION.UP:
                this.bulletImage = bulletUp;
                break;

            case DIRECTION.DOWN:
                this.bulletImage = bulletDown;
                break;

            case DIRECTION.RIGHT:
                this.bulletImage = bulletRight;
                break;

            case DIRECTION.LEFT:
                this.bulletImage = bulletLeft;
                break;
        }

        setInterval(() => {
            switch (this.direction) {
                case DIRECTION.UP:
                    this.moveUp();
                    break;

                case DIRECTION.DOWN:
                    this.moveDown();
                    break;

                case DIRECTION.RIGHT:
                    this.moveRight();
                    break;

                case DIRECTION.LEFT:
                    this.moveLeft();
                    break;
            }
        }, 1000 / this.velocity);
    }

    getOwner() {
        return this.owner;
    }

    onCollision(x, y, gameObject) {
        if (gameObject === this.owner) {
            return;
        }

        this.game.removeGameObject(this);
    }

    onRender() {
        this.game.drawImage(
            this,
            this.bulletImage,
            this.x,
            this.y
        );
    }

    moveUp() {
        this.direction = DIRECTION.UP;
        this.y--;
    }

    moveDown() {
        this.direction = DIRECTION.DOWN;
        this.y++;
        // this.tankImage = tankDown;
    }

    moveRight() {
        this.direction = DIRECTION.RIGHT;
        this.x++;
        // this.tankImage = tankRight;
    }

    moveLeft() {
        this.direction = DIRECTION.LEFT;
        this.x--;
        // this.tankImage = tankLeft;
    }
}