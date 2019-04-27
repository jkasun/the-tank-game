import { GameObject } from "./game-object";
import * as _ from 'lodash';
import { findPath } from "../util/astar";

export class CollisionMap {
    private collisionMap: { value: number, gameObject: GameObject }[][] = [];
    private matrix: number[][] = [];

    constructor(
        private width: number,
        private height: number
    ) {
        this.clear();
    }

    setCollision(x, y, value, gameObject: GameObject) {
        if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
            return;
        }

        this.collisionMap[x][y] = {
            value,
            gameObject
        };

        this.matrix[x][y] = 1;
    }

    getCollision(x, y) {
        if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
            return {
                gameObject: null,
                value: 0
            };
        }

        return this.collisionMap[x][y];
    }

    clear() {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                if (!this.collisionMap[x]) {
                    this.collisionMap[x] = [];
                    this.matrix[x] = [];
                }

                this.collisionMap[x][y] = {
                    value: 0,
                    gameObject: null
                };

                this.matrix[x][y] = 0;
            }
        }
    }

    getRoute(start, goal) {
        const x1 = start[0];
        const y1 = start[1];

        const x2 = goal[0];
        const y2 = goal[1];

        var prepMatrix = _.map(this.matrix, _.clone);
        prepMatrix[x1][y1] = 0;
        prepMatrix[x2][y2] = 0;

        return findPath(prepMatrix, start, goal);
    }
}