const width = 100;
const height = 100;

const scaler = 0.1;

const c = document.getElementById("canvas");
const ctx = c.getContext("2d");

const boxSize = 25;
const drawX = 800 / boxSize;
const drawY = 800 / boxSize;

const arena = generateArena(width, height);

const drawRect = (x, y, type, ctx) => {
    if (type === 1) {
        ctx.fillStyle = 'white';
        ctx.fillRect(x * boxSize, y * boxSize, boxSize, boxSize);
    } else {
        ctx.fillStyle = 'black';
        ctx.fillRect(x * boxSize, y * boxSize, boxSize, boxSize);
    }
}

const playerPosition = {
    x: 0,
    y: 0
}

const drawPlayer = () => {
    ctx.fillStyle = 'red';

    ctx.fillRect(
        13 * boxSize,
        13 * boxSize,
        boxSize,
        boxSize
    );
}

const drawPOV = () => {
    offsetX = playerPosition.x;
    offsetY = playerPosition.y;

    for (let x = 0 + offsetX; x < drawX + offsetX; x++) {
        for (let y = 0 + offsetY; y < drawY + offsetY; y++) {
            // if out of area
            if (arena[x] === undefined || arena[x][y] === undefined) {
                drawRect(x - offsetX, y - offsetY, 0, ctx);
                return;
            }

            if (arena[x][y] === 0) {
                drawRect(x - offsetX, y - offsetY, 0, ctx);
            } else {
                drawRect(x - offsetX, y - offsetY, 1, ctx);
            }
        }
    }
}

const moveLeft = () => {
    playerPosition.x--;
    drawPOV();
    drawPlayer();
}

const moveRight = () => {
    playerPosition.x++;
    drawPOV();
    drawPlayer();
}

const moveUp = () => {
    playerPosition.y--;
    drawPOV();
    drawPlayer();
}

const moveDown = () => {
    playerPosition.y++;
    drawPOV();
    drawPlayer();
}

drawPOV(0, 0);

