import { GameObject } from "./game-object";

const waterImage = new Image();
waterImage.src = './img/water.png';

/**
 * This class should abstract the canvas to a grid world
 * game architecture
 */
export class Game {
    private gameObject: GameObject[] = [];
    private framesPerSecond = 100;

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

    constructor(
        private ctx: CanvasRenderingContext2D,
        private width: number,
        private height: number
    ) {
        this.elementHeight = ctx.canvas.height;
        this.elementWidth = ctx.canvas.width;
    }

    // Update collision here maybe
    drawImage(image, x, y) {
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
        this.gameObject.push(gameObject);
    }

    render() {
        this.cameraOffset = this.cameraFunction();
        this.ctx.clearRect(0, 0, 1000, 1000);

        this.renderNonGameArea();

        for (let object of this.gameObject) {
            object.render();
        }
    }

    private renderNonGameArea() {
        for (let x = this.cameraOffset.x1; x < this.cameraOffset.x2; x++) {
            for (let y = this.cameraOffset.y1; y < this.cameraOffset.y2; y++) {
                if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
                    this.drawImage(waterImage, x, y);
                }
            }
        }
    }

    getBoxSize() {
        return this.boxSize;
    }

    start() {
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

    get boxSize() {
        return this.elementWidth / (this.cameraOffset.x2 - this.cameraOffset.x1);
    }

    get gridSize() {
        return this.width;
    }
}