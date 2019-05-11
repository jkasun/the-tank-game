import { Game } from "../core/game";
import { Tank } from "./tank";
import { Player } from "./player";
import * as _ from 'lodash';
import { DIRECTION } from "../core/direction";
import { Bullet } from "./bullet";

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
    private isReloading = false;

    constructor(game: Game, private player: Player) {
        super(game, tankUp, tankDown, tankLeft, tankRight);
        this.tankImage = tankRight;

        setInterval(() => {
            this.shouldCalculateRoute = true;
        }, 2500);
    }

    onRender() {
        if (!this.spawned) {
            this.calculateSpawnPosition();
        }

        if (this.showPath) {
            this.drawPath();
        }

        this.game.drawImage(
            this,
            this.tankImage,
            this.position.x,
            this.position.y
        );

        if (this.shouldCalculateRoute) {
            this.shouldCalculateRoute = false;
            this.calculateRoute();
        }

        this.isAttackPossible();
    }

    private calculateSpawnPosition() {
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

    private drawPath() {
        for (let i of this.path) {
            const x = i[0];
            const y = i[1];

            this.game.drawImage(this, waterImage, x, y, false);
        }
    }

    onCollision(x, y, gameObject) {
        if (gameObject instanceof Bullet) {
            if (gameObject.getOwner() === this) {
                return;
            }
        }

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

    private isAttackPossible() {
        const h = Math.sqrt(Math.pow(this.player.getX() - this.position.x, 2) + Math.pow(this.player.getY() - this.position.y, 2));

        if (h > 15) {
            return;
        }

        const px = this.player.getX();
        const py = this.player.getY();

        const x = this.position.x;
        const y = this.position.y;

        if (y === py) {
            if (px > x) {
                //player is on right side
                this.direction = DIRECTION.RIGHT;
            } else {
                // player is on the left side
                this.direction = DIRECTION.LEFT;
            }

            this.fire();
        }

        if (x === px) {
            if (py > y) {
                //player is on right side
                this.direction = DIRECTION.DOWN;
            } else {
                // player is on the left side
                this.direction = DIRECTION.UP;
            }

            this.fire();
        }
    }

    fire() {
        if (this.isReloading) {
            return;
        }

        const bullet = new Bullet(this.game, this.direction, this.position.x, this.position.y, this);
        this.game.addGameObject(bullet);

        this.isReloading = true;

        setTimeout(() => {
            this.isReloading = false;
        }, 750);
    }
}