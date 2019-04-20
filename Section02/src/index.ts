import { Arena } from './objects/arena';
import { Player } from './objects/player';

const c: any = document.getElementById("canvas");
const ctx: CanvasRenderingContext2D = c.getContext("2d");

const player = new Player(ctx);
const arena = new Arena(ctx, player);

const drawGame = () => {
    arena.render();
    player.render();
}

setTimeout(() => {
    drawGame();
}, 500);

document.onkeyup = (event) => {
    if (event.key === 'w') {
        player.moveUp();
        drawGame();
    }

    if (event.key === 's') {
        player.moveDown();
        drawGame();
    }

    if (event.key === 'd') {
        player.moveRight();
        drawGame();
    }

    if (event.key === 'a') {
        player.moveLeft();
        drawGame();
    }
}

