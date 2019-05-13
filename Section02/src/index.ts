import { Arena } from './objects/arena';
import { Player } from './objects/player';
import { Game } from './core/game';
import { EnemyTank } from './objects/enemy-tank';
import { ClonerTank } from './objects/cloner-tank';
import { FlyTank } from './objects/flyer-tank';

const c: any = document.getElementById("canvas");
const ctx: CanvasRenderingContext2D = c.getContext("2d");

const tankGame = new Game(ctx, 100, 100);

const player = new Player(tankGame);
const arena = new Arena(tankGame);

tankGame.addGameObject(arena);
tankGame.addGameObject(player);

const numberOfTanks = 10;
const tanks: EnemyTank[] = [];

for (let i = 0; i < numberOfTanks; i++) {
    const enemyTank = new EnemyTank(tankGame, player);
    tankGame.addGameObject(enemyTank);
    tanks.push(enemyTank);
}

const numberOfCloners = 3;
const cloners: ClonerTank[] = [];

for (let i = 0; i < numberOfCloners; i++) {
    const enemyTank = new ClonerTank(tankGame, player);
    tankGame.addGameObject(enemyTank);
    cloners.push(enemyTank);
}

const numberOfFlyers = 3;
const flyers: FlyTank[] = [];

for (let i=0; i < numberOfFlyers; i++) {
    const enemyTank = new FlyTank(tankGame, player);
    tankGame.addGameObject(enemyTank);
    flyers.push(enemyTank);
}

setTimeout(() => {
    tankGame.start();
}, 100);


let updater = setInterval(() => {
    document.getElementById('player-health').innerText = player.getHealthPoints().toString();

    // creating the table
    const tbody = document.getElementById('agent-info');
    tbody.innerHTML = '';

    for (let i=0; i < numberOfTanks; i++) {
        const tank = tanks[i];

        const tr = document.createElement('tr');

        const th1 = document.createElement('td');
        th1.innerHTML = `tank ${i}`;
        tr.appendChild(th1);

        const hp = tank.getHealthPoints()
        const th2 = document.createElement('td');
        th2.innerHTML = hp.toString();
        tr.appendChild(th2);

        const th3 = document.createElement('td');
        th3.innerHTML = tank.state;
        tr.appendChild(th3);

        if (hp === 0) {
            tr.style.backgroundColor = 'red';
        }

        tbody.appendChild(tr);
    }

    for (let i=0; i < numberOfCloners; i++) {
        const tank = cloners[i];

        const tr = document.createElement('tr');

        const th1 = document.createElement('td');
        th1.innerHTML = `cloner ${i}`;
        tr.appendChild(th1);

        const hp = tank.getHealthPoints()
        const th2 = document.createElement('td');
        th2.innerHTML = hp.toString();
        tr.appendChild(th2);

        const th3 = document.createElement('td');
        th3.innerHTML = tank.state;
        tr.appendChild(th3);

        if (hp === 0) {
            tr.style.backgroundColor = 'red';
        }

        tbody.appendChild(tr);
    }

    for (let i=0; i < numberOfFlyers; i++) {
        const tank = flyers[i];

        const tr = document.createElement('tr');

        const th1 = document.createElement('td');
        th1.innerHTML = `air-tank ${i}`;
        tr.appendChild(th1);

        const hp = tank.getHealthPoints()
        const th2 = document.createElement('td');
        th2.innerHTML = hp.toString();
        tr.appendChild(th2);

        const th3 = document.createElement('td');
        th3.innerHTML = tank.state;
        tr.appendChild(th3);
        
        if (hp === 0) {
            tr.style.backgroundColor = 'red';
        }

        tbody.appendChild(tr);
    }
}, 250);

let gameOver = false;

player.on('die', () => {
    clearInterval(updater);
    document.onkeyup = null;
    document.getElementById('player-health').innerText = 'Game Over';
    gameOver = true;
});

document.onkeyup = (event) => {
    if (gameOver) {
        return;
    }

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