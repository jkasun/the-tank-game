
const pn = new SimplexNoise();

const generateArena = (width, height) => {
    const arena = [];

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            const c = pn.noise(x * scaler, y * scaler);

            if (!arena[x]) {
                arena[x] = [];
            }

            if (c < 0.4) {
                arena[x][y] = 1;
            } else {
                arena[x][y] = 0;
            }
        }
    }

    // filling top
    for (let x = 0; x < width; x++) {
        arena[0][x] = 0;
        arena[width - 1][x] = 0;
    }

    for (let y = 0; y < height; y++) {
        arena[y][0] = 0;
        arena[y][height - 1] = 0;
    }

    // clean up space for spawn
    for (let x = 1; x < 5; x++) {
        for (let y = 1; y < 5; y++) {
            arena[x][y] = 1;
        }
    }

    return arena;
}