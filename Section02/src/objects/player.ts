import { GameObject } from "../core/game-object";

const boxSize = 25;

const tankUp = new Image(boxSize, boxSize);
tankUp.src = './img/tank-up.png';

const tankDown = new Image(boxSize, boxSize);
tankDown.src = './img/tank-down.png';

const tankRight = new Image(boxSize, boxSize);
tankRight.src = './img/tank-right.png';

const tankLeft = new Image(boxSize, boxSize);
tankLeft.src = './img/tank-left.png';

export class Player extends GameObject {
    private positionX: number = 0;
    private positionY: number = 0;
    private tankImage;

    constructor(ctx: CanvasRenderingContext2D) {
        super(ctx);
        this.tankImage = tankRight;
    }

    render() {
        this.ctx.drawImage(
            this.tankImage,
            13 * boxSize,
            13 * boxSize,
            boxSize,
            boxSize
        );
    }

    moveUp() {
        this.positionY--;
        this.tankImage = tankUp;
    }

    moveDown() {
        this.positionY++;
        this.tankImage = tankDown;
    }

    moveRight() {
        this.positionX++;
        this.tankImage = tankRight;
    }

    moveLeft() {
        this.positionX--;
        this.tankImage = tankLeft;
    }

    getX() {
        return this.positionX;
    }

    getY() {
        return this.positionY;
    }
}