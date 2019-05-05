import { GameObject } from "./game-object";
import { CollisionMap } from "./collision-map";
import * as _ from 'lodash';

const waterImage = new Image();
waterImage.src = './img/material/water.png';

/**
 * This class should abstract the canvas to a grid world
 * game architecture
 */
export class Game {
    private gameObjects: GameObject[] = [];

    private framesPerSecond = 25;
    private currentFrame = 0;

    private elementHeight = 0;
    private elementWidth = 0;

    private cameraFunction: Function = () => {
        return {
            x1: 0,
            y1: 0,
            x2: this.width,
            y2: this.height
        }
    };

    private cameraOffset = {
        x1: null,
        y1: null,
        x2: null,
        y2: null
    }

    private collisionMap: CollisionMap;

    constructor(
        private ctx: CanvasRenderingContext2D,
        private width: number,
        private height: number
    ) {
        this.elementHeight = ctx.canvas.height;
        this.elementWidth = ctx.canvas.width;

        this.collisionMap = new CollisionMap(width, height);
    }

    hasCollision(x, y): number {
        return this.collisionMap.getCollision(x, y).value;
    }

    // Update collision here maybe
    drawImage(gameObject: GameObject, image, x, y, isColliding?: boolean): boolean {

        if (isColliding !== false) {
            // checking for collision
            if (this.collisionMap.getCollision(x, y).value) {
                const collidingGameObject = this.collisionMap.getCollision(x, y).gameObject;

                gameObject.onCollision(x, y, collidingGameObject); // caller collision
                collidingGameObject.onCollision(x, y, gameObject);
                return;
            }

            this.collisionMap.setCollision(x, y, 1, gameObject);
        }

        // doesn't need to draw if out of view
        if (x < this.cameraOffset.x1 || y < this.cameraOffset.y1
            || x > this.cameraOffset.x2 || y > this.cameraOffset.y2) {
            return;
        }


        this.ctx.drawImage(
            image,
            x * this.boxSize - this.cameraOffset.x1 * this.boxSize,
            y * this.boxSize - this.cameraOffset.y1 * this.boxSize,
            this.boxSize,
            this.boxSize
        );
    }

    addGameObject(gameObject: GameObject) {
        this.gameObjects.push(gameObject);
    }

    removeGameObject(gameObject: GameObject) {
        _.remove(this.gameObjects, gameObject);
    }

    initializeGameObjects() {
        for (let object of this.gameObjects) {
            object.beforeInit();
        }

        for (let object of this.gameObjects) {
            object.onInit();
        }

        for (let object of this.gameObjects) {
            object.afterInit();
        }
    }

    render() {
        this.currentFrame++;

        if (this.currentFrame === this.framesPerSecond) {
            this.currentFrame = 0;
        }

        this.cameraOffset = this.cameraFunction();
        this.collisionMap.clear();
        this.ctx.clearRect(0, 0, 1000, 1000);

        this.renderNonGameArea();

        for (let object of this.gameObjects) {
            object.beforeRender();
        }

        for (let object of this.gameObjects) {
            object.onRender();
        }

        for (let object of this.gameObjects) {
            object.afterRender();
        }
    }

    private renderNonGameArea() {
        for (let x = this.cameraOffset.x1; x < this.cameraOffset.x2; x++) {
            for (let y = this.cameraOffset.y1; y < this.cameraOffset.y2; y++) {
                if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
                    this.drawImage(null, waterImage, x, y);
                }
            }
        }
    }

    getBoxSize() {
        return this.boxSize;
    }

    start() {
        this.initializeGameObjects();

        setInterval(() => {
            this.render();
        }, 1000 / this.framesPerSecond);
    }

    getElementWidth() {
        return this.elementWidth;
    }

    getElementHeight() {
        return this.elementHeight;
    }

    setCameraFunction(f: Function) {
        this.cameraFunction = f;
    }

    getCurrentFrame() {
        return this.currentFrame;
    }

    get boxSize() {
        return this.elementWidth / (this.cameraOffset.x2 - this.cameraOffset.x1);
    }

    get gridSize() {
        return this.width;
    }

    getRoute(startPos, goalPos) {
        return this.collisionMap.getRoute(startPos, goalPos);
    }
}