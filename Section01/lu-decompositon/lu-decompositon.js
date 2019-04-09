class Matrix {
    constructor(config) {
        this.config = config;
    }

    printMatrix() {
        for (let col of this.config) {
            console.log(col);
        }
    }

    getLUDecompositions() {
        const a = this.config;

        const u11 = a[0][0];
        const u12 = a[0][1];
        const u13 = a[0][2];
        const l21 = (1 / u11) * a[1][0];
        const l31 = (1 / u11) * a[2][0];
        const u22 = a[1][1] - u12 * l21;
        const l32 = (1 / u22) * (a[2][1] - u12 * l31);
        const u23 = a[1][2] - u13 * l21;
        const u33 = a[2][2] - (u12 * l31 + u23 * l32);

        const upper = [
            [1, 0, 0],
            [l21, 1, 0],
            [l31, l32, 1]
        ];

        const lower = [
            [u11, u12, u13],
            [0, u22, u23],
            [0, 0, u33]
        ];

        return {
            upperMatrix: new Matrix(upper),
            lowerMatrix: new Matrix(lower)
        }
    }
}

// const arr = [
//     [1, -3, 7],
//     [-2, 6, 1],
//     [0, 3, -2]
// ];

const arr = [
    [3, 1, 6],
    [-6, 0, -16],
    [0, 8, -17]
];

const matrix = new Matrix(arr);
matrix.printMatrix();

const { upperMatrix, lowerMatrix } = matrix.getLUDecompositions();
console.log('========= UPPER MATRIX ============');
upperMatrix.printMatrix();
console.log('========= LOWER MATRIX ============');
lowerMatrix.printMatrix();
