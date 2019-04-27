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

    constructor(game: Game, private player: Player) {
        super(game, tankUp, tankDown, tankLeft, tankRight);
        this.tankImage = tankRight;

        let x = 0;
        let y = 0;

        do {
            x = Math.floor(Math.random() * 100);
            y = Math.floor(Math.random() * 100);
        } while (game.hasCollision(x, y));

        this.position.x = x;
        this.position.y = y;

        setTimeout(() => {
            this.calculateRoute();
        }, Math.random() * 1000);
    }

    render() {
        for (let i of this.path) {
            const x = i[0];
            const y = i[1];

            this.game.drawImage(this, waterImage, x, y, false);
        }

        this.game.drawImage(
            this,
            this.tankImage,
            this.position.x,
            this.position.y
        );

        // rendering bullets 
        for (let bullet of this.bullets) {
            bullet.render();
        }
    }

    onCollision() {
        this.game.removeGameObject(this);
    }

    private calculateRoute() {
        this.path = this.game.getRoute(
            [this.position.x, this.position.y],
            [this.player.getX(), this.player.getY()]
        );

        let counter = 0;

        setInterval(() => {
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