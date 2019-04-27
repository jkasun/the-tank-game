import { Bullet } from "./bullet";
import { Game } from "../core/game";
import { Tank } from "./tank";

const tankUp = new Image();
tankUp.src = './img/tank/tank-up.png';

const tankDown = new Image();
tankDown.src = './img/tank/tank-down.png';

const tankRight = new Image();
tankRight.src = './img/tank/tank-right.png';

const tankLeft = new Image();
tankLeft.src = './img/tank/tank-left.png';

export class Player extends Tank {
    constructor(game: Game) {
        super(game, tankUp, tankDown, tankLeft, tankRight);
        this.tankImage = tankRight;

        this.position.x = game.gridSize / 2;
        this.position.y = game.gridSize / 2;

        // this.setCamera();
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

    render() {
        this.game.drawImage(
            this,
            this.tankImage,
            this.position.x,
            this.position.y,
        );

        // rendering bullets 
        for (let bullet of this.bullets) {
            bullet.render();
        }
    }

    getX() {
        return this.position.x;
    }

    getY() {
        return this.position.y;
    }

    fire() {
        const bullet = new Bullet(this.game, this.direction, this.position.x, this.position.y);
        this.game.addGameObject(bullet);
    }
}