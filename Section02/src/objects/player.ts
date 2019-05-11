import { Bullet } from "./bullet";
import { Game } from "../core/game";
import { Tank } from "./tank";

const tankType = 'tank';

const tankUp = new Image();
tankUp.src = `./img/${tankType}/tank-up.png`;

const tankDown = new Image();
tankDown.src = `./img/${tankType}/tank-down.png`;

const tankRight = new Image();
tankRight.src = `./img/${tankType}/tank-right.png`;

const tankLeft = new Image();
tankLeft.src = `./img/${tankType}/tank-left.png`;

export class Player extends Tank {
    constructor(game: Game) {
        super(game, tankUp, tankDown, tankLeft, tankRight);
        this.tankImage = tankRight;

        this.position.x = game.gridSize / 2;
        this.position.y = game.gridSize / 2;

        this.setCamera();
    }

    private setCamera() {
        this.game.setCameraFunction(() => {
            const pos = {
                x1: this.getX() - 15,
                x2: this.getX() + 15,
                y1: this.getY() - 15,
                y2: this.getY() + 15
            }

            return pos;
        });
    }

    onRender() {
        this.game.drawImage(
            this,
            this.tankImage,
            this.position.x,
            this.position.y,
        );
    }

    getX() {
        return this.position.x;
    }

    getY() {
        return this.position.y;
    }

    fire() {
        const bullet = new Bullet(this.game, this.direction, this.position.x, this.position.y, this);
        this.game.addGameObject(bullet);
    }
}