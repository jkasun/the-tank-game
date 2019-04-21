import { GameObject } from "./game-object";

export class CollisionMap {
    private collisionMap: { value: number, gameObject: GameObject }[][] = [];

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
                }

                this.collisionMap[x][y] = {
                    value: 0,
                    gameObject: null
                };
            }
        }
    }
}