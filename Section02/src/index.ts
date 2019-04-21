import { Arena } from './objects/arena';
import { Player } from './objects/player';
import { Game } from './core/game';

const c: any = document.getElementById("canvas");
const ctx: CanvasRenderingContext2D = c.getContext("2d");

const tankGame = new Game(ctx, 100, 100);

const player = new Player(tankGame);
const arena = new Arena(tankGame, player);

tankGame.addGameObject(arena);
tankGame.addGameObject(player);

tankGame.start();

document.onkeyup = (event) => {
    if (event.key === 'w') {
        player.moveUp();
    }

    if (event.key === 's') {
        player.moveDown();
    }

    if (event.key === 'd') {
        player.moveRight();
    }

    if (event.key === 'a') {
        player.moveLeft();
    }

    if (event.key === 'l') {
        player.fire();
    }
}

