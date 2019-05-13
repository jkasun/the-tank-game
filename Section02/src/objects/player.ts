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
    private healthPoints: number = 10;

    // Events
    onDieEvent: Function;

    constructor(game: Game) {
        super(game, tankUp, tankDown, tankLeft, tankRight);
        this.tankImage = tankRight;

        this.position.x = game.gridSize / 2;
        this.position.y = game.gridSize / 2;

        this.setCamera();
    }

    private setCamera() {
        const pov = 12;

        this.game.setCameraFunction(() => {
            const pos = {
                x1: this.getX() - pov,
                x2: this.getX() + pov,
                y1: this.getY() - pov,
                y2: this.getY() + pov
            }

            return pos;
        });
    }

    public onCollision(x, y, gameObject) {
        if (gameObject instanceof Bullet) {
            if (gameObject.getOwner() === this) {
                return;
            }
        }

        this.healthPoints--;

        if (this.healthPoints === 0) {
            this.onDie();
        }
    }

    public onRender() {
        this.game.drawImage(
            this,
            this.tankImage,
            this.position.x,
            this.position.y,
        );
    }

    public getX() {
        return this.position.x;
    }

    public getY() {
        return this.position.y;
    }

    public fire() {
        const bullet = new Bullet(this.game, this.direction, this.position.x, this.position.y, this);
        this.game.addGameObject(bullet);
    }

    public getHealthPoints() {
        return this.healthPoints;
    }

    on(event: string, handler: Function) {
        switch (event) {
            case 'die':
                this.onDieEvent = handler;
                break;
        }
    }

    private onDie() {
        this.game.removeGameObject(this);

        if (this.onDieEvent) {
            this.onDieEvent();
        }
    }
}