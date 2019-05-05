import { Game } from "../core/game";
import { Tank } from "./tank";
import { Player } from "./player";
import * as _ from 'lodash';

const tankUp = new Image();
tankUp.src = './img/enemy-tank/tank-up.png';

const tankDown = new Image();
tankDown.src = './img/enemy-tank/tank-down.png';

const tankRight = new Image();
tankRight.src = './img/enemy-tank/tank-right.png';

const tankLeft = new Image();
tankLeft.src = './img/enemy-tank/tank-left.png';

const waterImage = new Image();
waterImage.src = './img/material/water.png';

export class EnemyTank extends Tank {
    private path = [];

    // display path
    private showPath = false;

    private movingEvent;
    private shouldCalculateRoute = false;

    private spawned = false;

    constructor(game: Game, private player: Player) {
        super(game, tankUp, tankDown, tankLeft, tankRight);
        this.tankImage = tankRight;

        setInterval(() => {
            this.shouldCalculateRoute = true;
        }, 5000);
    }

    onRender() {
        if (!this.spawned) {
            this.spawned = true;

            let x = 0;
            let y = 0;

            do {
                x = Math.floor(Math.random() * 100);
                y = Math.floor(Math.random() * 100);
            } while (this.game.hasCollision(x, y));

            this.position.x = x;
            this.position.y = y;
        }

        if (this.showPath) {
            for (let i of this.path) {
                const x = i[0];
                const y = i[1];

                this.game.drawImage(this, waterImage, x, y, false);
            }
        }

        this.game.drawImage(
            this,
            this.tankImage,
            this.position.x,
            this.position.y
        );

        // rendering bullets 
        for (let bullet of this.bullets) {
            bullet.onRender();
        }

        if (this.shouldCalculateRoute) {
            this.shouldCalculateRoute = false;
            this.calculateRoute();
        }
    }

    onCollision() {
        this.game.removeGameObject(this);
    }

    private calculateRoute() {
        if (this.movingEvent) {
            clearInterval(this.movingEvent);
            this.movingEvent = null;
        }

        const h = Math.sqrt(Math.pow(this.player.getX() - this.position.x, 2) + Math.pow(this.player.getY() - this.position.y, 2));

        if (h > 20) {
            return;
        }

        this.path = this.game.getRoute(
            [this.position.x, this.position.y],
            [this.player.getX(), this.player.getY()]
        );

        let counter = 0;

        this.movingEvent = setInterval(() => {
            const currentBlock = this.path[counter];

            if (currentBlock) {
                const x = currentBlock[0];
                const y = currentBlock[1];

                if (this.position.x === x) {
                    if (this.position.y < y) {
                        this.moveDown();
                    } else {
                        this.moveUp();
                    }
                } else {
                    if (this.position.x < x) {
                        this.moveRight();
                    } else {
                        this.moveLeft();
                    }
                }
            }

            counter++;
        }, 500);
    }
}