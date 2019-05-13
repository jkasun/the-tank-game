class Quternions {
    constructor(r, i, j, k) {
        this.r = r;
        this.i = i;
        this.j = j;
        this.k = k;
    }

    static calculateProduct(q1, q2) {
        const r = (q2.r * q1.r) - (q2.i * q1.i) - (q2.j * q1.j) - (q2.k * q1.k);
        const i = (q2.r * q1.i) + (q2.i * q1.r) - (q2.j * q1.k) + (q2.k * q1.j);
        const j = (q2.r * q1.j) + (q2.i * q1.k) + (q2.j * q1.r) - (q2.k * q1.i);
        const k = (q2.r * q1.k) - (q2.i * q1.j) + (q2.j * q1.i) + (q2.k * q1.r);

        return new Quternions(r, i, j, k);
    }
}

q1 = new Quternions(8, -1, 1, 1);
q2 = new Quternions(-6, 1, 4, -7);

console.log(Quternions.calculateProduct(q1, q2));