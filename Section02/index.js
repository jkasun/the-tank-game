const pn = new SimplexNoise();

const width = 100;
const height = 100;

const scaler = 0.1;

var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

// const c1 = document.getElementById('canvas1');
// const ctx1 = c1.getContext("2d");

const boxSize = 8;

function drawRect(x, y, type, ctx) {
    if (type === 1) {
        ctx.fillStyle = 'white';
        ctx.fillRect(x * boxSize, y * boxSize, boxSize, boxSize);
    } else {
        ctx.fillStyle = 'black';
        ctx.fillRect(x * boxSize, y * boxSize, boxSize, boxSize);
    }
}

function drawPlayer() {
    ctx.fillStyle = 'red';
    ctx.fillRect(80, 80, 2, boxSize);

    ctx.fillStyle = 'blue';
    ctx.fillRect(82, 80, boxSize - 2, boxSize);
}


for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
        const c = pn.noise(x * scaler, y * scaler);

        if (c < 0.445) {
            // line += ' ';
            drawRect(x, y, 1, ctx);
        } else {
            // line += '#';
            drawRect(x, y, undefined, ctx)
        }

        // const r = Math.random();

        // if (r > 0.2) {
        //     drawRect(x, y, 1, ctx1);
        // } else {
        //     drawRect(x, y, undefined, ctx1);
        // }
    }
}

drawPlayer();
